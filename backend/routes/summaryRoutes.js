import express from "express";
import cron from "node-cron";
import authMiddleware from "../middleware/authMiddleware.js";
import Summary from "../models/Summary.js";

const router = express.Router(); // Define the router properly

// POST /api/summaries - Teacher posts a summary
router.post("/", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "teacher") {
            return res.status(403).json({ message: "Access denied! Only teachers can post summaries." });
        }

        const { section, content } = req.body;
        if (!section || !content) {
            return res.status(400).json({ message: "Section and content are required" });
        }

        const summary = new Summary({
            teacher: req.user.id,
            section,
            content
        });

        await summary.save();
        res.status(201).json({ message: "Summary posted successfully", summary });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// GET /api/summaries/:section - Fetch summaries for a class (last 48 hours)
router.get("/:section", authMiddleware, async (req, res) => {
    try {
        const { section } = req.params;

        const fortyEightHoursAgo = new Date();
        fortyEightHoursAgo.setHours(fortyEightHoursAgo.getHours() - 48);

        const summaries = await Summary.find({ 
            section, 
            createdAt: { $gte: fortyEightHoursAgo } 
        }).sort({ createdAt: -1 });

        res.json(summaries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// DELETE /api/summaries/:id - Delete a summary (Only the teacher who posted it)
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const summary = await Summary.findById(req.params.id);

        if (!summary) {
            return res.status(404).json({ message: "Summary not found" });
        }

        if (summary.teacher.toString() !== req.user.id) {
            return res.status(403).json({ message: "You can only delete your own summaries!" });
        }

        await summary.deleteOne();
        res.json({ message: "Summary deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Auto-delete summaries older than 48 hours
cron.schedule("0 * * * *", async () => {
    const fortyEightHoursAgo = new Date();
    fortyEightHoursAgo.setHours(fortyEightHoursAgo.getHours() - 48);

    try {
        await Summary.deleteMany({ createdAt: { $lt: fortyEightHoursAgo } });
        console.log("Old summaries deleted successfully.");
    } catch (error) {
        console.error("Error deleting old summaries:", error);
    }
});

export default router;

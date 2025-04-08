// import express from "express";
// import Subject from "../models/Subject.js"; // Ensure Subject model exists

// const router = express.Router();

// // GET all subjects
// router.get("/", async (req, res) => {
//   try {
//     const subjects = await Subject.find(); // Fetch subjects from DB
//     res.status(200).json(subjects);
//   } catch (error) {
//     res.status(500).json({ error: "Server error", details: error.message });
//   }
// });

// export default router;

import express from "express";
import Subject from "../models/Subject.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Get all subjects
// router.get("/", authMiddleware, async (req, res) => {
//   try {
//     const subjects = await Subject.find();
//     res.status(200).json(subjects);
//   } catch (error) {
//     console.error("🔥 Error fetching subjects:", error);
//     res.status(500).json({ message: "Server error", details: error.message });
//   }
// });
router.get("/", authMiddleware, async (req, res) => {
  try {
    const allowedRoles = ["admin", "student", "teacher"];
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const subjects = await Subject.find({}, "subjectId name");
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Get a single subject by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    res.status(200).json(subject);
  } catch (error) {
    console.error("🔥 Error fetching subject:", error);
    res.status(500).json({ message: "Server error", details: error.message });
  }
});

// ✅ Add a new subject (Admin only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { subjectId, name, department, section } = req.body;

    if (!subjectId || !name || !department || !section) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newSubject = new Subject({
      subjectId,
      name,
      department,
      section
    });

    await newSubject.save();
    res.status(201).json({ message: "Subject added successfully", subject: newSubject });
  } catch (error) {
    console.error("🔥 Error adding subject:", error);
    res.status(500).json({ message: "Server error", details: error.message });
  }
});

// ✅ Update subject (Admin only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { name, department, section } = req.body;

    const updatedSubject = await Subject.findByIdAndUpdate(
      req.params.id,
      { name, department, section },
      { new: true, runValidators: true }
    );

    if (!updatedSubject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.status(200).json({ message: "Subject updated successfully", subject: updatedSubject });
  } catch (error) {
    console.error("🔥 Error updating subject:", error);
    res.status(500).json({ message: "Server error", details: error.message });
  }
});

// ✅ Delete subject (Admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const deleted = await Subject.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    console.error("🔥 Error deleting subject:", error);
    res.status(500).json({ message: "Server error", details: error.message });
  }
});

export default router;

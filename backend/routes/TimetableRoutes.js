// import express from "express";
// import mongoose from "mongoose";
// import Timetable from "../models/Timetable.js";
// import authMiddleware from "../middleware/authMiddleware.js";
// import Teacher from "../models/Teacher.js";
// import Subject from "../models/Subject.js";

// const router = express.Router();

// /* ─────────────────────────────────────────────── */
// /* ✅ Get all timetables (Admin only)              */
// /* ─────────────────────────────────────────────── */
// router.get("/", authMiddleware, async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Access denied. Only admins can view all timetables." });
//     }

//     const timetables = await Timetable.find().populate("subjectId", "name");
//     res.status(200).json(timetables);
//   } catch (error) {
//     console.error("🔥 Error fetching timetables:", error.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// /* ─────────────────────────────────────────────── */
// /* ✅ Get timetable by ID (Admin & Assigned Teacher) */
// /* ─────────────────────────────────────────────── */
// router.get("/:id", authMiddleware, async (req, res) => {
//   try {
//     const timetable = await Timetable.findById(req.params.id).populate("subjectId", "name");

//     if (!timetable) {
//       return res.status(404).json({ message: "Timetable not found." });
//     }

//     if (req.user.role !== "admin" && req.user.userId !== timetable.teacherId) {
//       return res.status(403).json({ message: "Access denied. Only assigned teacher or admin can view." });
//     }

//     res.status(200).json(timetable);
//   } catch (error) {
//     console.error("🔥 Error fetching timetable:", error.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// /* ─────────────────────────────────────────────── */
// /* ✅ Get a specific teacher's timetable (Admin & Teacher) */
// /* ─────────────────────────────────────────────── */
// router.get("/teacher/:teacherId", authMiddleware, async (req, res) => {
//   try {
//     if (req.user.role !== "admin" && req.user.userId !== req.params.teacherId) {
//       return res.status(403).json({ message: "Access denied. You can only view your own timetable." });
//     }

//     const timetables = await Timetable.find({ teacherId: req.params.teacherId }).populate("subjectId", "name");

//     res.status(200).json(timetables);
//   } catch (error) {
//     console.error("🔥 Error fetching teacher's timetable:", error.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// /* ─────────────────────────────────────────────── */
// /* ✅ Add a new timetable (Admin only)            */
// /* ─────────────────────────────────────────────── */
// router.post("/", authMiddleware, async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Access denied. Only admins can add timetables." });
//     }

//     let { teacherId, subjectId, section, day, timeSlot } = req.body;

//     console.log("📩 Received Data:", req.body); // Debugging log

//     // Validate input fields
//     if (!teacherId || !subjectId || !section || !day || !timeSlot) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     if (!mongoose.isValidObjectId(subjectId)) {
//       return res.status(400).json({ message: "Invalid subjectId format." });
//     }

//     // Check if teacher exists
//     const teacherExists = await Teacher.findOne({ teacherId });
//     if (!teacherExists) {
//       return res.status(404).json({ message: "Teacher not found in database." });
//     }

//     // Check if subject exists
//     const subjectExists = await Subject.findById(subjectId);
//     if (!subjectExists) {
//       return res.status(404).json({ message: "Subject not found in database." });
//     }

//     // Prevent duplicate timetable entries
//     const existingTimetable = await Timetable.findOne({ teacherId, section, day, timeSlot });
//     if (existingTimetable) {
//       return res.status(400).json({ message: "A timetable entry already exists for this teacher and time slot." });
//     }

//     // Create new timetable entry
//     const newTimetable = await Timetable.create({ teacherId, subjectId, section, day, timeSlot });

//     // Populate subject name before sending response
//     await newTimetable.populate("subjectId", "name");

//     res.status(201).json({ message: "Timetable added successfully", timetable: newTimetable });
//   } catch (error) {
//     console.error("🔥 Error adding timetable:", error.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// /* ─────────────────────────────────────────────── */
// /* ✅ Update timetable details (Admin only)       */
// /* ─────────────────────────────────────────────── */
// router.put("/:id", authMiddleware, async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Access denied. Only admins can update timetables." });
//     }

//     const updatedTimetable = await Timetable.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true, runValidators: true }
//     ).populate("subjectId", "name");

//     if (!updatedTimetable) {
//       return res.status(404).json({ message: "Timetable not found." });
//     }

//     res.status(200).json({ message: "Timetable updated successfully", timetable: updatedTimetable });
//   } catch (error) {
//     console.error("🔥 Error updating timetable:", error.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// /* ─────────────────────────────────────────────── */
// /* ✅ Delete a timetable (Admin only)             */
// /* ─────────────────────────────────────────────── */
// router.delete("/:id", authMiddleware, async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Access denied. Only admins can delete timetables." });
//     }

//     const deletedTimetable = await Timetable.findByIdAndDelete(req.params.id);
//     if (!deletedTimetable) {
//       return res.status(404).json({ message: "Timetable not found." });
//     }

//     res.status(200).json({ message: "Timetable deleted successfully" });
//   } catch (error) {
//     console.error("🔥 Error deleting timetable:", error.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// export default router;

import express from "express";
import mongoose from "mongoose";
import Timetable from "../models/Timetable.js";
import Teacher from "../models/Teacher.js";
import Subject from "../models/Subject.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* ───────────── GET all timetables (Admin only) ───────────── */
router.get("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Access denied" });

    const timetables = await Timetable.find().populate("subjectId", "name");
    res.status(200).json(timetables);
  } catch (error) {
    console.error("🔥 Error fetching timetables:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* ───── GET timetable by ID (Admin & Assigned Teacher only) ───── */
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const timetable = await Timetable.findById(req.params.id).populate("subjectId", "name");

    if (!timetable)
      return res.status(404).json({ message: "Timetable not found" });

    if (
      req.user.role !== "admin" &&
      req.user.teacherId !== timetable.teacherId
    ) {
      return res.status(403).json({
        message: "Access denied. Only admin or assigned teacher can view.",
      });
    }

    res.status(200).json(timetable);
  } catch (error) {
    console.error("🔥 Error fetching timetable:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* ───── GET timetable for specific teacher (Admin or teacher themselves) ───── */
router.get("/teacher/:teacherId", authMiddleware, async (req, res) => {
  try {
    if (
      req.user.role !== "admin" &&
      req.user.teacherId !== req.params.teacherId
    ) {
      return res.status(403).json({
        message: "Access denied. Only admin or assigned teacher can view.",
      });
    }

    const timetables = await Timetable.find({
      teacherId: req.params.teacherId,
    }).populate("subjectId", "name");

    res.status(200).json(timetables);
  } catch (error) {
    console.error("🔥 Error fetching teacher timetable:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* ───────────── CREATE a new timetable (Admin only) ───────────── */
router.post("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Access denied" });

    const { teacherId, subjectId, section, day, timeSlot } = req.body;

    if (!teacherId || !subjectId || !section || !day || !timeSlot) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!mongoose.isValidObjectId(subjectId)) {
      return res.status(400).json({ message: "Invalid subjectId format." });
    }

    const teacherExists = await Teacher.findOne({ teacherId });
    if (!teacherExists)
      return res.status(404).json({ message: "Teacher not found" });

    const subjectExists = await Subject.findById(subjectId);
    if (!subjectExists)
      return res.status(404).json({ message: "Subject not found" });

    const existing = await Timetable.findOne({
      teacherId,
      section,
      day,
      timeSlot,
    });

    if (existing)
      return res.status(400).json({
        message: "Timetable already exists for this teacher and time slot.",
      });

    const newEntry = await Timetable.create({
      teacherId,
      subjectId,
      section,
      day,
      timeSlot,
    });

    await newEntry.populate("subjectId", "name");

    res
      .status(201)
      .json({ message: "Timetable added successfully", timetable: newEntry });
  } catch (error) {
    console.error("🔥 Error creating timetable:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* ───────────── UPDATE a timetable entry (Admin only) ───────────── */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Access denied" });

    const updated = await Timetable.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate("subjectId", "name");

    if (!updated)
      return res.status(404).json({ message: "Timetable not found" });

    res
      .status(200)
      .json({ message: "Timetable updated successfully", timetable: updated });
  } catch (error) {
    console.error("🔥 Error updating timetable:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* ───────────── DELETE a timetable (Admin only) ───────────── */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Access denied" });

    const deleted = await Timetable.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Timetable not found" });

    res.status(200).json({ message: "Timetable deleted successfully" });
  } catch (error) {
    console.error("🔥 Error deleting timetable:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

// import express from "express";
// import mongoose from "mongoose";
// import SectionTimetable from "../models/SectionTimetable.js";
// import authMiddleware from "../middleware/authMiddleware.js";
// import Student from "../models/Student.js";
// import TeacherTimetable from "../models/Timetable.js";
// import Timetable from "../models/SectionTimetable.js";

// const router = express.Router();

// /* ─────────────────────────────────────────────── */
// /* ✅ Get all section timetables (Admin only)      */
// /* ─────────────────────────────────────────────── */
// router.get("/", authMiddleware, async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Access denied. Only admins can view all section timetables." });
//     }

//     const sectionTimetables = await SectionTimetable.find();
//     res.status(200).json(sectionTimetables);
//   } catch (error) {
//     console.error("🔥 Error fetching section timetables:", error.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// /* ─────────────────────────────────────────────── */
// /* ✅ Get timetable by section and day             */
// /* ─────────────────────────────────────────────── */
// router.get("/:section/:day", authMiddleware, async (req, res) => {
//   try {
//     const { section, day } = req.params;
    
//     const sectionTimetable = await SectionTimetable.findOne({ section, day });

//     if (!sectionTimetable) {
//       return res.status(404).json({ message: "Section timetable not found." });
//     }

//     res.status(200).json(sectionTimetable);
//   } catch (error) {
//     console.error("🔥 Error fetching section timetable:", error.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// /* ─────────────────────────────────────────────── */
// /* ✅ Add a new section timetable (Admin only)     */
// /* ─────────────────────────────────────────────── */
// router.post("/assign-student", authMiddleware, async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Access denied. Only admins can assign students." });
//     }

//     const { studentId, section, day, period } = req.body;

//     // Check if the student exists
//     const student = await Student.findById(studentId);
//     if (!student) {
//       return res.status(404).json({ message: "Student not found." });
//     }

//     // Get the timetable for the section
//     const sectionTimetable = await SectionTimetable.findOne({ section, day });

//     if (!sectionTimetable) {
//       return res.status(404).json({ message: "No timetable found for this section." });
//     }

//     // Get the teacher assigned for this period
//     const assignedSlot = sectionTimetable.schedule.find(slot => slot.period === period);
//     if (!assignedSlot) {
//       return res.status(400).json({ message: "Invalid period in section timetable." });
//     }

//     const teacherId = assignedSlot.teacher;

//     // Check if the teacher already has another class at the same time
//     const teacherTimetable = await TeacherTimetable.findOne({ teacher: teacherId, day });
//     if (teacherTimetable) {
//       const isConflict = teacherTimetable.schedule.some(slot => slot.period === period);
//       if (isConflict) {
//         return res.status(400).json({ message: "Teacher is already assigned to another class at this time." });
//       }
//     }

//     // Assign student to the section
//     student.section = section;
//     await student.save();

//     res.status(200).json({ message: "Student assigned successfully." });

//   } catch (error) {
//     console.error("🔥 Error assigning student:", error.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// /* ─────────────────────────────────────────────── */
// /* ✅ Update section timetable (Admin only)        */
// /* ─────────────────────────────────────────────── */
// router.put("/:section/:day", authMiddleware, async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Access denied. Only admins can update timetables." });
//     }

//     const { section, day } = req.params;
//     const { schedule } = req.body;

//     if (!Array.isArray(schedule) || schedule.length === 0) {
//       return res.status(400).json({ message: "Valid schedule array is required." });
//     }

//     const updatedTimetable = await SectionTimetable.findOneAndUpdate(
//       { section, day },
//       { $set: { schedule } },
//       { new: true, runValidators: true }
//     );

//     if (!updatedTimetable) {
//       return res.status(404).json({ message: "Timetable not found." });
//     }

//     res.status(200).json({ message: "Timetable updated successfully", timetable: updatedTimetable });
//   } catch (error) {
//     console.error("🔥 Error updating section timetable:", error.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
// router.delete('/api/section-timetable/:section/:day/:slotId', async (req, res) => {
//     try {
//         const { section, day, slotId } = req.params;

//         // Find the timetable
//         const timetable = await Timetable.findOne({ section, day });

//         if (!timetable) return res.status(404).json({ message: "Timetable not found." });

//         // Remove the schedule item by _id
//         timetable.schedule = timetable.schedule.filter(slot => slot._id.toString() !== slotId);
//         await timetable.save();

//         res.json({ message: "Time slot deleted successfully" });

//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//     }
// });
// export const deleteTimeSlot = async (req, res) => {
//     try {
//         const { section, day, slotId } = req.params;
//         console.log("Received request to delete slot:", section, day, slotId); // ✅ Debugging

//         if (!mongoose.Types.ObjectId.isValid(slotId)) {
//             console.log("Invalid slot ID format"); // ✅ Debugging
//             return res.status(400).json({ message: "Invalid slot ID format" });
//         }

//         const timetable = await Timetable.findOne({ section, day });
//         console.log("Fetched Timetable:", timetable); // ✅ Debugging

//         if (!timetable) {
//             console.log("Timetable not found"); // ✅ Debugging
//             return res.status(404).json({ message: "Timetable not found." });
//         }

//         // Remove the schedule item by _id
//         timetable.schedule = timetable.schedule.filter(slot => slot._id.toString() !== slotId);
//         console.log("Updated schedule:", timetable.schedule); // ✅ Debugging

//         await timetable.save();
//         res.json({ message: "Time slot deleted successfully" });

//     } catch (error) {
//         console.error("Error:", error); // ✅ Debugging
//         res.status(500).json({ message: "Server error", error });
//     }
// };
// router.delete("/:section/:day/:slotId", authMiddleware, async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Access denied. Only admins can delete time slots." });
//     }

//     const { section, day, slotId } = req.params;

//     // Validate ObjectId
//     if (!mongoose.Types.ObjectId.isValid(slotId)) {
//       return res.status(400).json({ message: "Invalid slot ID format" });
//     }

//     // Find the timetable and update it by removing the specific slot
//     const updatedTimetable = await SectionTimetable.findOneAndUpdate(
//       { section, day },
//       { $pull: { schedule: { _id: slotId } } },
//       { new: true }
//     );

//     if (!updatedTimetable) {
//       return res.status(404).json({ message: "Timetable not found." });
//     }

//     res.json({ 
//       message: "Time slot deleted successfully", 
//       updatedTimetable 
//     });

//   } catch (error) {
//     console.error("🔥 Error deleting time slot:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });
// /* ─────────────────────────────────────────────── */
// /* ✅ Delete a section timetable (Admin only)      */
// /* ─────────────────────────────────────────────── */
// router.delete("/:section/:day", authMiddleware, async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Access denied. Only admins can delete timetables." });
//     }

//     const { section, day } = req.params;

//     const deletedTimetable = await SectionTimetable.findOneAndDelete({ section, day });

//     if (!deletedTimetable) {
//       return res.status(404).json({ message: "Timetable not found." });
//     }

//     res.status(200).json({ message: "Timetable deleted successfully" });
//   } catch (error) {
//     console.error("🔥 Error deleting section timetable:", error.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });



// export default router;


import express from "express";
import mongoose from "mongoose";
import SectionTimetable from "../models/SectionTimetable.js";
import authMiddleware from "../middleware/authMiddleware.js";

import Teacher from "../models/Teacher.js";

const router = express.Router();

/* ✅ Get all section timetables (Admin only) */
router.get("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Only admins can view all section timetables." });
    }
    const sectionTimetables = await SectionTimetable.find();
    res.status(200).json(sectionTimetables);
  } catch (error) {
    console.error("🔥 Error fetching section timetables:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


/* ✅ Get timetable by section and day */
router.get("/:section/:day", authMiddleware, async (req, res) => {
  try {
    const { section, day } = req.params;
    const sectionTimetable = await SectionTimetable.findOne({ section, day });
    if (!sectionTimetable) {
      return res.status(404).json({ message: "Section timetable not found." });
    }
    res.status(200).json(sectionTimetable);
  } catch (error) {
    console.error("🔥 Error fetching section timetable:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* ✅ Get entire weekly timetable by section */
router.get("/:section", authMiddleware, async (req, res) => {
  try {
    const { section } = req.params;
    const weeklyTimetable = await SectionTimetable.find({ section });

    if (!weeklyTimetable.length) {
      return res.status(404).json({ message: "Weekly timetable not found." });
    }

    res.status(200).json(weeklyTimetable);
  } catch (error) {
    console.error("🔥 Error fetching weekly timetable:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/teachers", authMiddleware, async (req, res) => {
  try {
    const teachers = await Teacher.find().select('_id teacherId name');
    res.status(200).json(teachers);
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// POST - Add a time slot to a section's timetable for a specific day
// router.post("/add-slot", authMiddleware, async (req, res) => {
//   try {
//     console.log("📢 Add Slot API hit!");
//     console.log("Request Body:", req.body);

//     // Only Admin can modify timetables
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Access denied. Only admins can add slots." });
//     }

//     const { section, day, schedule } = req.body;

//     if (!schedule || !Array.isArray(schedule) || schedule.length === 0) {
//       return res.status(400).json({ message: "Schedule array is required." });
//     }

//     // Extract the first schedule item (assuming one slot per request)
//     const { timeSlot, subject, subjectId, teacherId } = schedule[0];

//     // ✅ Check if the teacher exists using teacherId (T001 format)
//     const teacher = await Teacher.findOne({ teacherId }); // Find by custom teacherId
//     if (!teacher) return res.status(404).json({ message: "Teacher not found." });

//     const teacherObjectId = teacher._id; // Get the actual ObjectId

//     // ✅ Check if timetable exists for the given section and day
//     let sectionTimetable = await SectionTimetable.findOne({ section, day });
//     if (!sectionTimetable) {
//       // If no timetable exists, create a new one
//       sectionTimetable = new SectionTimetable({ section, day, schedule: [] });
//     }

//     // ✅ Ensure the teacher is free at the given timeSlot
//     const isTeacherBusy = await SectionTimetable.findOne({
//       section,
//       day,
//       "schedule.timeSlot": timeSlot,
//       "schedule.teacherId": teacherObjectId, // Query using ObjectId
//     });

//     if (isTeacherBusy) {
//       return res.status(400).json({ message: "Teacher is already assigned at this time." });
//     }

//     // ✅ Add the new slot to the timetable
//    // In your backend add-slot route
// sectionTimetable.schedule.push({
//   timeSlot,
//   subject,
//   subjectId,
//   teacherId: teacher.teacherId, // Store teacherId instead of ObjectId
// });

//     await sectionTimetable.save();

//     res.status(201).json({ message: "Slot added successfully.", timetable: sectionTimetable });
//   } catch (error) {
//     console.error("🔥 Error adding slot:", error);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// });

router.post("/add-slot", authMiddleware, async (req, res) => {
  try {
    console.log("📢 Add Slot API hit!");
    console.log("Request Body:", req.body);

    // Only Admin can modify timetables
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Only admins can add slots." });
    }

    const { section, day, schedule } = req.body;

    // Fix: Move this check before destructuring
    if (!schedule || !Array.isArray(schedule) || schedule.length === 0) {
      return res.status(400).json({ message: "Schedule array is required." });
    }

    // Extract the first schedule item (assuming one slot per request)
    const { timeSlot, subject, subjectId, teacherId } = schedule[0];

    // Validate input fields
    if (!section || !day || !timeSlot || !subject || !subjectId || !teacherId) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // ✅ Check if the teacher exists using teacherId (T001 format)
    const teacher = await Teacher.findOne({ teacherId }); 
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found." });
    }

    // ✅ Check if timetable exists for the given section and day
    let sectionTimetable = await SectionTimetable.findOne({ section, day });
    if (!sectionTimetable) {
      // If no timetable exists, create a new one
      sectionTimetable = new SectionTimetable({ section, day, schedule: [] });
    }

    // ✅ Ensure the teacher is not already assigned at the given timeSlot for this section and day
    const isTeacherBusy = await SectionTimetable.findOne({
      section,
      day,
      "schedule.timeSlot": timeSlot,
      "schedule.teacherId": teacherId, // Use teacherId instead of ObjectId
    });

    if (isTeacherBusy) {
      return res.status(400).json({ message: "Teacher is already assigned at this time." });
    }

    // Remove any existing slot with the same time slot to avoid duplicates
    sectionTimetable.schedule = sectionTimetable.schedule.filter(
      slot => slot.timeSlot !== timeSlot
    );

    // ✅ Add the new slot to the timetable
    sectionTimetable.schedule.push({
      timeSlot,
      subject,
      subjectId,
      teacherId: teacherId, // Store teacherId consistently
    });

    // Save the updated or new timetable
    const savedTimetable = await sectionTimetable.save();

    res.status(201).json({ 
      message: "Slot added successfully.", 
      timetable: savedTimetable 
    });

  } catch (error) {
    console.error("🔥 Error adding slot:", error);
    res.status(500).json({ 
      message: "Internal server error", 
      error: error.message 
    });
  }
});
/* ✅ Update section timetable (Admin only) */
router.put("/:section/:day", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied." });
    const { section, day } = req.params;
    const { schedule } = req.body;
    if (!Array.isArray(schedule) || schedule.length === 0) {
      return res.status(400).json({ message: "Valid schedule array is required." });
    }
    const updatedTimetable = await SectionTimetable.findOneAndUpdate(
      { section, day },
      { $set: { schedule } },
      { new: true, runValidators: true }
    );
    if (!updatedTimetable) return res.status(404).json({ message: "Timetable not found." });
    res.status(200).json({ message: "Timetable updated successfully", timetable: updatedTimetable });
  } catch (error) {
    console.error("🔥 Error updating section timetable:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* ✅ Delete a time slot from section timetable (Admin only) */
router.delete("/:section/:day/:slotId", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied." });
    const { section, day, slotId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(slotId)) {
      return res.status(400).json({ message: "Invalid slot ID format." });
    }
    const updatedTimetable = await SectionTimetable.findOneAndUpdate(
      { section, day },
      { $pull: { schedule: { _id: slotId } } },
      { new: true }
    );
    if (!updatedTimetable) return res.status(404).json({ message: "Timetable not found." });
    res.json({ message: "Time slot deleted successfully", updatedTimetable });
  } catch (error) {
    console.error("🔥 Error deleting time slot:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



export default router;

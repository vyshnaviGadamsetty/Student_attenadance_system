
// import mongoose from "mongoose";
// import express from "express";
// import Teacher from "../models/Teacher.js";
// import authMiddleware from "../middleware/authMiddleware.js";

// const router = express.Router();

// // ✅ Get all teachers (Admin only)
// router.get("/", authMiddleware, async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     // Populate subject names instead of IDs
//     const teachers = await Teacher.find().populate("subjects", "name");
    
//     // Transform data to use subject names instead of objects
//     const formattedTeachers = teachers.map(teacher => {
//       const teacherObj = teacher.toObject();
//       teacherObj.subjects = teacher.subjects.map(subject => subject.name);
//       return teacherObj;
//     });

//     res.status(200).json(formattedTeachers);
//   } catch (error) {
//     console.error("🔥 Error fetching teachers:", error.message);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// });

// // ✅ Get a single teacher by teacherId (Admin only)
// router.get("/:teacherId", authMiddleware, async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     const teacher = await Teacher.findOne({ teacherId: req.params.teacherId })
//       .populate("subjects", "name");
      
//     if (!teacher) {
//       return res.status(404).json({ message: "Teacher not found" });
//     }
    
//     // Transform data to use subject names instead of objects
//     const teacherObj = teacher.toObject();
//     teacherObj.subjects = teacher.subjects.map(subject => subject.name);

//     res.status(200).json(teacherObj);
//   } catch (error) {
//     console.error("🔥 Error fetching teacher:", error);
//     res.status(500).json({ message: "Server error", details: error.message });
//   }
// });

// // ✅ Add a new teacher (Admin only)
// router.post("/", authMiddleware, async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     const { teacherId, name, dob, sections, subjects } = req.body;

//     if (!teacherId || !name || !dob || !sections || !subjects) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Set password as DOB
//     const password = dob;

//     // Find subject IDs by name
//     const subjectIds = await Promise.all(
//       subjects.map(async (subjectName) => {
//         const subject = await mongoose.model("Subject").findOne({ name: subjectName });
//         return subject ? subject._id : null;
//       })
//     );

//     // Filter out any null values (subjects not found)
//     const validSubjectIds = subjectIds.filter(id => id !== null);

//     const newTeacher = new Teacher({
//       teacherId,
//       name,
//       dob,
//       password,
//       sections,
//       subjects: validSubjectIds,
//     });

//     await newTeacher.save();
    
//     // Populate subject names for response
//     await newTeacher.populate("subjects", "name");
//     const teacherObj = newTeacher.toObject();
//     teacherObj.subjects = newTeacher.subjects.map(subject => subject.name);

//     res.status(201).json({ 
//       message: "Teacher added successfully", 
//       teacher: teacherObj 
//     });
//   } catch (error) {
//     console.error("🔥 Error adding teacher:", error);
//     res.status(500).json({ message: "Server error", details: error.message });
//   }
// });

// // ✅ Update teacher details (Admin only)
// router.put("/:id", authMiddleware, async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     const { name, sections, subjects } = req.body;

//     // Find subject IDs by name
//     const subjectIds = await Promise.all(
//       subjects.map(async (subjectName) => {
//         const subject = await mongoose.model("Subject").findOne({ name: subjectName });
//         return subject ? subject._id : null;
//       })
//     );

//     // Filter out any null values (subjects not found)
//     const validSubjectIds = subjectIds.filter(id => id !== null);

//     const updateData = { 
//       name, 
//       sections, 
//       subjects: validSubjectIds 
//     };

//     // Prevent updating DOB and password
//     const updatedTeacher = await Teacher.findByIdAndUpdate(
//       req.params.id,
//       { $set: updateData },
//       { new: true, runValidators: true }
//     ).populate("subjects", "name");

//     if (!updatedTeacher) {
//       return res.status(404).json({ message: "Teacher not found" });
//     }

//     // Transform data to use subject names
//     const teacherObj = updatedTeacher.toObject();
//     teacherObj.subjects = updatedTeacher.subjects.map(subject => subject.name);

//     res.status(200).json({ 
//       message: "Teacher updated successfully", 
//       teacher: teacherObj 
//     });
//   } catch (error) {
//     console.error("🔥 Error updating teacher:", error);
//     res.status(500).json({ message: "Server error", details: error.message });
//   }
// });

// // ✅ Delete a teacher (Admin only)
// router.delete("/:id", authMiddleware, async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);

//     if (!deletedTeacher) {
//       return res.status(404).json({ message: "Teacher not found" });
//     }

//     res.status(200).json({ message: "Teacher deleted successfully" });
//   } catch (error) {
//     console.error("🔥 Error deleting teacher:", error);
//     res.status(500).json({ message: "Server error", details: error.message });
//   }
// });

// export default router;

import express from "express";
import mongoose from "mongoose";
import Teacher from "../models/Teacher.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Get all teachers (Admin only)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const allowedRoles = ["admin", "student", "teacher"];
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const teachers = await Teacher.find().populate("subjects", "name");
    const formattedTeachers = teachers.map((teacher) => {
      const t = teacher.toObject();
      t.subjects = t.subjects.map((s) => s.name);
      return t;
    });

    res.status(200).json(formattedTeachers);
  } catch (error) {
    console.error("🔥 Error fetching teachers:", error);
    res.status(500).json({ message: "Server error", details: error.message });
  }
});


// ✅ Get a single teacher by teacherId (Admin or Teacher themselves)
router.get("/:teacherId", authMiddleware, async (req, res) => {
  try {
    const { role, teacherId: loggedInTeacherId } = req.user;
    const { teacherId } = req.params;

    if (role !== "admin" && teacherId !== loggedInTeacherId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const teacher = await Teacher.findOne({ teacherId }).populate("subjects", "name");

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const teacherObj = teacher.toObject();
    teacherObj.subjects = teacher.subjects.map((s) => s.name);

    res.status(200).json(teacherObj);
  } catch (error) {
    console.error("🔥 Error fetching teacher:", error);
    res.status(500).json({ message: "Server error", details: error.message });
  }
});

// ✅ Add a new teacher (Admin only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { teacherId, name, dob, sections, subjects } = req.body;

    if (!teacherId || !name || !dob || !sections || !subjects) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const password = dob;

    const subjectIds = await Promise.all(
      subjects.map(async (subjectName) => {
        const subject = await mongoose.model("Subject").findOne({ name: subjectName });
        return subject ? subject._id : null;
      })
    );

    const validSubjectIds = subjectIds.filter((id) => id !== null);

    const newTeacher = new Teacher({
      teacherId,
      name,
      dob,
      password,
      sections,
      subjects: validSubjectIds
    });

    await newTeacher.save();
    await newTeacher.populate("subjects", "name");

    const teacherObj = newTeacher.toObject();
    teacherObj.subjects = newTeacher.subjects.map((s) => s.name);

    res.status(201).json({ message: "Teacher added successfully", teacher: teacherObj });
  } catch (error) {
    console.error("🔥 Error adding teacher:", error);
    res.status(500).json({ message: "Server error", details: error.message });
  }
});

// ✅ Update teacher (Admin only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { name, sections, subjects } = req.body;

    const subjectIds = await Promise.all(
      subjects.map(async (subjectName) => {
        const subject = await mongoose.model("Subject").findOne({ name: subjectName });
        return subject ? subject._id : null;
      })
    );

    const updateData = {
      name,
      sections,
      subjects: subjectIds.filter((id) => id !== null)
    };

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate("subjects", "name");

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const teacherObj = updatedTeacher.toObject();
    teacherObj.subjects = updatedTeacher.subjects.map((s) => s.name);

    res.status(200).json({ message: "Teacher updated successfully", teacher: teacherObj });
  } catch (error) {
    console.error("🔥 Error updating teacher:", error);
    res.status(500).json({ message: "Server error", details: error.message });
  }
});

// ✅ Delete a teacher (Admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);

    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    console.error("🔥 Error deleting teacher:", error);
    res.status(500).json({ message: "Server error", details: error.message });
  }
});

export default router;

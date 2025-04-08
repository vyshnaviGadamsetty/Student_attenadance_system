// import express from "express";
// import Student from "../models/Student.js";
// import Subject from "../models/Subject.js";
// import authMiddleware from "../middleware/authMiddleware.js";

// const router = express.Router();

// // ✅ Get all students (Admin only)
// router.get("/", authMiddleware, async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     const students = await Student.find();
//     res.status(200).json(students);
//   } catch (error) {
//     console.error("🔥 Error fetching students:", error);
//     res.status(500).json({ message: "Server error", details: error.message });
//   }
// });

// // ✅ Get a single student by studentId (Admin only)
// router.get("/:studentId", authMiddleware, async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     const student = await Student.findOne({ studentId: req.params.studentId });

//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     res.status(200).json(student);
//   } catch (error) {
//     console.error("🔥 Error fetching student:", error);
//     res.status(500).json({ message: "Server error", details: error.message });
//   }
// });

// // ✅ Add a new student (Admin only)
// router.post("/", authMiddleware, async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     const { studentId, name, dob, department, section, subjects } = req.body;

//     // Fetch all subjects if not provided
//     let assignedSubjects = subjects;
//     if (!Array.isArray(subjects) || subjects.length === 0) {
//       const allSubjects = await Subject.find();
//       assignedSubjects = allSubjects.map((sub) => sub._id);
//     }

//     // Ensure required fields
//     if (!studentId || !name || !dob || !department || !section) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Set password as DOB
//     const password = dob;

//     const newStudent = new Student({
//       studentId,
//       name,
//       dob,
//       password,
//       department,
//       section,
//       subjects: assignedSubjects,
//     });

//     await newStudent.save();
//     res.status(201).json({ message: "Student added successfully", student: newStudent });
//   } catch (error) {
//     console.error("🔥 Error adding student:", error);
//     res.status(500).json({ message: "Server error", details: error.message });
//   }
// });

// // ✅ Update student details (Admin only) - Prevent DOB update
// router.put("/:id", authMiddleware, async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     const { name, department, section, subjects } = req.body;

//     const updateData = { name, department, section };

//     // ✅ Only update subjects if they are provided
//     if (subjects) {
//       updateData.subjects = subjects;
//     }

//     // Prevent updating DOB and password
//     const updatedStudent = await Student.findByIdAndUpdate(
//       req.params.id,
//       { $set: updateData },
//       { new: true, runValidators: true }
//     );

//     if (!updatedStudent) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     res.status(200).json({ message: "Student updated successfully", student: updatedStudent });
//   } catch (error) {
//     console.error("🔥 Error updating student:", error);
//     res.status(500).json({ message: "Server error", details: error.message });
//   }
// });

// // ✅ Delete a student (Admin only)
// router.delete("/:id", authMiddleware, async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     const deletedStudent = await Student.findByIdAndDelete(req.params.id);

//     if (!deletedStudent) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     res.status(200).json({ message: "Student deleted successfully" });
//   } catch (error) {
//     console.error("🔥 Error deleting student:", error);
//     res.status(500).json({ message: "Server error", details: error.message });
//   }
// });

// export default router;
import express from "express";
import Student from "../models/Student.js";
import Subject from "../models/Subject.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Get all students (Admin, Teacher)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { role, section } = req.user;
    if (role !== "admin" && role !== "teacher") {
      return res.status(403).json({ message: "Access denied" });
    }

    const query = {};
    const { department, section: sectionQuery } = req.query;

    if (role === "teacher") {
      query.section = { $in: section }; // Array of sections teacher handles
    } else {
      if (department) query.department = department;
      if (sectionQuery) query.section = sectionQuery;
    }

    const students = await Student.find(query);
    if (!students.length) {
      return res.status(404).json({ message: "No students found", query });
    }

    res.status(200).json(students);
  } catch (error) {
    console.error("🔥 Error fetching students:", error);
    res.status(500).json({ message: "Server error", details: error.message });
  }
});

// ✅ Get a specific student (Admin, Teacher, Student)
router.get("/:studentId", authMiddleware, async (req, res) => {
  try {
    const { role, studentId: loggedInStudentId, section: teacherSection } = req.user;
    const { studentId } = req.params;

    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (role === "teacher" && !teacherSection.includes(student.section)) {
      return res.status(403).json({ message: "Access denied. Not your section." });
    }

    if (role === "student" && studentId !== loggedInStudentId) {
      return res.status(403).json({ message: "Access denied. Not your record." });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error("🔥 Error fetching student:", error);
    res.status(500).json({ message: "Server error", details: error.message });
  }
});

// ✅ Add new student (Admin only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { studentId, name, dob, department, section, subjects } = req.body;

    if (!studentId || !name || !dob || !department || !section) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const assignedSubjects = subjects?.length
      ? subjects
      : (await Subject.find()).map(sub => sub._id);

    const newStudent = new Student({
      studentId,
      name,
      dob,
      password: dob, // Password = DOB
      department,
      section,
      subjects: assignedSubjects
    });

    await newStudent.save();
    res.status(201).json({ message: "Student added successfully", student: newStudent });
  } catch (error) {
    console.error("🔥 Error adding student:", error);
    res.status(500).json({ message: "Server error", details: error.message });
  }
});

// ✅ Update student (Admin only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { name, department, section, subjects } = req.body;
    const updateData = { name, department, section };
    if (subjects) updateData.subjects = subjects;

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student updated successfully", student: updatedStudent });
  } catch (error) {
    console.error("🔥 Error updating student:", error);
    res.status(500).json({ message: "Server error", details: error.message });
  }
});

// ✅ Delete student (Admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("🔥 Error deleting student:", error);
    res.status(500).json({ message: "Server error", details: error.message });
  }
});

export default router;


// import express from "express";
// import Student from "../models/Student.js";

// const router = express.Router();

// // ✅ ADDED: Get students by department and section (used in Att.jsx)
// router.get("/students", async (req, res) => {
//   const { department, section } = req.query;
//   try {
//     if (!department || !section) {
//       return res.status(400).json({ message: "Missing department or section" });
//     }

//     const students = await Student.find({ department, section }).select("studentId name");
//     if (!students.length) {
//       return res.status(404).json({ message: "No students found for the given department and section" });
//     }

//     res.json(students);
//   } catch (error) {
//     console.error("❌ Error fetching students by dept/section:", error);
//     res.status(500).json({ error: "Server error fetching students" });
//   }
// });

// // ✅ ADDED: Get attendance status for all students by subject and date
// router.get("/get-attendance-status", async (req, res) => {
//   try {
//     const { subjectId, date } = req.query;
//     if (!subjectId || !date) {
//       return res.status(400).json({ message: "subjectId and date are required" });
//     }

//     const students = await Student.find({
//       "attendanceRecord.subject": subjectId,
//       "attendanceRecord.date": date
//     });

//     const results = students.map(student => {
//       const record = student.attendanceRecord.find(
//         r => r.subject === subjectId && r.date === date
//       );
//       return {
//         studentId: student.studentId,
//         status: record?.status || "pending"
//       };
//     });

//     res.json(results);
//   } catch (error) {
//     console.error("❌ Error fetching attendance status:", error);
//     res.status(500).json({ message: "Server error fetching attendance status" });
//   }
// });

// // ✅ Get all students' attendance data
// router.get("/students/all", async (req, res) => {
//   try {
//     const students = await Student.find().select("studentId name subjects attendance");
//     if (!students.length) {
//       return res.status(404).json({ message: "No students found" });
//     }
//     res.json(students);
//   } catch (error) {
//     console.error("❌ Error fetching students:", error);
//     res.status(500).json({ error: "Failed to fetch students' attendance" });
//   }
// });

// // ✅ Get a specific student's full record
// router.get("/students/:studentId", async (req, res) => {
//   try {
//     const student = await Student.findOne({ studentId: req.params.studentId }).select("studentId name subjects attendance");
//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }
//     res.json(student);
//   } catch (error) {
//     console.error("❌ Error fetching student:", error);
//     res.status(500).json({ error: "Failed to fetch student attendance" });
//   }
// });

// // ✅ Get attendance for a student and subject
// router.get("/attendance/:studentId/:subjectId", async (req, res) => {
//   try {
//     const { studentId, subjectId } = req.params;
//     const student = await Student.findOne({ studentId });
//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     const attendanceRecord = student.attendance.find(
//       (record) => record.subject.toString() === subjectId
//     );

//     if (!attendanceRecord) {
//       return res.status(404).json({ message: "Attendance record not found" });
//     }

//     res.json(attendanceRecord);
//   } catch (error) {
//     console.error("❌ Error fetching attendance:", error);
//     res.status(500).json({ error: "Failed to fetch attendance" });
//   }
// });

// // ✅ Mark attendance
// router.post("/mark/:studentId/:subjectId", async (req, res) => {
//   try {
//     const { studentId, subjectId } = req.params;
//     const { attended } = req.body;

//     const student = await Student.findOne({ studentId });
//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     const record = student.attendance.find(
//       (r) => r.subject.toString() === subjectId
//     );

//     if (!record) {
//       return res.status(404).json({ message: "Attendance record not found" });
//     }

//     record.totalClasses += 1;
//     if (attended) record.attendedClasses += 1;
//     record.percentage = (record.attendedClasses / record.totalClasses) * 100;

//     await student.save();
//     res.json({ message: "Attendance marked", record });
//   } catch (error) {
//     console.error("❌ Error marking attendance:", error);
//     res.status(500).json({ error: "Failed to mark attendance" });
//   }
// });

// // ✅ Update attendance
// router.put("/update/:studentId/:subjectId", async (req, res) => {
//   try {
//     const { studentId, subjectId } = req.params;
//     const { totalClasses, attendedClasses } = req.body;

//     const student = await Student.findOne({ studentId });
//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     const record = student.attendance.find(
//       (r) => r.subject.toString() === subjectId
//     );

//     if (!record) {
//       return res.status(404).json({ message: "Attendance record not found" });
//     }

//     record.totalClasses = totalClasses;
//     record.attendedClasses = attendedClasses;
//     record.percentage = (attendedClasses / totalClasses) * 100;

//     await student.save();
//     res.json({ message: "Attendance updated", record });
//   } catch (error) {
//     console.error("❌ Error updating attendance:", error);
//     res.status(500).json({ error: "Failed to update attendance" });
//   }
// });

// // ✅ Delete attendance
// router.delete("/delete/:studentId/:subjectId", async (req, res) => {
//   try {
//     const { studentId, subjectId } = req.params;

//     const student = await Student.findOne({ studentId });
//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     student.attendance = student.attendance.filter(
//       (r) => r.subject.toString() !== subjectId
//     );

//     await student.save();
//     res.json({ message: "Attendance record deleted" });
//   } catch (error) {
//     console.error("❌ Error deleting attendance:", error);
//     res.status(500).json({ error: "Failed to delete attendance" });
//   }
// });

// export default router;
import express from "express";
import Student from "../models/Student.js";
import Subject from "../models/Subject.js";

const router = express.Router();

const attendanceCodes = {}; // in-memory store

// ✅ Get students by department and section
router.get("/students", async (req, res) => {
  const { department, section } = req.query;

  try {
    const students = await Student.find({
      department: department,
      section: section,
    }).select("studentId name");

    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

// ✅ Get a student's full attendance info with populated subjects
router.get("/students/:studentId", async (req, res) => {
  try {
    const student = await Student.findOne({ studentId: req.params.studentId })
      .populate("attendance.subject");

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get subject by subjectId
router.get("/subjects/:id", async (req, res) => {
  try {
    const subject = await Subject.findOne({ subjectId: req.params.id });
    if (!subject) {
      return res.status(404).json({ error: "Subject not found" });
    }
    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// ✅ Generate attendance code and store in memory
router.post("/generate-attendance-code", async (req, res) => {
  const { subjectId, department } = req.body;
  const code = Math.floor(1000 + Math.random() * 9000).toString();
  
  // Extend code validity to 5 minutes (300000ms)
  const expiryTime = Date.now() + 300000;
  
  attendanceCodes[subjectId] = {
    code,
    timestamp: new Date(),
    isActive: true,
    expiresAt: expiryTime,
    department
  };
  
  console.log(`✅ Generated new code for ${subjectId}: ${code} (expires at ${new Date(expiryTime).toLocaleTimeString()})`);
  
  res.json({ 
    code,
    expiresAt: expiryTime
  });
});


// ✅ Store attendance code (optional)
router.post("/store-attendance-code", async (req, res) => {
  const { subjectId, code } = req.body;
  attendanceCodes[subjectId] = {
    code,
    timestamp: new Date(),
    isActive: true,
  };
  res.json({ success: true });
});

// // ✅ Get attendance status
// router.get("/get-attendance-status", async (req, res) => {
//   const { subjectId, date } = req.query;

//   if (!subjectId || !date) {
//     return res.status(400).json({
//       success: false,
//       message: "Subject ID and date are required",
//     });
//   }

//   try {
//     const subject = await Subject.findOne({ subjectId });
//     if (!subject) {
//       return res.status(404).json({ success: false, message: "Subject not found" });
//     }

//     const enrolledStudents = await Student.find({ "attendance.subject": subject._id })
//       .select("studentId name");

//     const presentStudents = await Student.find({
//       attendedSessions: { $in: [`${subjectId}-${date}`] },
//     }).select("studentId name");

//     const presentIds = presentStudents.map(s => s.studentId);

//     const records = enrolledStudents.map(student => ({
//       studentId: student.studentId,
//       name: student.name,
//       status: presentIds.includes(student.studentId) ? "present" : "absent",
//     }));

//     res.json(records);
//   } catch (error) {
//     console.error("Error fetching attendance status:", error);
//     res.status(500).json({ success: false, message: "Server error." });
//   }
// });
// ✅ Get attendance status
router.get("/get-attendance-status", async (req, res) => {
  const { subjectId, date } = req.query;

  if (!subjectId || !date) {
    return res.status(400).json({
      success: false,
      message: "Subject ID and date are required",
    });
  }

  try {
    // 🔁 Changed from findOne({ subjectId }) to findById(subjectId)
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ success: false, message: "Subject not found" });
    }

    const enrolledStudents = await Student.find({ "attendance.subject": subject._id })
      .select("studentId name");

    const presentStudents = await Student.find({
      attendedSessions: { $in: [`${subjectId}-${date}`] },
    }).select("studentId name");

    const presentIds = presentStudents.map(s => s.studentId);

    const records = enrolledStudents.map(student => ({
      studentId: student.studentId,
      name: student.name,
      status: presentIds.includes(student.studentId) ? "present" : "absent",
    }));

    res.json(records);
  } catch (error) {
    console.error("Error fetching attendance status:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});


// ✅ Submit manual attendance
router.post("/submit-manual-attendance", async (req, res) => {
  const { subjectId, attendance, date } = req.body;

  if (!subjectId || !attendance || !date) {
    return res.status(400).json({
      success: false,
      message: "Subject ID, attendance data, and date are required",
    });
  }

  try {
    // ✅ Use findById here if subjectId is ObjectId
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ success: false, message: "Subject not found" });
    }

    const sessionId = `${subjectId}-${date}`;
    const studentIds = Object.keys(attendance);

    for (const studentId of studentIds) {
      const status = attendance[studentId];
      const student = await Student.findOne({ studentId });

      if (!student) continue;

      if (!student.attendedSessions) {
        student.attendedSessions = [];
      }

      let attendanceRecord = student.attendance.find(
        a => a.subject?.toString() === subject._id.toString()
      );

      if (!attendanceRecord) {
        attendanceRecord = {
          subject: subject._id,
          attendedClasses: 0,
          totalClasses: 0,
          percentage: 0,
          lastMarked: new Date(),
        };
        student.attendance.push(attendanceRecord);
      }

      const alreadyMarked = student.attendedSessions.includes(sessionId);
      attendanceRecord.totalClasses += 1;

      if (status === "present") {
        if (!alreadyMarked) {
          attendanceRecord.attendedClasses += 1;
          student.attendedSessions.push(sessionId);
        }
      } else {
        if (alreadyMarked) {
          student.attendedSessions = student.attendedSessions.filter(
            id => id !== sessionId
          );
        }
      }

      attendanceRecord.percentage =
        (attendanceRecord.attendedClasses / attendanceRecord.totalClasses) * 100;
      attendanceRecord.lastMarked = new Date();

      await student.save();
    }

    res.json({
      success: true,
      message: "Manual attendance recorded successfully",
    });
  } catch (error) {
    console.error("Error recording manual attendance:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message,
    });
  }
});
// ✅ Student submits code to mark attendance
router.post("/submit-random-code", async (req, res) => {
  const { studentId, subjectId, code } = req.body;

  if (!studentId || !subjectId || !code) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    console.log(`📊 Validating code: ${code} for subject: ${subjectId}`);
    console.log(`📊 Current codes in memory:`, JSON.stringify(attendanceCodes));
    
    // Check if the code exists for this subject
    const validCodeEntry = attendanceCodes[subjectId];
    
    if (!validCodeEntry) {
      console.log(`❌ No code found for subject: ${subjectId}`);
      return res.status(400).json({ message: "Invalid or expired code" });
    }
    
    // Check if code is active, matching, and not expired
    if (
      !validCodeEntry.isActive ||
      validCodeEntry.code !== code ||
      (validCodeEntry.expiresAt && validCodeEntry.expiresAt < Date.now())
    ) {
      console.log(`❌ Code validation failed:`);
      console.log(`- Is active: ${validCodeEntry.isActive}`);
      console.log(`- Code match: ${validCodeEntry.code === code}`);
      console.log(`- Expiry: ${validCodeEntry.expiresAt}, Current: ${Date.now()}`);
      return res.status(400).json({ message: "Invalid or expired code" });
    }

    // Find subject by subjectId, not by _id
    const subject = await Subject.findById(subjectId); // uses _id from MongoDB

    if (!subject) {
      console.log(`❌ Subject not found with subjectId: ${subjectId}`);
      return res.status(404).json({ message: "Subject not found" });
    }

    // Find student by studentId
    const student = await Student.findOne({ studentId });
    if (!student) {
      console.log(`❌ Student not found with studentId: ${studentId}`);
      return res.status(404).json({ message: "Student not found" });
    }

    const today = new Date().toISOString().split("T")[0];
    const sessionId = `${subjectId}-${today}`;
    
    console.log(`📝 Marking attendance for session: ${sessionId}`);

    // Check if attendance is already marked for this session
    if (student.attendedSessions && student.attendedSessions.includes(sessionId)) {
      console.log(`ℹ️ Attendance already marked for this session`);
      
      // Get the existing attendance record to send back
      const record = student.attendance.find(
        (a) => a.subject?.toString() === subject._id.toString()
      );
      
      return res.json({
        success: true,
        message: "Attendance already marked for today",
        attendance: record
      });
    }

    // Initialize attendedSessions array if it doesn't exist
    if (!student.attendedSessions) {
      student.attendedSessions = [];
    }
    
    // Add the session ID to attended sessions
    student.attendedSessions.push(sessionId);

    // Find the attendance record for this subject
    let record = student.attendance?.find(
      (a) => a.subject?.toString() === subject._id.toString()
    );

    if (record) {
      // Update existing record
      record.attendedClasses += 1;
      record.totalClasses += 1;
      record.percentage = (record.attendedClasses / record.totalClasses) * 100;
      record.lastMarked = new Date();
    } else {
      // Create new record if none exists
      if (!student.attendance) {
        student.attendance = [];
      }
      
      record = {
        subject: subject._id,
        attendedClasses: 1,
        totalClasses: 1,
        percentage: 100,
        lastMarked: new Date()
      };
      
      student.attendance.push(record);
    }

    // Save the updated student record
    await student.save();
    
    console.log(`✅ Attendance marked successfully for ${studentId}`);

    // Return success with the updated attendance record
    res.json({
      success: true,
      message: "Attendance marked successfully",
      attendance: record
    });
  } catch (error) {
    console.error("🔥 Error in random code submission:", error);
    res.status(500).json({ message: "Server error", details: error.message });
  }
});
router.get("/debug-codes", async (req, res) => {
  // Extract just the important information
  const debugInfo = {};
  
  for (const [subjectId, codeData] of Object.entries(attendanceCodes)) {
    debugInfo[subjectId] = {
      code: codeData.code,
      isActive: codeData.isActive,
      created: codeData.timestamp,
      expires: codeData.expiresAt ? new Date(codeData.expiresAt).toLocaleTimeString() : 'never',
      isExpired: codeData.expiresAt ? (codeData.expiresAt < Date.now()) : false,
      timeRemaining: codeData.expiresAt ? Math.floor((codeData.expiresAt - Date.now()) / 1000) + ' seconds' : 'n/a'
    };
  }
  
  res.json({
    currentTime: new Date().toLocaleTimeString(),
    codes: debugInfo
  });
});
// ✅ Check if code is active for a subject
router.get("/code-status/:subjectId", (req, res) => {
  const { subjectId } = req.params;

  const codeData = attendanceCodes[subjectId];

  if (!codeData || !codeData.isActive) {
    return res.status(404).json({ active: false, message: "No active code" });
  }

  const now = new Date();
  const createdAt = new Date(codeData.timestamp);
  const minutesPassed = Math.floor((now - createdAt) / 60000);

  if (minutesPassed >= 5) {
    codeData.isActive = false;
    return res.status(410).json({ active: false, message: "Code expired" });
  }

  return res.json({
    active: true,
    createdAt: codeData.timestamp,
    timeRemaining: 5 - minutesPassed
  });
});


export default router;

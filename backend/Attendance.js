// import mongoose from "mongoose";
// import Student from "./models/Student.js";
// import Subject from "./models/Subject.js";

// // MongoDB Connection
// mongoose.connect("mongodb://localhost:27017/attendance", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const updateAttendance = async () => {
//   try {
//     const students = await Student.find();
//     const subjects = await Subject.find();

//     if (students.length === 0 || subjects.length === 0) {
//       console.log("❌ No students or subjects found!");
//       return;
//     }

//     const totalClassesPerSubject = {};
//     subjects.forEach(subject => {
//       totalClassesPerSubject[subject._id] = 31; // Fixed total classes
//     });

//     for (const student of students) {
//       const updatedAttendance = subjects.map(subject => {
//         const totalClasses = totalClassesPerSubject[subject._id]; // Fixed for all
//         const attendedClasses = Math.floor(Math.random() * (totalClasses - 10 + 1)) + 10; // 10 to 30

//         return {
//           subject: subject._id,
//           totalClasses,
//           attendedClasses,
//           percentage: ((attendedClasses / totalClasses) * 100).toFixed(2),
//         };
//       });

//       // ✅ Ensure attendance is updated in MongoDB
//       await Student.findByIdAndUpdate(student._id, { $set: { attendance: updatedAttendance } });

    
//     }

//     console.log("🎯 Attendance updated for all students successfully!");
//   } catch (error) {
//     console.error("❌ Error updating attendance:", error);
//   } finally {
//     mongoose.connection.close();
//   }
// };

// updateAttendance();

//---
import mongoose from "mongoose";
import Student from "../models/Student.js";
import Subject from "../models/Subject.js";

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/attendance", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 🚩 Change this to false if you want all zeros (init mode)
const USE_RANDOM_ATTENDANCE = true;

const updateAttendance = async () => {
  try {
    const students = await Student.find();
    const subjects = await Subject.find();

    if (students.length === 0 || subjects.length === 0) {
      console.log("❌ No students or subjects found!");
      return;
    }

    const totalClassesPerSubject = {};
    subjects.forEach(subject => {
      totalClassesPerSubject[subject._id] = USE_RANDOM_ATTENDANCE ? 31 : 0;
    });

    for (const student of students) {
      const updatedAttendance = subjects.map(subject => {
        const totalClasses = totalClassesPerSubject[subject._id];
        const attendedClasses = USE_RANDOM_ATTENDANCE
          ? Math.floor(Math.random() * (totalClasses - 10 + 1)) + 10
          : 0;

        const percentage = totalClasses === 0
          ? "0.00"
          : ((attendedClasses / totalClasses) * 100).toFixed(2);

        return {
          subject: subject._id,
          totalClasses,
          attendedClasses,
          percentage
        };
      });

      console.log(`📋 Updating attendance for ${student.studentId}`);
      await Student.findByIdAndUpdate(student._id, {
        $set: { attendance: updatedAttendance }
      });
    }

    console.log("🎯 Attendance updated for all students successfully!");
  } catch (error) {
    console.error("❌ Error updating attendance:", error);
  } finally {
    mongoose.connection.close();
  }
};

updateAttendance();

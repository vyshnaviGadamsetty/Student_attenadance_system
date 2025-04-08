import express from "express";
import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";


const router = express.Router();

// 🔹 Admin Stats API
router.get('/stats', async (req, res) => {
    try {
      const studentsCount = await Student.countDocuments();
      const teachersCount = await Teacher.countDocuments();
      //const sectionsCount = await Section.countDocuments();
  
      const students = await Student.find();
      
      let totalAttendance = 0;
      let totalStudents = students.length;
  
      students.forEach(student => {
        let totalPercentage = 0;
        student.attendance.forEach(subject => {
          totalPercentage += parseFloat(subject.percentage);
        });
  
        if (student.attendance.length > 0) {
          totalAttendance += totalPercentage / student.attendance.length; 
        }
      });
  
      const avgAttendance = totalStudents > 0 ? (totalAttendance / totalStudents).toFixed(2) : "0.00";
  
      res.json({
        students: studentsCount,
        teachers: teachersCount,
       // sections: sectionsCount,
        attendance: avgAttendance
      });
  
    } catch (error) {
      console.error("❌ Error in fetching stats:", error);
      res.status(500).json({ error: "Error fetching stats" });
    }
  });
  
  

export default router;

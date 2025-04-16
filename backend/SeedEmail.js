import mongoose from "mongoose";
import Student from "./models/Student.js"; // ✅ Fixed relative path

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/attendance", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const updateEmails = async () => {
  try {
    const students = await Student.find();

    if (students.length === 0) {
      console.log("❌ No students found!");
      return;
    }

    for (const student of students) {
      const rawName = student.name.trim().toLowerCase();
      const formattedName = rawName.replace(/\s+/g, '').replace(/\./g, '');
      const email = `${formattedName}_${student.studentId}@university.com`;

      await Student.findByIdAndUpdate(student._id, {
        $set: { email: email }
      });

      console.log(`📧 Email set for ${student.studentId} ➜ ${email}`);
    }

    console.log("🎯 Emails updated for all students successfully!");
  } catch (error) {
    console.error("❌ Error updating emails:", error);
  } finally {
    mongoose.connection.close();
  }
};

updateEmails();

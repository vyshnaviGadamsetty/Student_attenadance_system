import mongoose from "mongoose";
import Teacher from "./models/Teacher.js"; // Adjust path if needed

mongoose.connect("mongodb://localhost:27017/attendance", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const updateTeacherEmails = async () => {
  try {
    const teachers = await Teacher.find();

    if (teachers.length === 0) {
      console.log("❌ No teachers found!");
      return;
    }

    for (const teacher of teachers) {
      const rawName = teacher.name.trim().toLowerCase();
      const formattedName = rawName.replace(/\s+/g, '').replace(/\./g, '');
      const email = `${formattedName}_${teacher.teacherId}@college.com`;

      await Teacher.findByIdAndUpdate(teacher._id, {
        $set: { email }
      });

      console.log(`📧 Email set for ${teacher.teacherId} ➜ ${email}`);
    }

    console.log("🎯 Emails updated for all teachers successfully!");
  } catch (error) {
    console.error("❌ Error updating teacher emails:", error);
  } finally {
    mongoose.connection.close();
  }
};

updateTeacherEmails();

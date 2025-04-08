import mongoose from "mongoose";
import Timetable from "./models/Timetable.js";
import Subject from "./models/Subject.js";

// 🔄 Replace with your actual MongoDB URI
const mongoURI = "mongodb://localhost:27017/attendance"; // change this

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", async () => {
  console.log("✅ Connected to MongoDB");

  try {
    const timetables = await Timetable.find();

    for (const tt of timetables) {
      // Skip if subjectId is already a string like "SUB001"
      if (typeof tt.subjectId === "string" && tt.subjectId.startsWith("SUB")) {
        console.log(`✅ Already OK: ${tt.subjectId}`);
        continue;
      }

      // Find Subject using ObjectId
      const subject = await Subject.findById(tt.subjectId);

      if (subject && subject.subjectId) {
        tt.subjectId = subject.subjectId;
        await tt.save();
        console.log(`🔁 Updated ${tt._id} ➜ ${subject.subjectId}`);
      } else {
        console.warn(`⚠️ Subject not found for timetable ${tt._id}`);
      }
    }

    console.log("🎉 All subjectIds updated successfully!");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    mongoose.disconnect();
  }
});

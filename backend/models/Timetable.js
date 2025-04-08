// import mongoose from "mongoose";

// const TimetableSchema = new mongoose.Schema(
//   {
//     teacherId: { type: String, required: true },
//     section: { type: String, required: true },
//     subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true }, // Only keep subjectId
//     day: { type: String, required: true },
//     timeSlot: { type: String, required: true },
//   },
//   { versionKey: false }
// );

// const Timetable = mongoose.model("Timetable", TimetableSchema);
// export default Timetable;
import mongoose from "mongoose";

const TimetableSchema = new mongoose.Schema(
  {
    teacherId: { type: String, required: true },
    section: { type: String, required: true },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true
    },
    day: { type: String, required: true },       // e.g., "Monday"
    timeSlot: { type: String, required: true }    // e.g., "9:00 AM - 10:00 AM"
  },
  { versionKey: false }
);

const Timetable = mongoose.model("Timetable", TimetableSchema);
export default Timetable;

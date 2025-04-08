// import mongoose from "mongoose";

// const studentSchema = new mongoose.Schema({
//   studentId: { type: String, required: true, unique: true },
//   name: { type: String, required: true },
//   dob: { type: String, required: true },
//   password: { type: String, required: true },
//   department: { type: String, required: true },
//   section: { type: String, required: true },
//   subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
// });

// const Student = mongoose.model("Student", studentSchema);
// export default Student;

// import mongoose from "mongoose";

// const StudentSchema = new mongoose.Schema({
//   studentId: { type: String, required: true, unique: true },
//   name: { type: String, required: true },
//   dob: { type: String, required: true },
//   password: { type: String, required: true },
//   department: { type: String, required: true },
//   section: { type: String, required: true },
//   subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
//   attendance: [
//     {
//       subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
//       totalClasses: { type: Number, default: 31 }, // Same total classes for all students
//       attendedClasses: { type: Number, default: 0 },
//       percentage: { type: Number, default: 0 },
//     },
//   ],
// });

// export default mongoose.model("Student", StudentSchema);

import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  dob: { type: String, required: true },
  password: { type: String, required: true },
  department: { type: String, required: true },
  section: { type: String },

  // Subjects the student is enrolled in
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],

  // Attendance records for each subject
  attendance: [
    {
      subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
      totalClasses: { type: Number, default: 0 },
      attendedClasses: { type: Number, default: 0 },
      percentage: { type: Number, default: 0 },
      lastMarked: { type: Date }
    }
  ],

  // Optional: to track session IDs or timestamps
  attendedSessions: {
    type: [String],
    default: []
  }
});

export default mongoose.model("Student", StudentSchema);

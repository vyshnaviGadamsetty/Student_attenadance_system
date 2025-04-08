// import mongoose from "mongoose";

// const teacherSchema = new mongoose.Schema({
//   teacherId: { type: String, required: true, unique: true },
//   name: { type: String, required: true },
//   dob: { type: String, required: true },
//   password: { type: String, required: true },
//   //department: { type: String, required: true },
//   sections: [{ type: String }],
//   subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }], // Reference to Subject model
// });

// const Teacher = mongoose.model("Teacher", teacherSchema);
// export default Teacher;
import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  teacherId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  dob: { type: String, required: true },
  password: { type: String, required: true },
  department: { type: String }, // Optional, but good to keep

  // Sections the teacher is assigned to (max 3 per your rule)
  sections: [{ type: String }],

  // Subjects they teach – referenced from Subject collection
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }]
});

export default mongoose.model("Teacher", teacherSchema);

// import mongoose from "mongoose";

// const subjectSchema = new mongoose.Schema({
//   subjectId: { type: String, required: true, unique: true },
//   name: { type: String, required: true },
//   department: { type: [String], required: true },
// });

// const Subject = mongoose.model("Subject", subjectSchema);
// export default Subject;
import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  subjectId: { type: String, required: true, unique: true }, // External identifier
  name: { type: String, required: true },
  department: { type: [String], required: true }, // One subject can belong to multiple depts
  section: { type: String, required: true } // Helps map subjects uniquely to a section
});

export default mongoose.model("Subject", subjectSchema);

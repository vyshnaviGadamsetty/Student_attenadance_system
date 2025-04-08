// import mongoose from "mongoose";

// const AttendanceSchema = new mongoose.Schema({
//   subject: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: "subjects",
//     required: true 
//   },
//   department: { 
//     type: String, 
//     required: true 
//   },
//   section: { 
//     type: String, 
//     required: true 
//   },
//   date: { 
//     type: Date, 
//     required: true,
//     default: Date.now 
//   },
//   code: { 
//     type: String, 
//     required: true 
//   },
//   presentStudents: [{ 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: "students" 
//   }],
//   // Adding expiration time for the code
//   expiresAt: {
//     type: Date,
//     required: true,
//     default: function() {
//       return new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours from creation
//     },
//     index:{expires:"2h"}
//   }
// }, { timestamps: true });

// // Index to make queries faster
// AttendanceSchema.index({ subject: 1, date: 1, code: 1 });

// export default mongoose.model("Attendance", AttendanceSchema);

import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  subject: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "subjects",
    required: true 
  },
  department: { 
    type: String, 
    required: true 
  },
  section: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true,
    default: Date.now 
  },
  code: { 
    type: String, 
    required: true 
  },
  presentStudents: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "students" 
  }],
  // Adding expiration time for the code
  expiresAt: {
    type: Date,
    required: true,
    default: function() {
      return new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours from creation
    },
    index: { expires: "2h" }
  }
}, { timestamps: true });

// Index to make queries faster
AttendanceSchema.index({ subject: 1, date: 1, code: 1 });

export default mongoose.model("Attendance", AttendanceSchema);
// import mongoose from "mongoose";

// const adminSchema = new mongoose.Schema({
//     adminId: { type: String, required: true },
//     name: { type: String, required: true },
//     dob: { type: String, required: true },
//     password: { type: String, required: true },
// });

// const Admin = mongoose.model("Admin", adminSchema);
// export default Admin;

import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  adminId: { type: String, required: true },
  name: { type: String, required: true },
  dob: { type: String, required: true },
  password: { type: String, required: true },
  resetPasswordToken: { type: String },
resetPasswordExpires: { type: Date },
  email: { type: String, required: true, unique: true } // ✅ Added this line
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;

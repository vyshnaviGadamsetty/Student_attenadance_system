

// import express from "express";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import Admin from "../models/Admin.js";
// import Teacher from "../models/Teacher.js";
// import Student from "../models/Student.js";

// dotenv.config();

// const router = express.Router();

// // Login Route
// router.post("/login", async (req, res) => {
//   const { id, dob } = req.body;
//   console.log("🔹 Login Attempt - ID:", id);

//   if (!id || !dob) {
//     console.log("❌ Missing ID or DOB");
//     return res.status(400).json({ message: "ID and DOB are required" });
//   }

//   try {
//     let user;
//     let role;
//     let userData = {};
//     let tokenPayload = {};

//     if (id.startsWith("A")) {
//       user = await Admin.findOne({ adminId: id.trim() });
//       role = "admin";
//       if (user) {
//         userData = { id: user.adminId, name: user.name };
//         tokenPayload = { id: user._id, role };
//       }
//     } else if (id.startsWith("T")) {
//       user = await Teacher.findOne({ teacherId: id.trim() });
//       role = "teacher";
//       if (user) {
//         userData = { id: user.teacherId, name: user.name, department: user.department };
//         tokenPayload = { id: user._id, role, teacherId: user.teacherId };
//       }
//     } else if (id.startsWith("S")) {
//       user = await Student.findOne({ studentId: id.trim() });
//       role = "student";
//       if (user) {
//         let sectionName = user.section;
//         if (["ECE", "EEE", "Mech", "Civil"].includes(user.department)) {
//           sectionName = user.department;
//         } else {
//           sectionName = `${user.department}-${user.section}`;
//         }
//         userData = { id: user.studentId, name: user.name, section: sectionName };
//         tokenPayload = { id: user._id, role, studentId: user.studentId };
//       }
//     } else {
//       console.log("❌ Invalid ID format:", id);
//       return res.status(400).json({ message: "Invalid ID format" });
//     }

//     if (!user) {
//       console.log("❌ User not found:", id);
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     if (user.dob.trim() !== dob.trim()) {
//       console.log("❌ DOB mismatch! Received:", dob, "Expected:", user.dob);
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // Generate JWT Token
//     const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "1h" });

//     console.log("✅ Login successful - User:", id, "Role:", role);
//     res.json({ message: "Login successful", token, role, user: userData });
//   } catch (error) {
//     console.error("🔥 Server Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;

// import express from "express";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import Admin from "../models/Admin.js";
// import Teacher from "../models/Teacher.js";
// import Student from "../models/Student.js";

// dotenv.config();

// const router = express.Router();

// // POST /api/login
// router.post("/login", async (req, res) => {
//   const { id, dob } = req.body;
//   console.log("🔹 Login Attempt - ID:", id);

//   if (!id || !dob) {
//     return res.status(400).json({ message: "ID and DOB are required" });
//   }

//   try {
//     let user;
//     let role;
//     let userData = {};
//     let tokenPayload = {};

//     // Determine user type
//     if (id.startsWith("A")) {
//       user = await Admin.findOne({ adminId: id.trim() });
//       role = "admin";
//       if (user) {
//         userData = { id: user.adminId, name: user.name };
//         tokenPayload = { id: user._id, role };
//       }
//     } else if (id.startsWith("T")) {
//       user = await Teacher.findOne({ teacherId: id.trim() });
//       role = "teacher";
//       if (user) {
//         userData = { id: user.teacherId, name: user.name, department: user.department };
//         tokenPayload = { id: user._id, role, teacherId: user.teacherId };
//       }
//     } else if (id.startsWith("S")) {
//       user = await Student.findOne({ studentId: id.trim() });
//       role = "student";
//       if (user) {
//         let sectionName = user.section;
//         if (["ECE", "EEE", "Mech", "Civil"].includes(user.department)) {
//           sectionName = user.department;
//         } else {
//           sectionName = `${user.department}-${user.section}`;
//         }
//         userData = { id: user.studentId, name: user.name, section: sectionName };
//         tokenPayload = { id: user._id, role, studentId: user.studentId };
//       }
//     } else {
//       return res.status(400).json({ message: "Invalid ID format" });
//     }

//     // If user not found
//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // DOB check
//     if (user.dob.trim() !== dob.trim()) {
//       console.log("❌ DOB mismatch");
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // Generate JWT token
//     const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "1d" });

//     console.log("✅ Login successful -", role, id);
//     res.json({ message: "Login successful", token, role, user: userData });

//   } catch (error) {
//     console.error("🔥 Login error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
import Admin from "../models/Admin.js";
import Teacher from "../models/Teacher.js";
import Student from "../models/Student.js";
import sendMail from "../utils/sendMail.js";

dotenv.config();
const router = express.Router();

// =======================
// 🔐 LOGIN ROUTE
// =======================
router.post("/login", async (req, res) => {
  const { id, dob } = req.body;
  console.log("🔹 Login Attempt - ID:", id);

  if (!id || !dob) {
    return res.status(400).json({ message: "ID and DOB are required" });
  }

  try {
    let user;
    let role;
    let userData = {};
    let tokenPayload = {};

    if (id.startsWith("A")) {
      user = await Admin.findOne({ adminId: id.trim() });
      role = "admin";
      if (user) {
        userData = { id: user.adminId, name: user.name };
        tokenPayload = { id: user._id, role };
      }
    } else if (id.startsWith("T")) {
      user = await Teacher.findOne({ teacherId: id.trim() });
      role = "teacher";
      if (user) {
        userData = { id: user.teacherId, name: user.name, department: user.department };
        tokenPayload = { id: user._id, role, teacherId: user.teacherId };
      }
    } else if (id.startsWith("S")) {
      user = await Student.findOne({ studentId: id.trim() });
      role = "student";
      if (user) {
        let sectionName = user.section;
        if (["ECE", "EEE", "Mech", "Civil"].includes(user.department)) {
          sectionName = user.department;
        } else {
          sectionName = `${user.department}-${user.section}`;
        }
        userData = { id: user.studentId, name: user.name, section: sectionName };
        tokenPayload = { id: user._id, role, studentId: user.studentId };
      }
    } else {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    // ✅ Use password instead of dob now
    if (!user || user.password.trim() !== dob.trim()) {
      return res.status(401).json({ message: "Invalid ID or Password" });
    }

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "1d" });

    console.log("✅ Login successful -", role, id);
    res.json({ message: "Login successful", token, role, user: userData });

  } catch (error) {
    console.error("🔥 Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// =======================
// 📧 FORGOT PASSWORD
// =======================
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  let user;
  const models = [Student, Teacher, Admin];

  for (const model of models) {
    user = await model.findOne({ email });
    if (user) break;
  }

  if (!user) return res.status(404).json({ message: "Email not found" });

  const token = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 60 * 60 * 1000;
  await user.save();

  const resetLink = `http://localhost:5173/reset-password/${token}`;
  const subject = "Reset Your Password - Attendance System";
  const text = `
Hello ${user.name},

We received a request to reset your password.

Click the link below to set a new password (valid for 1 hour):
${resetLink}

If you didn't request this, you can ignore this email.
`;

  await sendMail(user.email, subject, text);

  res.json({ message: "Reset link sent to your email" });
});

// =======================
// 🔁 RESET PASSWORD
// =======================
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  let user;
  const models = [Student, Teacher, Admin];

  for (const model of models) {
    user = await model.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (user) break;
  }

  if (!user) return res.status(400).json({ message: "Invalid or expired token" });

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ message: "Password reset successful" });
});

export default router;

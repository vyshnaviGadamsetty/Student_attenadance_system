// // import express from "express";
// // import jwt from "jsonwebtoken";
// // import dotenv from "dotenv";
// // import Admin from "../models/Admin.js";
// // import Teacher from "../models/Teacher.js";
// // import Student from "../models/Student.js";

// // dotenv.config();

// // const router = express.Router(); // ✅ Define router only once

// // // Login Route
// // router.post("/login", async (req, res) => {
// //   const { id, dob } = req.body;
// //   console.log("🔹 Login Attempt - ID:", id);

// //   if (!id || !dob) {
// //     console.log("❌ Missing ID or DOB");
// //     return res.status(400).json({ message: "ID and DOB are required" });
// //   }

// //   try {
// //     let user;
// //     let role;

// //     // Check user role based on ID prefix
// //     if (id.startsWith("A")) {
// //       user = await Admin.findOne({ adminId: id.trim() });
// //       role = "admin";
// //     } else if (id.startsWith("T")) {
// //       user = await Teacher.findOne({ teacherId: id.trim() });
// //       role = "teacher";
// //     } else if (id.startsWith("S")) {
// //       user = await Student.findOne({ studentId: id.trim() });
// //       role = "student";
// //     } else {
// //       console.log("❌ Invalid ID format:", id);
// //       return res.status(400).json({ message: "Invalid ID format" });
// //     }

// //     if (!user) {
// //       console.log("❌ User not found:", id);
// //       return res.status(401).json({ message: "Invalid credentials" });
// //     }

// //     console.log("✔️ User Found - Role:", role);

// //     // Ensure DOB format is consistent
// //     const storedDOB = user.dob.trim();
// //     const inputDOB = dob.trim();

// //     if (storedDOB !== inputDOB) {
// //       console.log("❌ DOB mismatch! Received:", inputDOB, "Expected:", storedDOB);
// //       return res.status(401).json({ message: "Invalid credentials" });
// //     }

// //     // Generate JWT Token
// //     const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: "1h" });

// //     console.log("✅ Login successful - User:", id, "Role:", role);
// //     res.json({ message: "Login successful", token, role });

// //   } catch (error) {
// //     console.error("🔥 Server Error:", error);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // });

// // // ✅ Use ES Module Export
// // export default router;

// // import express from "express";
// // import jwt from "jsonwebtoken";
// // import dotenv from "dotenv";
// // import Admin from "../models/Admin.js";
// // import Teacher from "../models/Teacher.js";
// // import Student from "../models/Student.js";

// // dotenv.config();

// // const router = express.Router();

// // // Login Route
// // router.post("/login", async (req, res) => {
// //   const { id, dob } = req.body;
// //   console.log("🔹 Login Attempt - ID:", id);

// //   if (!id || !dob) {
// //     console.log("❌ Missing ID or DOB");
// //     return res.status(400).json({ message: "ID and DOB are required" });
// //   }

// //   try {
// //     let user;
// //     let role;
// //     let userData = {};

// //     if (id.startsWith("A")) {
// //       user = await Admin.findOne({ adminId: id.trim() });
// //       role = "admin";
// //       if (user) userData = { id: user.adminId, name: user.name };
// //     } else if (id.startsWith("T")) {
// //       user = await Teacher.findOne({ teacherId: id.trim() });
// //       role = "teacher";
// //       if (user) userData = { id: user.teacherId, name: user.name, department: user.department };
// //     } else if (id.startsWith("S")) {
// //       user = await Student.findOne({ studentId: id.trim() });
// //       role = "student";
// //       if (user) userData = { id: user.studentId, name: user.name, section: user.section };
// //     } else {
// //       console.log("❌ Invalid ID format:", id);
// //       return res.status(400).json({ message: "Invalid ID format" });
// //     }

// //     if (!user) {
// //       console.log("❌ User not found:", id);
// //       return res.status(401).json({ message: "Invalid credentials" });
// //     }

// //     // Ensure DOB format is consistent
// //     if (user.dob.trim() !== dob.trim()) {
// //       console.log("❌ DOB mismatch! Received:", dob, "Expected:", user.dob);
// //       return res.status(401).json({ message: "Invalid credentials" });
// //     }

// //     // Generate JWT Token
// //     const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: "1h" });

// //     console.log("✅ Login successful - User:", id, "Role:", role);
// //     res.json({ message: "Login successful", token, role, user: userData });

// //   } catch (error) {
// //     console.error("🔥 Server Error:", error);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // });

// // export default router;

// // import express from "express";
// // import jwt from "jsonwebtoken";
// // import dotenv from "dotenv";
// // import Admin from "../models/Admin.js";
// // import Teacher from "../models/Teacher.js";
// // import Student from "../models/Student.js";

// // dotenv.config();

// // const router = express.Router();

// // // Login Route
// // router.post("/login", async (req, res) => {
// //   const { id, dob } = req.body;
// //   console.log("🔹 Login Attempt - ID:", id);

// //   if (!id || !dob) {
// //     console.log("❌ Missing ID or DOB");
// //     return res.status(400).json({ message: "ID and DOB are required" });
// //   }

// //   try {
// //     let user;
// //     let role;
// //     let userData = {};

// //     if (id.startsWith("A")) {
// //       user = await Admin.findOne({ adminId: id.trim() });
// //       role = "admin";
// //       if (user) userData = { id: user.adminId, name: user.name };
// //     } else if (id.startsWith("T")) {
// //       user = await Teacher.findOne({ teacherId: id.trim() });
// //       role = "teacher";
// //       if (user) userData = { id: user.teacherId, name: user.name, department: user.department };
// //     } else if (id.startsWith("S")) {
// //       user = await Student.findOne({ studentId: id.trim() });
// //       role = "student";
// //       if (user) {
// //         userData = {
// //           id: user.studentId,
// //           name: user.name,
// //           section: `${user.department}-${user.section}` // Ensuring full section name like "CSE-B"
// //         };
// //       }
// //     } else {
// //       console.log("❌ Invalid ID format:", id);
// //       return res.status(400).json({ message: "Invalid ID format" });
// //     }

// //     if (!user) {
// //       console.log("❌ User not found:", id);
// //       return res.status(401).json({ message: "Invalid credentials" });
// //     }

// //     // Ensure DOB format is consistent
// //     if (user.dob.trim() !== dob.trim()) {
// //       console.log("❌ DOB mismatch! Received:", dob, "Expected:", user.dob);
// //       return res.status(401).json({ message: "Invalid credentials" });
// //     }

// //     // Generate JWT Token
// //     const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: "1h" });

// //     console.log("✅ Login successful - User:", id, "Role:", role);
// //     res.json({ message: "Login successful", token, role, user: userData });
// //   } catch (error) {
// //     console.error("🔥 Server Error:", error);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // });

// // export default router;

// // import express from "express";
// // import jwt from "jsonwebtoken";
// // import dotenv from "dotenv";
// // import Admin from "../models/Admin.js";
// // import Teacher from "../models/Teacher.js";
// // import Student from "../models/Student.js";

// // dotenv.config();

// // const router = express.Router();

// // // Login Route
// // router.post("/login", async (req, res) => {
// //   const { id, dob } = req.body;
// //   console.log("🔹 Login Attempt - ID:", id);

// //   if (!id || !dob) {
// //     console.log("❌ Missing ID or DOB");
// //     return res.status(400).json({ message: "ID and DOB are required" });
// //   }

// //   try {
// //     let user;
// //     let role;
// //     let userData = {};

// //     if (id.startsWith("A")) {
// //       user = await Admin.findOne({ adminId: id.trim() });
// //       role = "admin";
// //       if (user) userData = { id: user.adminId, name: user.name };
// //     } else if (id.startsWith("T")) {
// //       user = await Teacher.findOne({ teacherId: id.trim() });
// //       role = "teacher";
// //       if (user) userData = { id: user.teacherId, name: user.name, department: user.department };
// //     } else if (id.startsWith("S")) {
// //       user = await Student.findOne({ studentId: id.trim() });
// //       role = "student";
// //       if (user) {
// //         let sectionName = user.section;

// //         // Remove "-A" for departments that don't have multiple sections
// //         if (["ECE", "EEE", "Mech", "Civil"].includes(user.department)) {
// //           sectionName = user.department; // Only department name
// //         } else {
// //           sectionName = `${user.department}-${user.section}`; // Keep full section name like "CSE-A"
// //         }

// //         userData = {
// //           id: user.studentId,
// //           name: user.name,
// //           section: sectionName
// //         };
// //       }
// //     } else {
// //       console.log("❌ Invalid ID format:", id);
// //       return res.status(400).json({ message: "Invalid ID format" });
// //     }

// //     if (!user) {
// //       console.log("❌ User not found:", id);
// //       return res.status(401).json({ message: "Invalid credentials" });
// //     }

// //     // Ensure DOB format is consistent
// //     if (user.dob.trim() !== dob.trim()) {
// //       console.log("❌ DOB mismatch! Received:", dob, "Expected:", user.dob);
// //       return res.status(401).json({ message: "Invalid credentials" });
// //     }

// //     // Generate JWT Token
// //     const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: "1h" });

// //     console.log("✅ Login successful - User:", id, "Role:", role);
// //     res.json({ message: "Login successful", token, role, user: userData });
// //   } catch (error) {
// //     console.error("🔥 Server Error:", error);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // });

// // export default router;

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

import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";
import Teacher from "../models/Teacher.js";
import Student from "../models/Student.js";

dotenv.config();

const router = express.Router();

// POST /api/login
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

    // Determine user type
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

    // If user not found
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // DOB check
    if (user.dob.trim() !== dob.trim()) {
      console.log("❌ DOB mismatch");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "1d" });

    console.log("✅ Login successful -", role, id);
    res.json({ message: "Login successful", token, role, user: userData });

  } catch (error) {
    console.error("🔥 Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

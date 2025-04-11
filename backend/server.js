

// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";

// // 🔹 Resolve correct directory path
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // 🔹 Load environment variables
// dotenv.config({ path: path.join(__dirname, "../backend/.env") });

// // 🔹 Check required environment variables
// const REQUIRED_ENV_VARS = ["MONGO_URI", "PORT"];
// REQUIRED_ENV_VARS.forEach((key) => {
//   if (!process.env[key]) {
//     console.error(`❌ Missing environment variable: ${key}`);
//     process.exit(1);
//   }
// });

// // 🔹 Initialize Express app
// const app = express();

// // 🔹 Middleware
// app.use(express.json());
// app.use(cors());

// // 🔹 Global Request Logger (for debugging)
// app.use((req, res, next) => {
//   console.log(`📢 ${req.method} request to ${req.url}`);
//   next();
// });

// // 🔹 Import Routes
// import summariesRouter from "./routes/summaryRoutes.js";

// import authRoutes from "./routes/authRoutes.js";
// import studentRoutes from "./routes/studentRoutes.js";
// import subjectsRoutes from "./routes/subjectsRoutes.js";
// import timetableRoutes from "./routes/TimetableRoutes.js";
// import teacherRoutes from "./routes/teacherRoutes.js";
// import sectionTimetableRoutes from "./routes/sectionTimetableRoutes.js";
// import attendanceRoutes from "./routes/attendanceRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import attendanceRequestRoutes from './routes/attendanceRequestRoutes.js';
// // 🔹 Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/students", studentRoutes);
// app.use("/api/subjects", subjectsRoutes);
// app.use("/api/timetable", timetableRoutes);
// app.use("/api/teachers", teacherRoutes);
// app.use("/api/section-timetable", sectionTimetableRoutes);
// app.use("/api/attendance", attendanceRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/attendance-request",attendanceRequestRoutes);
// app.use("/api/summaries", summariesRouter);

// // 🔹 Connect to MongoDB
// async function connectDB() {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("✅ MongoDB Connected");
//   } catch (error) {
//     console.error("❌ MongoDB Connection Error:", error.message);
//     process.exit(1); // Stop server if DB connection fails
//   }
// }
// connectDB();

// // 🔹 Start Server
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// ✅ Final Merged server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// 🔹 Resolve correct directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔹 Load environment variables
dotenv.config({ path: path.join(__dirname, "../backend/.env") });

// 🔹 Validate required environment variables
const REQUIRED_ENV_VARS = ["MONGO_URI", "PORT"];
REQUIRED_ENV_VARS.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing environment variable: ${key}`);
    process.exit(1);
  }
});

// 🔹 Initialize Express app
const app = express();

// 🔹 Middleware
app.use(express.json());
app.use(cors());

// 🔹 Request Logger (for debugging)
app.use((req, res, next) => {
  console.log(`📢 ${req.method} request to ${req.url}`);
  next();
});

// 🔹 Import Routes
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import subjectsRoutes from "./routes/subjectsRoutes.js";
import timetableRoutes from "./routes/TimetableRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import nandiniRoutes from "./routes/nandiniRoutes.js"; // optional/legacy
import attendanceRoutes from "./routes/attendanceRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import sectionTimetableRoutes from "./routes/sectionTimetableRoutes.js";
import attendanceRequestRoutes from "./routes/attendanceRequestRoutes.js";
import summariesRouter from "./routes/summaryRoutes.js";

// 🔹 Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/subjects", subjectsRoutes);
app.use("/api/timetable", timetableRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/section-timetable", sectionTimetableRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/attendance-request", attendanceRequestRoutes);
app.use("/api/summaries", summariesRouter);


// 🔹 Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
}
connectDB();

// 🔹 Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

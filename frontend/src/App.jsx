

// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Logout from "./pages/Logout";

// import DashboardLayout from "./layouts/DashboardLayout";
// import ManageStudents from "./pages/admin/ManageStudents";
// import ManageTeachers from "./pages/admin/ManageTeachers";
// import ManageTeacherTimetable from "./pages/admin/ManageTeacherTimetable";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import ManageSectionTimetable from "./pages/admin/ManageSectionTimetable";
// import StudentTimetable from "./pages/student/StudentTimetable";
// import StudentAttendanceView from "./pages/student/ViewAttendance";
// import RequestAttendance from "./pages/student/RequestAttendance";
// import ViewRequests from "./pages/teacher/ViewRequest";
// import TeacherSummaries from "./pages/teacher/TeacherSummaries";
// import StudentSummaries from "./pages/student/StudentSummaries";
// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Login & Logout */}
//         <Route path="/" element={<Login />} />
//         <Route path="/logout" element={<Logout />} />
        
//         {/* Admin Dashboard */}
//         <Route path="/admin/" element={<DashboardLayout />}>
//           <Route path="dashboard" element={<AdminDashboard />} />
//           <Route path="manage-students" element={<ManageStudents />} />
//           <Route path="manage-teachers" element={<ManageTeachers />} />
//           <Route path="manage-teachers-timetable" element={<ManageTeacherTimetable />} />
//           <Route path="manage-section-timetable" element={<ManageSectionTimetable />} />
//         </Route>
        
//         {/* Teacher Routes */}
//         <Route path="/teacher" element={<DashboardLayout />}>
//           {/* Redirect /teacher/dashboard to /teacher/post-summary */}
//           <Route path="dashboard" element={<Navigate to="/teacher/post-summary" replace />} />
//           <Route path="post-summary" element={<TeacherSummaries />} />
//           <Route path="attendance-requests" element={<ViewRequests />} />
//         </Route>
        
//         {/* Student Routes */}
//         <Route path="/student" element={<DashboardLayout />}>
//           {/* Redirect /student/dashboard to /student/timetable */}
//           <Route path="dashboard" element={<Navigate to="/student/timetable" replace />} />
//           <Route path="timetable" element={<StudentTimetable studentSection="CSE-A" />} />
          
//           {/* Student Attendance Routes */}
//           <Route path="attendance" element={<StudentAttendanceView />} />
//           <Route path="attendance/:studentId" element={<StudentAttendanceView />} />
//           <Route path="attendance-request" element={<RequestAttendance />} />
          
//           {/* Other student routes */}
//           <Route path="class-summary" element={<StudentSummaries/>} />
//           <Route path="reports" element={<div>Request Reports</div>} />
//         </Route>
        
//         {/* Catch-all route */}
//         <Route path="*" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Logout from "./pages/Logout";

// import DashboardLayout from "./layouts/DashboardLayout";

// // Admin Pages
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import ManageStudents from "./pages/admin/ManageStudents";
// import ManageTeachers from "./pages/admin/ManageTeachers";
// import ManageTeacherTimetable from "./pages/admin/ManageTeacherTimetable";
// import ManageSectionTimetable from "./pages/admin/ManageSectionTimetable";

// // Teacher Pages
// import TeacherSummaries from "./pages/teacher/TeacherSummaries"; // (post-summary)
// import ViewRequests from "./pages/teacher/ViewRequest";
// import Tt from "./pages/teacher/Tt"; // timetable
// import Att from "./pages/teacher/Att"; // attendance/:dept/:sec/:subid
// import Remarks from "./pages/teacher/Remarks";

// // Student Pages
// import StudentDashboard from "./pages/student/StudentDashboard";
// import StudentTimetable from "./pages/student/StudentTimetable";
// import StudentAttendanceView from "./pages/student/ViewAttendance";
// import RequestAttendance from "./pages/student/RequestAttendance";
// import Summary from "./pages/student/StudentSummaries";
// import EnterRandomCode from "./pages/student/StudentAttendance"; // or correct path if different


// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* 🔐 Auth */}
//         <Route path="/" element={<Login />} />
//         <Route path="/logout" element={<Logout />} />

//         {/* 🛠 Admin Routes */}
//         <Route path="/admin" element={<DashboardLayout />}>
//           <Route path="dashboard" element={<AdminDashboard />} />
//           <Route path="manage-students" element={<ManageStudents />} />
//           <Route path="manage-teachers" element={<ManageTeachers />} />
//           <Route path="manage-teachers-timetable" element={<ManageTeacherTimetable />} />
//           <Route path="manage-section-timetable" element={<ManageSectionTimetable />} />
//         </Route>

//         {/* 👨‍🏫 Teacher Routes */}
//         <Route path="/teacher" element={<DashboardLayout />}>
//           <Route path="dashboard" element={<Navigate to="/teacher/post-summary" replace />} />
//           <Route path="post-summary" element={<TeacherSummaries />} />
//           <Route path="attendance-requests" element={<ViewRequests />} />
//           <Route path="timetable" element={<Tt />} />
//           <Route path="attendance/:department/:section/:subjectId" element={<Att />} />
         
//         </Route>

//         {/* 👩‍🎓 Student Routes */}
//         <Route path="/student" element={<DashboardLayout />}>
//         <Route path="dashboard" element={<Navigate to="/student/timetable" replace />} />

//           <Route path="timetable" element={<StudentTimetable />} />
//           <Route path="attendance" element={<StudentAttendanceView />} />
//           <Route path="attendance/:studentId" element={<StudentAttendanceView />} />
//           <Route path="attendance-request" element={<RequestAttendance />} />
//           <Route path="summary" element={<Summary />} />
//           <Route path="enter-code" element={<EnterRandomCode />} />

//         </Route>

//         {/* 🔁 Fallback */}
//         <Route path="*" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

//----
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the protected route component

import DashboardLayout from "./layouts/DashboardLayout";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageStudents from "./pages/admin/ManageStudents";
import ManageTeachers from "./pages/admin/ManageTeachers";
import ManageTeacherTimetable from "./pages/admin/ManageTeacherTimetable";
import ManageSectionTimetable from "./pages/admin/ManageSectionTimetable";

// Teacher Pages
import TeacherSummaries from "./pages/teacher/TeacherSummaries"; // (post-summary)
import ViewRequests from "./pages/teacher/ViewRequest";
import Tt from "./pages/teacher/Tt"; // timetable
import Att from "./pages/teacher/Att"; // attendance/:dept/:sec/:subid
import Remarks from "./pages/teacher/Remarks";

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentTimetable from "./pages/student/StudentTimetable";
import StudentAttendanceView from "./pages/student/ViewAttendance";
import RequestAttendance from "./pages/student/RequestAttendance";
import Summary from "./pages/student/StudentSummaries";
import EnterRandomCode from "./pages/student/StudentAttendance"; // or correct path if different

function App() {
  return (
    <Router>
      <Routes>
        {/* 🔐 Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        {/* 🛠 Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="manage-students" element={<ManageStudents />} />
            <Route path="manage-teachers" element={<ManageTeachers />} />
            <Route path="manage-teachers-timetable" element={<ManageTeacherTimetable />} />
            <Route path="manage-section-timetable" element={<ManageSectionTimetable />} />
          </Route>
        </Route>

        {/* 👨‍🏫 Teacher Routes */}
        <Route path="/teacher" element={<ProtectedRoute allowedRoles={["teacher"]} />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<Navigate to="/teacher/post-summary" replace />} />
            <Route path="dashboard" element={<Navigate to="/teacher/post-summary" replace />} />
            <Route path="post-summary" element={<TeacherSummaries />} />
            <Route path="attendance-requests" element={<ViewRequests />} />
            <Route path="timetable" element={<Tt />} />
            <Route path="attendance/:department/:section/:subjectId" element={<Att />} />
          </Route>
        </Route>

        {/* 👩‍🎓 Student Routes */}
        <Route path="/student" element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<Navigate to="/student/timetable" replace />} />
            <Route path="dashboard" element={<Navigate to="/student/timetable" replace />} />
            <Route path="timetable" element={<StudentTimetable />} />
            <Route path="attendance" element={<StudentAttendanceView />} />
            <Route path="attendance/:studentId" element={<StudentAttendanceView />} />
            <Route path="attendance-request" element={<RequestAttendance />} />
            <Route path="summary" element={<Summary />} />
            <Route path="enter-code" element={<EnterRandomCode />} />
          </Route>
        </Route>

        {/* 🔁 Fallback */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
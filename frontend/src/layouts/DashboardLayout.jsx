// // import Sidebar from "../components/Sidebar";
// // import StudentSidebar from "../components/StudentSidebar";
// // import "../styles/Dashboard.css";
// // import { Outlet, useLocation } from "react-router-dom";
// // import { useState } from "react";

// // const DashboardLayout = () => {
// //   const [isCollapsed, setIsCollapsed] = useState(false);
// //   const location = useLocation();
  
// //   // Check if we're in the student section
// //   const isStudentRoute = location.pathname.startsWith('/student');

// //   return (
// //     <div className="dashboard-layout">
// //       {/* Render ONLY the appropriate sidebar based on the route */}
// //       {isStudentRoute ? (
// //         <StudentSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
// //       ) : (
// //         <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
// //       )}
      
// //       {/* Main Content */}
// //       <div className={`dashboard-content ${isCollapsed ? "expanded" : ""}`}>
// //         <Outlet />
// //       </div>
// //     </div>
// //   );
// // };

// // export default DashboardLayout;

// import StudentSidebar from "../components/StudentSidebar";
// import TeacherSidebar from "../components/TeacherSidebar";
// import Sidebar from "../components/Sidebar";
// import "../styles/Dashboard.css";
// import { Outlet, useLocation } from "react-router-dom";
// import { useState } from "react";

// const DashboardLayout = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const location = useLocation();
  
//   // Determine user role based on the URL path
//   const isStudentRoute = location.pathname.startsWith('/student');
//   const isTeacherRoute = location.pathname.startsWith('/teacher');

//   return (
//     <div className="dashboard-layout">
//       {/* Render appropriate sidebar based on role */}
//       {isStudentRoute ? (
//         <StudentSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
//       ) : isTeacherRoute ? (
//         <TeacherSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
//       ) : (
//         <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
//       )}
      
//       {/* Main Content */}
//       <div className={`dashboard-content ${isCollapsed ? "expanded" : ""}`}>
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// // export default DashboardLayout;
// import { useEffect, useState } from "react";
// import { useNavigate, useLocation, Outlet } from "react-router-dom";
// import StudentSidebar from "../components/StudentSidebar";
// import TeacherSidebar from "../components/TeacherSidebar";
// import Sidebar from "../components/Sidebar";
// import "../styles/Dashboard.css";

// const DashboardLayout = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [role, setRole] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // ⛔️ If no role, redirect to login
//   useEffect(() => {
//     const storedRole = localStorage.getItem("role");
//     if (!storedRole) {
//       navigate("/login");
//     } else {
//       setRole(storedRole);
//     }
//   }, [navigate]);

//   // Determine route type
//   const isStudentRoute = location.pathname.startsWith("/student");
//   const isTeacherRoute = location.pathname.startsWith("/teacher");

//   return (
//     <div className="dashboard-layout">
//       {/* ✅ Render based on path OR role fallback */}
//       {isStudentRoute || role === "student" ? (
//         <StudentSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
//       ) : isTeacherRoute || role === "teacher" ? (
//         <TeacherSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
//       ) : (
//         <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
//       )}

//       <div className={`dashboard-content ${isCollapsed ? "expanded" : ""}`}>
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

import { useEffect, useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";
import TeacherSidebar from "../components/TeacherSidebar";
import Sidebar from "../components/Sidebar";
import "../styles/Dashboard.css";

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (!storedRole) {
      navigate("/login");
    } else {
      setRole(storedRole);
    }
  }, [navigate]);

  const isStudentRoute = location.pathname.startsWith("/student");
  const isTeacherRoute = location.pathname.startsWith("/teacher");

  const SidebarComponent = isStudentRoute
    ? StudentSidebar
    : isTeacherRoute
    ? TeacherSidebar
    : Sidebar;

  return (
    <div className="dashboard-layout">
      <SidebarComponent isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={`dashboard-content ${isCollapsed ? "expanded" : ""}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;

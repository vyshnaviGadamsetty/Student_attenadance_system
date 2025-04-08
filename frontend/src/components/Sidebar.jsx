// import { useState } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   FaHome,
//   FaUserGraduate,
//   FaChalkboardTeacher,
//   FaFileAlt,
//   FaSignOutAlt,
//   FaBars,
//   FaCalendarAlt,  
//   FaTable,         
// } from "react-icons/fa";
// import "../styles/Sidebar.css"; 

// const Sidebar = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   return (
//     <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
//       {/* Sidebar Toggle Button */}
//       <button className="toggle-btn" onClick={toggleSidebar}>
//         <FaBars />
//       </button>

//       {/* Sidebar Navigation */}
//       <nav className="sidebar-nav">
//         <NavLink to="/admin/dashboard" className="sidebar-item">
//           <FaHome className="icon" />
//           {!isCollapsed && <span>Home</span>}
//         </NavLink>

//         <NavLink to="/admin/manage-students" className="sidebar-item">
//           <FaUserGraduate className="icon" />
//           {!isCollapsed && <span>Manage Students</span>}
//         </NavLink>

//         <NavLink to="/admin/manage-teachers" className="sidebar-item">
//           <FaChalkboardTeacher className="icon" />
//           {!isCollapsed && <span>Manage Teachers</span>}
//         </NavLink>

//         <NavLink to="/admin/manage-teachers-timetable" className="sidebar-item">
//           <FaCalendarAlt className="icon" />
//           {!isCollapsed && <span>Manage Teacher Timetable</span>}
//         </NavLink>

//         <NavLink to="/admin/manage-section-timetable" className="sidebar-item">
//           <FaTable className="icon" />
//           {!isCollapsed && <span>Manage Section Timetable</span>}
//         </NavLink>

//         <NavLink to="/admin/reports" className="sidebar-item">
//           <FaFileAlt className="icon" />
//           {!isCollapsed && <span>Attendance Reports</span>}
//         </NavLink>
//       </nav>

//       {/* Logout Section */}
//       <div className="sidebar-logout">
//         <NavLink to="/logout" className="sidebar-item logout">
//           <FaSignOutAlt className="icon" />
//           {!isCollapsed && <span>Logout</span>}
//         </NavLink>
//       </div>
//     </div>
//   );
// };

// // export default Sidebar;
// import { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import {
//   FaHome,
//   FaUserGraduate,
//   FaChalkboardTeacher,
//   FaFileAlt,
//   FaSignOutAlt,
//   FaBars,
//   FaCalendarAlt,
//   FaTable,
// } from "react-icons/fa";
// import "../styles/Sidebar.css";

// const Sidebar = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const navigate = useNavigate();

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   const handleLogout = (e) => {
//     e.preventDefault();
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("user");

//     setTimeout(() => {
//       navigate("/logout");
//     }, 500); // Delay for smoother transition
//   };

//   return (
//     <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
//       {/* Sidebar Toggle Button */}
//       <button className="toggle-btn" onClick={toggleSidebar} aria-label="Toggle Sidebar">
//         <FaBars />
//       </button>

//       {/* Sidebar Navigation */}
//       <nav className="sidebar-nav">
//         <NavLink to="/admin/dashboard" className="sidebar-item">
//           <FaHome className="icon" />
//           {!isCollapsed && <span>Home</span>}
//         </NavLink>

//         <NavLink to="/admin/manage-students" className="sidebar-item">
//           <FaUserGraduate className="icon" />
//           {!isCollapsed && <span>Manage Students</span>}
//         </NavLink>

//         <NavLink to="/admin/manage-teachers" className="sidebar-item">
//           <FaChalkboardTeacher className="icon" />
//           {!isCollapsed && <span>Manage Teachers</span>}
//         </NavLink>

//         <NavLink to="/admin/manage-teachers-timetable" className="sidebar-item">
//           <FaCalendarAlt className="icon" />
//           {!isCollapsed && <span>Manage Teacher Timetable</span>}
//         </NavLink>

//         <NavLink to="/admin/manage-section-timetable" className="sidebar-item">
//           <FaTable className="icon" />
//           {!isCollapsed && <span>Manage Section Timetable</span>}
//         </NavLink>

//       </nav>

//       {/* Logout Section */}
//       <div className="sidebar-logout">
//         <button className="sidebar-item logout" onClick={handleLogout}>
//           <FaSignOutAlt className="icon" />
//           {!isCollapsed && <span>Logout</span>}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaTable,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    localStorage.removeItem("adminUser");
    navigate("/logout");
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Toggle button */}
      <button className="toggle-btn" onClick={toggleSidebar} aria-label="Toggle Sidebar">
        <FaBars />
      </button>

      {/* Optional Logo or Title */}
      

      <nav className="sidebar-nav">
        <NavLink to="/admin/dashboard" className="sidebar-item">
          <FaHome className="icon" />
          {!isCollapsed && <span>Home</span>}
        </NavLink>

        <NavLink to="/admin/manage-students" className="sidebar-item">
          <FaUserGraduate className="icon" />
          {!isCollapsed && <span>Manage Students</span>}
        </NavLink>

        <NavLink to="/admin/manage-teachers" className="sidebar-item">
          <FaChalkboardTeacher className="icon" />
          {!isCollapsed && <span>Manage Teachers</span>}
        </NavLink>

        <NavLink to="/admin/manage-teachers-timetable" className="sidebar-item">
          <FaCalendarAlt className="icon" />
          {!isCollapsed && <span>Teacher Timetable</span>}
        </NavLink>

        <NavLink to="/admin/manage-section-timetable" className="sidebar-item">
          <FaTable className="icon" />
          {!isCollapsed && <span>Section Timetable</span>}
        </NavLink>
      </nav>

      {/* Logout Button */}
      <div className="sidebar-logout">
        <button className="sidebar-item logout" onClick={handleLogout}>
          <FaSignOutAlt className="icon" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

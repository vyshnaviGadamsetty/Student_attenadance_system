// import React from "react";
// import { Link } from "react-router-dom";
// import { FaCalendarAlt, FaClipboardList, FaUserCheck, FaBook, FaFileDownload, FaSignOutAlt, FaBars } from "react-icons/fa";
// import "../styles/Sidebar.css";

// const StudentSidebar = ({ isCollapsed, setIsCollapsed }) => {
//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   return (
//     <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
//       <button className="toggle-btn" onClick={toggleSidebar}>
//         <FaBars />
//       </button>
//       <nav className="sidebar-nav">
//         <Link to="/student/timetable" className="sidebar-item">
//           <FaCalendarAlt className="icon" /> {!isCollapsed && "Timetable"}
//         </Link>
//         <Link to="/student/attendance" className="sidebar-item">
//           <FaClipboardList className="icon" /> {!isCollapsed && "Attendance Records"}
//         </Link>
//         <Link to="/student/attendance-request" className="sidebar-item">
//           <FaUserCheck className="icon" /> {!isCollapsed && "Request Attendance"}
//         </Link>
//         <Link to="/student/class-summary" className="sidebar-item">
//           <FaBook className="icon" /> {!isCollapsed && "Class Summary"}
//         </Link>
//         <Link to="/student/reports" className="sidebar-item">
//           <FaFileDownload className="icon" /> {!isCollapsed && "Request Reports"}
//         </Link>
//         <Link to="/logout" className="sidebar-item logout">
//           <FaSignOutAlt className="icon" /> {!isCollapsed && "Logout"}
//         </Link>
//       </nav>
//     </div>
//   );
// };

// export default StudentSidebar;

import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClipboardList,
  FaUserCheck,
  FaBook,
  FaChartPie,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import "../styles/Sidebar.css";

const StudentSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Sidebar Toggle Button */}
      <button className="toggle-btn" onClick={toggleSidebar}>
        <FaBars />
      </button>

      {/* Sidebar Navigation */}
      <nav className="sidebar-nav">
        <NavLink to="/student/timetable" className="sidebar-item">
          <FaCalendarAlt className="icon" />
          {!isCollapsed && <span>Timetable</span>}
        </NavLink>

        <NavLink to="/student/attendance" className="sidebar-item">
          <FaClipboardList className="icon" />
          {!isCollapsed && <span>Attendance Records</span>}
        </NavLink>

        <NavLink to="/student/attendance-request" className="sidebar-item">
          <FaUserCheck className="icon" />
          {!isCollapsed && <span>Request Attendance</span>}
        </NavLink>

        <NavLink to="/student/summary" className="sidebar-item">
          <FaBook className="icon" />
          {!isCollapsed && <span>Class Summary</span>}
        </NavLink>

        <NavLink to="/student/enter-code" className="sidebar-item">
  <FaClipboardList className="icon" />
  {!isCollapsed && <span>Enter Random Code</span>}
</NavLink>

      </nav>

      {/* Logout */}
      <div className="sidebar-logout">
        <NavLink to="/logout" className="sidebar-item logout">
          <FaSignOutAlt className="icon" />
          {!isCollapsed && <span>Logout</span>}
        </NavLink>
      </div>
    </div>
  );
};

export default StudentSidebar;

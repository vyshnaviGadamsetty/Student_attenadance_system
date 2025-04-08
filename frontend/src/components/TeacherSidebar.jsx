// // import React from "react";
// // import { Link } from "react-router-dom";
// // import { FaClipboardList, FaBook, FaSignOutAlt, FaBars } from "react-icons/fa";
// // import "../styles/Sidebar.css";

// // const TeacherSidebar = ({ isCollapsed, setIsCollapsed }) => {
// //   const toggleSidebar = () => {
// //     setIsCollapsed(!isCollapsed);
// //   };

// //   return (
// //     <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
// //       <button className="toggle-btn" onClick={toggleSidebar}>
// //         <FaBars />
// //       </button>
// //       <nav className="sidebar-nav">
// //         {/* Default main page is "Post Summary" */}
// //         <Link to="/teacher/post-summary" className="sidebar-item">
// //           <FaBook className="icon" /> {!isCollapsed && "Post Class Summary"}
// //         </Link>
// //         <Link to="/teacher/attendance-requests" className="sidebar-item">
// //           <FaClipboardList className="icon" /> {!isCollapsed && "View Attendance Requests"}
// //         </Link>
// //         <Link to="/logout" className="sidebar-item logout">
// //           <FaSignOutAlt className="icon" /> {!isCollapsed && "Logout"}
// //         </Link>
// //       </nav>
// //     </div>
// //   );
// // };

// // export default TeacherSidebar;

// // import React, { useState, useEffect } from "react";
// // import { Link } from "react-router-dom";
// // import { FaClipboardList, FaBook, FaSignOutAlt, FaBars } from "react-icons/fa";
// // import axios from "axios";
// // import "../styles/Sidebar.css";

// // const TeacherSidebar = ({ isCollapsed, setIsCollapsed }) => {
// //   const [pendingCount, setPendingCount] = useState(0);
  
// //   const toggleSidebar = () => {
// //     setIsCollapsed(!isCollapsed);
// //   };
  
// //   useEffect(() => {
// //     // Fetch pending requests count when component mounts
// //     const fetchPendingRequestsCount = async () => {
// //       try {
// //         const storedUser = JSON.parse(localStorage.getItem("user")) || {};
// //         const token = localStorage.getItem("token");
// //         const userId = storedUser?.id;
        
// //         if (!userId) return;
        
// //         const res = await axios.get(
// //           `http://localhost:5001/api/attendance-request/requests/teacher/${userId}`,
// //           {
// //             headers: { Authorization: `Bearer ${token}` },
// //           }
// //         );
        
// //         // Count only pending requests
// //         const pendingRequests = res.data.filter(req => req.status === "Pending");
// //         setPendingCount(pendingRequests.length);
// //       } catch (error) {
// //         console.error("Error fetching pending requests count:", error);
// //       }
// //     };
    
// //     fetchPendingRequestsCount();
    
// //     // Optional: Set up interval to refresh the count periodically
// //     const intervalId = setInterval(fetchPendingRequestsCount, 60000); // Update every minute
    
// //     return () => clearInterval(intervalId); // Clean up on unmount
// //   }, []);

// //   return (
// //     <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
// //       <button className="toggle-btn" onClick={toggleSidebar}>
// //         <FaBars />
// //       </button>
// //       <nav className="sidebar-nav">
// //         {/* Default main page is "Post Summary" */}
// //         <Link to="/teacher/post-summary" className="sidebar-item">
// //           <FaBook className="icon" /> {!isCollapsed && "Post Class Summary"}
// //         </Link>
// //         <Link to="/teacher/attendance-requests" className="sidebar-item">
// //           <div className="icon-with-badge">
// //             <FaClipboardList className="icon" />
// //             {pendingCount > 0 && isCollapsed && (
// //               <span className="badge">{pendingCount}</span>
// //             )}
// //           </div>
// //           {!isCollapsed && (
// //             <>
// //               <span>View Attendance Requests</span>
// //               {pendingCount > 0 && (
// //                 <span className="badge ms-2">{pendingCount}</span>
// //               )}
// //             </>
// //           )}
// //         </Link>
// //         <Link to="/logout" className="sidebar-item logout">
// //           <FaSignOutAlt className="icon" /> {!isCollapsed && "Logout"}
// //         </Link>
// //       </nav>
// //     </div>
// //   );
// // };

// // export default TeacherSidebar;

// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   FaClipboardList,
//   FaBookOpen,
//   FaSignOutAlt,
//   FaBars,
//   FaChalkboardTeacher,
//   FaClock,
// } from "react-icons/fa";
// import axios from "axios";
// import "../styles/Sidebar.css";

// const TeacherSidebar = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [pendingCount, setPendingCount] = useState(0);

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   useEffect(() => {
//     const fetchPendingRequestsCount = async () => {
//       try {
//         const storedUser = JSON.parse(localStorage.getItem("user")) || {};
//         const token = localStorage.getItem("token");
//         const userId = storedUser?.id;

//         if (!userId) return;

//         const res = await axios.get(
//           `http://localhost:5001/api/attendance-request/requests/teacher/${userId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         const pendingRequests = res.data.filter(
//           (req) => req.status === "Pending"
//         );
//         setPendingCount(pendingRequests.length);
//       } catch (error) {
//         console.error("Error fetching pending requests count:", error);
//       }
//     };

//     fetchPendingRequestsCount();
//     const intervalId = setInterval(fetchPendingRequestsCount, 60000);
//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
//       <button className="toggle-btn" onClick={toggleSidebar}>
//         <FaBars />
//       </button>

//       <nav className="sidebar-nav">
//         <NavLink to="/teacher/timetable" className="sidebar-item">
//           <FaClock className="icon" />
//           {!isCollapsed && <span>Timetable</span>}
//         </NavLink>

//         <NavLink to="/teacher/attendance" className="sidebar-item">
//           <FaBookOpen className="icon" />
//           {!isCollapsed && <span>Attendance</span>}
//         </NavLink>

//         <NavLink to="/teacher/remarks" className="sidebar-item">
//           <FaChalkboardTeacher className="icon" />
//           {!isCollapsed && <span>Remarks</span>}
//         </NavLink>

//         <NavLink to="/teacher/attendance-requests" className="sidebar-item">
//           <div className="icon-with-badge">
//             <FaClipboardList className="icon" />
//             {pendingCount > 0 && isCollapsed && (
//               <span className="badge">{pendingCount}</span>
//             )}
//           </div>
//           {!isCollapsed && (
//             <>
//               <span>Requests</span>
//               {pendingCount > 0 && (
//                 <span className="badge ms-2">{pendingCount}</span>
//               )}
//             </>
//           )}
//         </NavLink>
//       </nav>

//       <div className="sidebar-logout">
//         <NavLink to="/logout" className="sidebar-item logout">
//           <FaSignOutAlt className="icon" />
//           {!isCollapsed && <span>Logout</span>}
//         </NavLink>
//       </div>
//     </div>
//   );
// };

// // export default TeacherSidebar;
// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   FaClipboardList,
//   FaSignOutAlt,
//   FaBars,
//   FaChalkboardTeacher,
//   FaClock,
// } from "react-icons/fa";
// import axios from "axios";
// import "../styles/Sidebar.css";

// const TeacherSidebar = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [pendingCount, setPendingCount] = useState(0);

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   useEffect(() => {
//     const fetchPendingRequestsCount = async () => {
//       try {
//         const storedUser = JSON.parse(localStorage.getItem("user")) || {};
//         const token = localStorage.getItem("token");
//         const userId = storedUser?.id;

//         if (!userId) return;

//         const res = await axios.get(
//           `http://localhost:5001/api/attendance-request/requests/teacher/${userId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         const pendingRequests = res.data.filter(
//           (req) => req.status === "Pending"
//         );
//         setPendingCount(pendingRequests.length);
//       } catch (error) {
//         console.error("Error fetching pending requests count:", error);
//       }
//     };

//     fetchPendingRequestsCount();
//     const intervalId = setInterval(fetchPendingRequestsCount, 60000);
//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
//       <button className="toggle-btn" onClick={toggleSidebar}>
//         <FaBars />
//       </button>

//       <nav className="sidebar-nav">
//         <NavLink to="/teacher/timetable" className="sidebar-item">
//           <FaClock className="icon" />
//           {!isCollapsed && <span>Timetable</span>}
//         </NavLink>

//         {/* ❌ Removed the invalid attendance route */}

//         <NavLink to="/teacher/post-summary" className="sidebar-item">
//   <FaChalkboardTeacher className="icon" />
//   {!isCollapsed && <span>Post Summary</span>}
// </NavLink>


//         <NavLink to="/teacher/attendance-requests" className="sidebar-item">
//           <div className="icon-with-badge">
//             <FaClipboardList className="icon" />
//             {pendingCount > 0 && isCollapsed && (
//               <span className="badge">{pendingCount}</span>
//             )}
//           </div>
//           {!isCollapsed && (
//             <>
//               <span>Requests</span>
//               {pendingCount > 0 && (
//                 <span className="badge ms-2">{pendingCount}</span>
//               )}
//             </>
//           )}
//         </NavLink>
//       </nav>

//       <div className="sidebar-logout">
//         <NavLink to="/logout" className="sidebar-item logout">
//           <FaSignOutAlt className="icon" />
//           {!isCollapsed && <span>Logout</span>}
//         </NavLink>
//       </div>
//     </div>
//   );
// };

// export default TeacherSidebar;


import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FaClipboardList,
  FaSignOutAlt,
  FaBars,
  FaChalkboardTeacher,
  FaClock,
} from "react-icons/fa";
import axios from "axios";
import "../styles/Sidebar.css";

const TeacherSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const fetchPendingRequestsCount = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user")) || {};
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (role !== "teacher") {
          console.warn("Not logged in as teacher");
          return;
        }

        const teacherId = localStorage.getItem("teacherId") || storedUser?.teacherId || storedUser?.id;
        if (!teacherId || !token) {
          console.warn("No teacher ID or token found.");
          return;
        }

        const res = await axios.get(
          `http://localhost:5001/api/attendance-request/requests/teacher/${teacherId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const pendingRequests = res.data.filter(
          (req) => req.status === "Pending"
        );
        setPendingCount(pendingRequests.length);
      } catch (error) {
        if (error.response?.status === 403) {
          console.error("🚫 403 Forbidden - Token might be invalid or expired.");
        } else {
          console.error("Error fetching pending requests count:", error);
        }
      }
    };

    fetchPendingRequestsCount();
    const intervalId = setInterval(fetchPendingRequestsCount, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <FaBars />
      </button>

      <nav className="sidebar-nav">
        <NavLink to="/teacher/timetable" className="sidebar-item">
          <FaClock className="icon" />
          {!isCollapsed && <span>Timetable</span>}
        </NavLink>

        <NavLink to="/teacher/post-summary" className="sidebar-item">
          <FaChalkboardTeacher className="icon" />
          {!isCollapsed && <span>Post Summary</span>}
        </NavLink>

        <NavLink to="/teacher/attendance-requests" className="sidebar-item">
          <div className="icon-with-badge">
            <FaClipboardList className="icon" />
            {pendingCount > 0 && isCollapsed && (
              <span className="badge">{pendingCount}</span>
            )}
          </div>
          {!isCollapsed && (
            <>
              <span>Requests</span>
              {pendingCount > 0 && (
                <span className="badge ms-2">{pendingCount}</span>
              )}
            </>
          )}
        </NavLink>
      </nav>

      <div className="sidebar-logout">
        <NavLink to="/logout" className="sidebar-item logout">
          <FaSignOutAlt className="icon" />
          {!isCollapsed && <span>Logout</span>}
        </NavLink>
      </div>
    </div>
  );
};

export default TeacherSidebar;

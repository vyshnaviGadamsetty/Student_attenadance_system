// import { useState, useEffect } from "react";
// import axios from "axios";
// import { FaUserGraduate, FaChalkboardTeacher, FaTable, FaChartBar } from "react-icons/fa";

// const AdminDashboard = () => {
//   const [stats, setStats] = useState({ students: 0, teachers: 0, sections: 0, attendance: 0 });

//   useEffect(() => {
//     axios.get("http://localhost:5001/api/admin/stats")
//       .then(res => setStats(res.data))
//       .catch(err => console.error("Error fetching stats:", err));
//   }, []);

//   return (
//     <div className="dashboard-content">
//       <h2>Welcome, Admin!</h2>
//       <div className="dashboard-cards">
//         <Card icon={<FaUserGraduate />} number={stats.students} label="Total Students" />
//         <Card icon={<FaChalkboardTeacher />} number={stats.teachers} label="Total Teachers" />
     
//         <Card icon={<FaChartBar />} number={stats.attendance + "%"} label="Attendance Rate" />
//       </div>
//     </div>
//   );
// };

// const Card = ({ icon, number, label }) => (
//   <div className="card">
//     <div className="icon">{icon}</div>
//     <h3>{number}</h3>
//     <p>{label}</p>
//   </div>
// );

// export default AdminDashboard;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { 
//   FaUserGraduate, 
//   FaChalkboardTeacher, 
//   FaTable, 
//   FaChartBar, 
//   FaCalendarAlt, 
//   FaClipboardList,
//   FaBell
// } from "react-icons/fa";
// import "../../styles/AdminDashbaord.css"; // Make sure to create this CSS file

// const AdminDashboard = () => {
//   const [stats, setStats] = useState({ 
//     students: 0, 
//     teachers: 0, 
//     sections: 0, 
//     attendance: 0 
//   });
  
//   const [recentActivities, setRecentActivities] = useState([
//     { id: 1, action: "New student registered", time: "10 minutes ago" },
//     { id: 2, action: "Timetable updated for CSE-A", time: "1 hour ago" },
//     { id: 3, action: "Attendance report generated", time: "3 hours ago" },
//     { id: 4, action: "New teacher added", time: "Yesterday" }
//   ]);

//   useEffect(() => {
//     axios.get("http://localhost:5001/api/admin/stats")
//       .then(res => setStats(res.data))
//       .catch(err => console.error("Error fetching stats:", err));
//   }, []);

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-header">
//         <h1>Welcome, Admin!</h1>
//         <p className="subtitle">Here's what's happening  today</p>
//       </div>
      
//       <div className="dashboard-cards">
//         <Card 
//           icon={<FaUserGraduate />} 
//           number={stats.students} 
//           label="Total Students" 
//           color="#5c3d2e"
//         />
//         <Card 
//           icon={<FaChalkboardTeacher />} 
//           number={stats.teachers} 
//           label="Total Teachers" 
//           color="#8b5e3b"
//         />
//         <Card 
//           icon={<FaTable />} 
//           number={stats.sections} 
//           label="Total Sections" 
//           color="#6a412a"
//         />
//         <Card 
//           icon={<FaChartBar />} 
//           number={stats.attendance + "%"} 
//           label="Attendance Rate" 
//           color="#d9534f"
//         />
//       </div>
      
//       <div className="dashboard-content-grid">
//         <div className="quick-actions">
//           <h2>Quick Actions</h2>
//           <div className="action-buttons">
//             <button className="action-btn">
//               <FaUserGraduate />
//               <span>Add Student</span>
//             </button>
//             <button className="action-btn">
//               <FaChalkboardTeacher />
//               <span>Add Teacher</span>
//             </button>
//             <button className="action-btn">
//               <FaCalendarAlt />
//               <span>Create Timetable</span>
//             </button>
//             <button className="action-btn">
//               <FaClipboardList />
//               <span>Generate Report</span>
//             </button>
//           </div>
//         </div>
        
//         <div className="recent-activity">
//           <h2>Recent Activity</h2>
//           <div className="activity-list">
//             {recentActivities.map(activity => (
//               <div className="activity-item" key={activity.id}>
//                 <div className="activity-icon">
//                   <FaBell />
//                 </div>
//                 <div className="activity-details">
//                   <p className="activity-text">{activity.action}</p>
//                   <p className="activity-time">{activity.time}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
      
//       <div className="upcoming-classes">
//         <h2>Today's Schedule Overview</h2>
//         <div className="class-cards">
//           <ClassCard 
//             subject="Mathematics" 
//             section="CSE-A" 
//             time="9:00 - 11:00" 
//             color="#5c3d2e" 
//           />
//           <ClassCard 
//             subject="Physics Lab" 
//             section="CSE-A" 
//             time="11:00 - 12:00" 
//             color="#8b5e3b" 
//           />
//           <ClassCard 
//             subject="Computer Science" 
//             section="CSE-A" 
//             time="1:00 - 3:00" 
//             color="#6a412a" 
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// const Card = ({ icon, number, label, color }) => (
//   <div className="stat-card" style={{ borderTop: `4px solid ${color}` }}>
//     <div className="card-icon" style={{ color: color }}>
//       {icon}
//     </div>
//     <div className="card-info">
//       <h2>{number}</h2>
//       <p>{label}</p>
//     </div>
//   </div>
// );

// const ClassCard = ({ subject, section, time, color }) => (
//   <div className="class-card" style={{ borderLeft: `4px solid ${color}` }}>
//     <h3>{subject}</h3>
//     <p className="section">{section}</p>
//     <p className="time">{time}</p>
//   </div>
// );

// export default AdminDashboard;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  FaUserGraduate, 
  FaChalkboardTeacher, 
  FaTable, 
  FaChartBar, 
  FaCalendarAlt, 
  FaClipboardList,
  FaBell
} from "react-icons/fa";
import "../../styles/AdminDashbaord.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ 
    students: 0, 
    teachers: 0, 
    sections: 6,  // Set sections count manually to 6
    attendance: 0 
  });
  
  const [recentActivities, setRecentActivities] = useState([
    { id: 1, action: "New student registered", time: "10 minutes ago" },
    { id: 2, action: "Timetable updated for CSE-A", time: "1 hour ago" },
    { id: 3, action: "Attendance report generated", time: "3 hours ago" },
    { id: 4, action: "New teacher added", time: "Yesterday" }
  ]);

  useEffect(() => {
    axios.get("http://localhost:5001/api/admin/stats")
      .then(res => {
        // Keep the manual section count but update other stats
        setStats(prevStats => ({
          ...res.data,
          sections: 6 // Ensure sections stays at 6 even after API response
        }));
      })
      .catch(err => console.error("Error fetching stats:", err));
  }, []);

  // Navigation handlers for quick actions
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, Admin!</h1>
        <p className="subtitle">Here's what's happening today</p>
      </div>
      
      <div className="dashboard-cards">
        <Card 
          icon={<FaUserGraduate />} 
          number={stats.students} 
          label="Total Students" 
          color="#5c3d2e"
        />
        <Card 
          icon={<FaChalkboardTeacher />} 
          number={stats.teachers} 
          label="Total Teachers" 
          color="#8b5e3b"
        />
        <Card 
          icon={<FaTable />} 
          number={stats.sections} 
          label="Total Sections" 
          color="#6a412a"
        />
        <Card 
          icon={<FaChartBar />} 
          number={stats.attendance + "%"} 
          label="Attendance Rate" 
          color="#d9534f"
        />
      </div>
      
      <div className="dashboard-content-grid">
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button 
              className="action-btn" 
              onClick={() => handleNavigation("/admin/manage-students")}
            >
              <FaUserGraduate />
              <span>Manage Students</span>
            </button>
            <button 
              className="action-btn" 
              onClick={() => handleNavigation("/admin/manage-teachers")}
            >
              <FaChalkboardTeacher />
              <span>Manage Teachers</span>
            </button>
            <button 
              className="action-btn" 
              onClick={() => handleNavigation("/admin/manage-teachers-timetable")}
            >
              <FaCalendarAlt />
              <span>Teacher Timetable</span>
            </button>
            <button 
              className="action-btn" 
              onClick={() => handleNavigation("/admin/manage-section-timetable")}
            >
              <FaTable />
              <span>Section Timetable</span>
            </button>
            <button 
              className="action-btn" 
              onClick={() => handleNavigation("/admin/reports")}
            >
              <FaClipboardList />
              <span>Attendance Reports</span>
            </button>
          </div>
        </div>
        
        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {recentActivities.map(activity => (
              <div className="activity-item" key={activity.id}>
                <div className="activity-icon">
                  <FaBell />
                </div>
                <div className="activity-details">
                  <p className="activity-text">{activity.action}</p>
                  <p className="activity-time">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="upcoming-classes">
        <h2>Today's Schedule Overview</h2>
        <div className="class-cards">
          <ClassCard 
            subject="Mathematics" 
            section="CSE-A" 
            time="9:00 - 11:00" 
            color="#5c3d2e" 
          />
          <ClassCard 
            subject="Physics Lab" 
            section="CSE-A" 
            time="11:00 - 12:00" 
            color="#8b5e3b" 
          />
          <ClassCard 
            subject="Computer Science" 
            section="CSE-A" 
            time="1:00 - 3:00" 
            color="#6a412a" 
          />
        </div>
      </div>
    </div>
  );
};

const Card = ({ icon, number, label, color }) => (
  <div className="stat-card" style={{ borderTop: `4px solid ${color}` }}>
    <div className="card-icon" style={{ color: color }}>
      {icon}
    </div>
    <div className="card-info">
      <h2>{number}</h2>
      <p>{label}</p>
    </div>
  </div>
);

const ClassCard = ({ subject, section, time, color }) => (
  <div className="class-card" style={{ borderLeft: `4px solid ${color}` }}>
    <h3>{subject}</h3>
    <p className="section">{section}</p>
    <p className="time">{time}</p>
  </div>
);

export default AdminDashboard;
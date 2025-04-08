// const TeacherDashboard = () => {
//     return <h1>Welcome, Teacher!</h1>;
//   };
  
//   export default TeacherDashboard;
import React from "react";
// import TeacherSidebar from "../components/TeacherSidebar";
import DashboardLayout from "../../layouts/DashboardLayout";
// const TeacherDashboard = () => {
//   return (
//     <div className="flex">
//       <TeacherSidebar />
//       <div className="p-6 flex-1">
//         <h1 className="text-2xl font-bold mb-6">Teacher Dashboard</h1>
//         {/* Content for teacher will go here */}
//       </div>
//     </div>
//   );
// };

// export default TeacherDashboard;
const TeacherDashboard = () => {
  return (
    <DashboardLayout>
      <h2>Teacher Dashboard</h2>
      <p>Manage students, teachers, and attendance here.</p>
    </DashboardLayout>
  );
};

export default TeacherDashboard;

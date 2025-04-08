
// import { useState, useEffect } from "react";
// import axios from "axios";

// const ViewAttendance = () => {
//   const [attendanceData, setAttendanceData] = useState(null);
//   const [subjects, setSubjects] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const student = JSON.parse(localStorage.getItem("user"));

//     if (student && student.id) {
//       // Fetch attendance based on the student ID
//       axios
//         .get(`http://localhost:5001/api/attendance/students/${student.id}`)
//         .then((response) => {
//           setAttendanceData(response.data); // Set attendance data
//         })
//         .catch((error) => {
//           setError("Error fetching attendance data.");
//           console.error(error);
//         });
//     } else {
//       setError("No student found in localStorage.");
//     }

//     // Fetch subjects list
//     axios
//       .get("http://localhost:5001/api/subjects")
//       .then((response) => {
//         setSubjects(response.data); // Set subjects data
//       })
//       .catch((error) => {
//         setError("Error fetching subjects data.");
//         console.error(error);
//       });
//   }, []);

//   const getSubjectName = (subjectId) => {
//     const subject = subjects.find((sub) => sub._id === subjectId);
//     return subject ? subject.name : "Unknown Subject";
//   };

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!attendanceData || !subjects.length) {
//     return <div>Loading attendance and subject data...</div>;
//   }

//   return (
//     <div>
//       <h1>Attendance for {attendanceData.name}</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Subject</th>
//             <th>Total Classes</th>
//             <th>Attended Classes</th>
//             <th>Attendance Percentage</th>
//           </tr>
//         </thead>
//         <tbody>
//           {attendanceData.attendance.map((entry) => (
//             <tr key={entry._id}>
//               <td>{getSubjectName(entry.subject)}</td>
//               <td>{entry.totalClasses}</td>
//               <td>{entry.attendedClasses}</td>
//               <td>{entry.percentage}%</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ViewAttendance;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../../styles/ViewAttendance.css";

// const ViewAttendance = () => {
//   const [attendanceData, setAttendanceData] = useState(null);
//   const [subjects, setSubjects] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const student = JSON.parse(localStorage.getItem("user"));
        
//         if (!student || !student.id) {
//           setError("No student found in localStorage.");
//           setLoading(false);
//           return;
//         }
        
//         // Fetch subjects first
//         const subjectsResponse = await axios.get("http://localhost:5001/api/subjects");
//         setSubjects(subjectsResponse.data);
        
//         // Then fetch attendance data
//         const attendanceResponse = await axios.get(
//           `http://localhost:5001/api/attendance/students/${student.id}`
//         );
//         setAttendanceData(attendanceResponse.data);
//       } catch (error) {
//         setError("Error fetching data. Please try again later.");
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const getSubjectName = (subjectId) => {
//     const subject = subjects.find((sub) => sub._id === subjectId);
//     return subject ? subject.name : "Unknown Subject";
//   };

//   const getAttendanceStatus = (percentage) => {
//     if (percentage >= 85) return { status: "Excellent", color: "#4CAF50", bsClass: "success" };
//     if (percentage >= 75) return { status: "Good", color: "#8bc34a", bsClass: "success" };
//     if (percentage >= 65) return { status: "Average", color: "#FFC107", bsClass: "warning" };
//     return { status: "Poor", color: "#F44336", bsClass: "danger" };
//   };

//   if (loading) {
//     return (
//       <div className="container d-flex justify-content-center align-items-center loading-container">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//         <p className="ms-3">Loading attendance data...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container error-container">
//         <div className="alert alert-danger">
//           <i className="bi bi-exclamation-triangle-fill me-2"></i>
//           {error}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="attendance-container container py-4">
//       <div className="attendance-header mb-4">
//         <h1 className="display-5">Attendance Summary</h1>
//         <p className="subtitle">View your class attendance records</p>
//       </div>

//       {attendanceData && (
//         <>
//           <div className="card mb-4">
//             <div className="card-body attendance-overview">
//               <div className="row">
//                 <div className="col-md-6 student-info">
//                   <h2>{attendanceData.name}</h2>
//                   <p className="text-muted">Student ID: {attendanceData.studentId || "N/A"}</p>
//                 </div>
//                 <div className="col-md-6">
//                   <div className="attendance-summary-card p-3">
//                     <div className="d-flex align-items-center">
//                       <i className="bi bi-pie-chart-fill summary-icon me-3 fs-3"></i>
//                       <div>
//                         <h3 className="fs-5">Overall Attendance</h3>
//                         <p className="mb-0">
//                           {attendanceData.attendance.reduce(
//                             (sum, entry) => sum + entry.attendedClasses,
//                             0
//                           )}{" "}
//                           / {attendanceData.attendance.reduce(
//                             (sum, entry) => sum + entry.totalClasses,
//                             0
//                           )}{" "}
//                           Classes Attended
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="card mb-4">
//             <div className="card-body">
//               <h2 className="card-title mb-4">Subject-wise Attendance</h2>
//               <div className="table-responsive">
//                 <table className="table table-hover">
//                   <thead>
//                     <tr>
//                       <th scope="col">Subject</th>
//                       <th scope="col">Total Classes</th>
//                       <th scope="col">Attended</th>
//                       <th scope="col">Percentage</th>
//                       <th scope="col">Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {attendanceData.attendance.map((entry) => {
//                       const { status, bsClass } = getAttendanceStatus(entry.percentage);
//                       return (
//                         <tr key={entry._id}>
//                           <td className="subject-name">
//                             <i className="bi bi-book me-2"></i>
//                             <span>{getSubjectName(entry.subject)}</span>
//                           </td>
//                           <td>{entry.totalClasses}</td>
//                           <td>{entry.attendedClasses}</td>
//                           <td>
//                             <div className="progress">
//                               <div
//                                 className={`progress-bar bg-${bsClass}`}
//                                 role="progressbar"
//                                 style={{ width: `${entry.percentage}%` }}
//                                 aria-valuenow={entry.percentage}
//                                 aria-valuemin="0"
//                                 aria-valuemax="100"
//                               >
//                                 {entry.percentage}%
//                               </div>
//                             </div>
//                           </td>
//                           <td>
//                             <span className={`badge bg-${bsClass}`}>{status}</span>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>

//           <h2 className="mb-3">Quick Insights</h2>
//           <div className="row mb-4">
//             {attendanceData.attendance.map((entry) => {
//               const { status, bsClass } = getAttendanceStatus(entry.percentage);
//               return (
//                 <div className="col-md-6 col-lg-4 mb-3" key={entry._id}>
//                   <div className="card attendance-card h-100">
//                     <div className="card-body">
//                       <h3 className="card-title">{getSubjectName(entry.subject)}</h3>
//                       <h4 className={`display-6 fw-bold text-${bsClass}`}>
//                         {entry.percentage}%
//                       </h4>
//                       <p className="card-text">
//                         {entry.attendedClasses} of {entry.totalClasses} classes
//                       </p>
//                       <div className={`mt-3 text-${bsClass} d-flex align-items-center`}>
//                         <i className={`bi bi-${bsClass === 'danger' ? 'exclamation-circle-fill' : 'check-circle-fill'} me-2`}></i>
//                         <span>{status}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ViewAttendance;



// import { useState, useEffect } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../../styles/ViewAttendance.css";

// const ViewAttendance = () => {
//   const [attendanceData, setAttendanceData] = useState(null);
//   const [subjects, setSubjects] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const student = JSON.parse(localStorage.getItem("user"));
        
//         if (!student || !student.id) {
//           setError("No student found in localStorage.");
//           setLoading(false);
//           return;
//         }
        
//         // Fetch subjects first
//         const token = localStorage.getItem("token");
//         const subjectsResponse = await axios.get("http://localhost:5001/api/subjects", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
        
//         setSubjects(subjectsResponse.data);
        
//         // Then fetch attendance data
//         const attendanceResponse = await axios.get(
//           `http://localhost:5001/api/attendance/students/${student.id}`
//         );
//         setAttendanceData(attendanceResponse.data);
//       } catch (error) {
//         setError("Error fetching data. Please try again later.");
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);
//   const getSubjectName = (subjectRef) => {
//     if (typeof subjectRef === "object" && subjectRef?.name) {
//       return subjectRef.name;
//     }
  
//     const subject = subjects.find((sub) => sub._id === subjectRef);
//     return subject ? subject.name : "Unknown Subject";
//   };
  

//   const getAttendanceStatus = (percentage) => {
//     if (percentage >= 85) return { status: "Excellent", color: "#4CAF50", bsClass: "success" };
//     if (percentage >= 75) return { status: "Good", color: "#8bc34a", bsClass: "success" };
//     if (percentage >= 65) return { status: "Average", color: "#FFC107", bsClass: "warning" };
//     return { status: "Poor", color: "#F44336", bsClass: "danger" };
//   };

//   if (loading) {
//     return (
//       <div className="container d-flex justify-content-center align-items-center loading-container">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//         <p className="ms-3">Loading attendance data...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container error-container">
//         <div className="alert alert-danger">
//           <i className="bi bi-exclamation-triangle-fill me-2"></i>
//           {error}
//         </div>
//       </div>
//     );
//   }

//   // Filter subjects with attendance below 75%
//   const lowAttendanceSubjects = attendanceData?.attendance.filter(entry => entry.percentage < 75) || [];
  
//   return (
//     <div className="attendance-container container py-4">
//       <div className="attendance-header mb-4">
//         <h1 className="display-5">Attendance Summary</h1>
//         <p className="subtitle">View your class attendance records</p>
//       </div>

//       {attendanceData && (
//         <>
//           <div className="card mb-4">
//             <div className="card-body attendance-overview">
//               <div className="row">
//                 <div className="col-md-6 student-info">
//                   <h2>{attendanceData.name}</h2>
//                   <p className="text-muted">Student ID: {attendanceData.studentId || "N/A"}</p>
//                 </div>
//                 <div className="col-md-6">
//                   <div className="attendance-summary-card p-3">
//                     <div className="d-flex align-items-center">
//                       <i className="bi bi-pie-chart-fill summary-icon me-3 fs-3"></i>
//                       <div>
//                         <h3 className="fs-5">Overall Attendance</h3>
//                         <p className="mb-0">
//                           {attendanceData.attendance.reduce(
//                             (sum, entry) => sum + entry.attendedClasses,
//                             0
//                           )}{" "}
//                           / {attendanceData.attendance.reduce(
//                             (sum, entry) => sum + entry.totalClasses,
//                             0
//                           )}{" "}
//                           Classes Attended
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="card mb-4">
//             <div className="card-body">
//               <h2 className="card-title mb-4">Subject-wise Attendance</h2>
//               <div className="table-responsive">
//                 <table className="table table-hover">
//                   <thead>
//                     <tr>
//                       <th scope="col">Subject</th>
//                       <th scope="col">Total Classes</th>
//                       <th scope="col">Attended</th>
//                       <th scope="col">Percentage</th>
//                       <th scope="col">Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {attendanceData.attendance.map((entry) => {
//                       const { status, bsClass } = getAttendanceStatus(entry.percentage);
//                       return (
//                         <tr key={entry._id}>
//                           <td className="subject-name">
//                             <i className="bi bi-book me-2"></i>
//                             <span>{getSubjectName(entry.subject)}</span>
//                           </td>
//                           <td>{entry.totalClasses}</td>
//                           <td>{entry.attendedClasses}</td>
//                           <td>
//                             <div className="progress">
//                               <div
//                                 className={`progress-bar bg-${bsClass}`}
//                                 role="progressbar"
//                                 style={{ width: `${entry.percentage}%` }}
//                                 aria-valuenow={entry.percentage}
//                                 aria-valuemin="0"
//                                 aria-valuemax="100"
//                               >
//                                 {entry.percentage}%
//                               </div>
//                             </div>
//                           </td>
//                           <td>
//                             <span className={`badge bg-${bsClass}`}>{status}</span>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>

//           {lowAttendanceSubjects.length > 0 && (
//             <>
//               <h2 className="mb-3">Attendance Alerts</h2>
//               <div className="row mb-4">
//                 {lowAttendanceSubjects.map((entry) => {
//                   const { status, bsClass } = getAttendanceStatus(entry.percentage);
//                   return (
//                     <div className="col-md-6 col-lg-4 mb-3" key={entry._id}>
//                       <div className="card border-danger attendance-card h-100">
//                         <div className="card-header bg-danger text-white">
//                           <i className="bi bi-exclamation-triangle-fill me-2"></i>
//                           Attendance Alert
//                         </div>
//                         <div className="card-body">
//                           <h3 className="card-title">{getSubjectName(entry.subject)}</h3>
//                           <h4 className="display-6 fw-bold text-danger">
//                             {entry.percentage}%
//                           </h4>
//                           <p className="card-text">
//                             {entry.attendedClasses} of {entry.totalClasses} classes
//                           </p>
//                           <div className="alert alert-danger mt-3 p-2 d-flex align-items-center mb-0">
//                             <i className="bi bi-info-circle-fill me-2"></i>
//                             <small>Attendance below required minimum. Immediate action needed.</small>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default ViewAttendance;

import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/ViewAttendance.css";

const ViewAttendance = () => {
  const [attendanceData, setAttendanceData] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const student = JSON.parse(localStorage.getItem("user"));
        
        if (!student || !student.id) {
          setError("No student found in localStorage.");
          setLoading(false);
          return;
        }
        
        // Fetch subjects first
        const token = localStorage.getItem("token");
        const subjectsResponse = await axios.get("http://localhost:5001/api/subjects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setSubjects(subjectsResponse.data);
        
        // Then fetch attendance data
        const attendanceResponse = await axios.get(
          `http://localhost:5001/api/attendance/students/${student.id}`
        );
        setAttendanceData(attendanceResponse.data);
      } catch (error) {
        setError("Error fetching data. Please try again later.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  const getSubjectName = (subjectRef) => {
    if (typeof subjectRef === "object" && subjectRef?.name) {
      return subjectRef.name;
    }
  
    const subject = subjects.find((sub) => sub._id === subjectRef);
    return subject ? subject.name : "Unknown Subject";
  };
  
  const getAttendanceStatus = (percentage) => {
    if (percentage >= 85) return { status: "Excellent", color: "#4CAF50", bsClass: "success" };
    if (percentage >= 75) return { status: "Good", color: "#8bc34a", bsClass: "success" };
    if (percentage >= 65) return { status: "Average", color: "#FFC107", bsClass: "warning" };
    return { status: "Poor", color: "#F44336", bsClass: "danger" };
  };

  if (loading) {
    return (
      <div className="container d-flex justify-content-center align-items-center loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="ms-3">Loading attendance data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container error-container">
        <div className="alert alert-danger">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      </div>
    );
  }

  // Filter subjects with attendance below 75%
  const lowAttendanceSubjects = attendanceData?.attendance.filter(entry => entry.percentage < 75) || [];
  
  return (
    <div className="attendance-container container py-4">
      <div className="attendance-header mb-4">
        <h1 className="display-5">Attendance Summary</h1>
        <p className="subtitle">View your class attendance records</p>
      </div>

      {attendanceData && (
        <>
          <div className="card mb-4">
            <div className="card-body attendance-overview">
              <div className="row">
                <div className="col-md-6 student-info">
                  <h2>{attendanceData.name}</h2>
                  <p className="text-muted">Student ID: {attendanceData.studentId || "N/A"}</p>
                </div>
                <div className="col-md-6">
                  <div className="attendance-summary-card p-3">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-pie-chart-fill summary-icon me-3 fs-3"></i>
                      <div>
                        <h3 className="fs-5">Overall Attendance</h3>
                        <p className="mb-0">
                          {attendanceData.attendance.reduce(
                            (sum, entry) => sum + entry.attendedClasses,
                            0
                          )}{" "}
                          / {attendanceData.attendance.reduce(
                            (sum, entry) => sum + entry.totalClasses,
                            0
                          )}{" "}
                          Classes Attended
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title mb-4">Subject-wise Attendance</h2>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Subject</th>
                      <th scope="col">Total Classes</th>
                      <th scope="col">Attended</th>
                      <th scope="col">Percentage</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.attendance.map((entry) => {
                      const { status, bsClass } = getAttendanceStatus(entry.percentage);
                      return (
                        <tr key={entry._id}>
                          <td className="subject-name">
                            <i className="bi bi-book me-2"></i>
                            <span>{getSubjectName(entry.subject)}</span>
                          </td>
                          <td>{entry.totalClasses}</td>
                          <td>{entry.attendedClasses}</td>
                          <td>
                            <div className="progress">
                              <div
                                className={`progress-bar bg-${bsClass}`}
                                role="progressbar"
                                style={{ width: `${entry.percentage}%` }}
                                aria-valuenow={entry.percentage}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                {entry.percentage}%
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className={`badge bg-${bsClass}`}>{status}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {lowAttendanceSubjects.length > 0 && (
            <div className="card mb-4 border-danger">
              <div className="card-header bg-danger text-white">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                Attendance Alerts
              </div>
              <div className="card-body p-0">
                <ul className="list-group list-group-flush">
                  {lowAttendanceSubjects.map((entry) => (
                    <li key={entry._id} className="list-group-item d-flex align-items-center">
                      <div className="flex-grow-1">
                        <span className="fw-bold">{getSubjectName(entry.subject)}</span>
                        <small className="d-block text-muted">
                          {entry.attendedClasses} of {entry.totalClasses} classes attended
                        </small>
                      </div>
                      <span className="badge bg-danger rounded-pill fs-6">{entry.percentage}%</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-footer bg-light">
                <small className="text-danger">
                  <i className="bi bi-info-circle-fill me-1"></i>
                  These subjects have attendance below required minimum (75%)
                </small>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ViewAttendance;


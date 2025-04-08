// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // const TeacherDashboard = () => {
// //   const storedUser = JSON.parse(localStorage.getItem("user")) || {};
// //   const token = localStorage.getItem("token");
// //   const teacherId = storedUser?.id;  // FIXED: Using 'id' instead of 'teacherId'

// //   const [requests, setRequests] = useState([]);
// //   const [message, setMessage] = useState("");

// //   useEffect(() => {
// //     console.log("Stored User:", storedUser); // Debugging
// //     console.log("Teacher ID:", teacherId); // Debugging

// //     if (!teacherId) {
// //       setMessage("Teacher ID is missing.");
// //       return;
// //     }

// //     const fetchRequests = async () => {
// //       try {
// //         const res = await axios.get(
// //           `http://localhost:5001/api/attendance-request/requests/teacher/${teacherId}`,
// //           {
// //             headers: { Authorization: `Bearer ${token}` },
// //           }
// //         );
// //         setRequests(res.data);
// //       } catch (error) {
// //         console.error("Error fetching requests:", error.response?.data || error.message);
// //         setMessage("Error fetching attendance requests");
// //       }
// //     };

// //     fetchRequests();
// //   }, [teacherId, token]); // Dependency array

// //   const handleStatusChange = async (id, status) => {
// //     try {
// //       const res = await axios.put(
// //         `http://localhost:5001/api/attendance-request/requests/${id}`,
// //         { status },
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       );
// //       setRequests((prev) =>
// //         prev.map((req) => (req._id === id ? { ...req, status: res.data.request.status } : req))
// //       );
// //     } catch (error) {
// //       console.error("Error updating request:", error.response?.data || error.message);
// //       setMessage("Error updating request");
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Teacher Dashboard</h2>
// //       {message && <p>{message}</p>}
// //       <ul>
// //         {requests.map((req) => (
// //           <li key={req._id}>
// //             <p>Student ID: {req.studentId}</p>
// //             <p>Subject: {req.subject}</p>
// //             <p>Date: {req.date}</p>
// //             <p>Reason: {req.reason}</p>
// //             <p>Status: {req.status}</p>
// //             {req.status === "Pending" && (
// //               <>
// //                 <button onClick={() => handleStatusChange(req._id, "Accepted")}>Accept</button>
// //                 <button onClick={() => handleStatusChange(req._id, "Rejected")}>Reject</button>
// //               </>
// //             )}
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default TeacherDashboard;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaCheck, FaTimes, FaClipboardList, FaUserGraduate, FaCalendarAlt, FaInfoCircle } from "react-icons/fa";

// import "bootstrap/dist/css/bootstrap.min.css";

// const ViewRequest= () => {
//   const storedUser = JSON.parse(localStorage.getItem("user")) || {};
//   const token = localStorage.getItem("token");
//   const teacherId = storedUser?.id;

//   const [requests, setRequests] = useState([]);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!teacherId) {
//       setMessage("Teacher ID is missing. Please log in again.");
//       setLoading(false);
//       return;
//     }

//     const fetchRequests = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(
//           `http://localhost:5001/api/attendance-request/requests/teacher/${teacherId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setRequests(res.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching requests:", error.response?.data || error.message);
//         setMessage("Error fetching attendance requests. Please try again later.");
//         setLoading(false);
//       }
//     };

//     fetchRequests();
//   }, [teacherId, token]);

//   const handleStatusChange = async (id, status) => {
//     try {
//       await axios.put(
//         `http://localhost:5001/api/attendance-request/requests/${id}`,
//         { status },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
      
//       // Remove the request from the list instead of just updating status
//       setRequests((prev) => prev.filter((req) => req._id !== id));
      
//       // Show success message
//       setMessage(`Request ${status.toLowerCase()} successfully`);
      
//       // Clear message after 3 seconds
//       setTimeout(() => {
//         setMessage("");
//       }, 3000);
//     } catch (error) {
//       console.error("Error updating request:", error.response?.data || error.message);
//       setMessage(`Error ${status.toLowerCase()} request. Please try again.`);
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-header">
//         <h1>Teacher Dashboard</h1>
//         <p className="subtitle">Manage student attendance requests</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="dashboard-cards">
//         <div className="stat-card">
//           <div className="card-icon">
//             <FaClipboardList style={{ color: '#8b5e3b' }} />
//           </div>
//           <div className="card-info">
//             <h2>{requests.length}</h2>
//             <p>Pending Requests</p>
//           </div>
//         </div>
//       </div>

//       {/* Status Message */}
//       {message && (
//         <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'} mb-4`}>
//           {message}
//         </div>
//       )}

//       {/* Loading State */}
//       {loading ? (
//         <div className="d-flex justify-content-center">
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       ) : requests.length === 0 ? (
//         <div className="recent-activity">
//           <h2>Attendance Requests</h2>
//           <div className="alert alert-info">
//             No pending attendance requests found.
//           </div>
//         </div>
//       ) : (
//         <div className="recent-activity">
//           <h2>Attendance Requests</h2>
//           <div className="activity-list">
//             {requests.map((req) => (
//               <div key={req._id} className="activity-item">
//                 <div className="activity-icon">
//                   <FaUserGraduate />
//                 </div>
//                 <div className="activity-details">
//                   <div className="row">
//                     <div className="col-md-6">
//                       <p className="activity-text"><strong>Student ID:</strong> {req.studentId}</p>
//                       <p className="activity-text"><strong>Subject:</strong> {req.subject}</p>
//                     </div>
//                     <div className="col-md-6">
//                       <p className="activity-text">
//                         <FaCalendarAlt className="me-1" />
//                         <strong>Date:</strong> {new Date(req.date).toLocaleDateString()}
//                       </p>
//                       <p className="activity-text">
//                         <FaInfoCircle className="me-1" />
//                         <strong>Status:</strong> <span className={`badge ${req.status === "Pending" ? "bg-warning" : req.status === "Accepted" ? "bg-success" : "bg-danger"}`}>{req.status}</span>
//                       </p>
//                     </div>
//                   </div>
//                   <p className="activity-text mt-2"><strong>Reason:</strong> {req.reason}</p>
                  
//                   {req.status === "Pending" && (
//                     <div className="mt-3">
//                       <button 
//                         className="btn action-btn me-2" 
//                         onClick={() => handleStatusChange(req._id, "Accepted")}
//                       >
//                         <FaCheck /> Accept
//                       </button>
//                       <button 
//                         className="btn action-btn" 
//                         onClick={() => handleStatusChange(req._id, "Rejected")}
//                       >
//                         <FaTimes /> Reject
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewRequest;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaCheck, FaTimes, FaClipboardList, FaUserGraduate, FaCalendarAlt, FaInfoCircle } from "react-icons/fa";

// import "bootstrap/dist/css/bootstrap.min.css";

// const ViewRequest = () => {
//   const storedUser = JSON.parse(localStorage.getItem("user")) || {};
//   const token = localStorage.getItem("token");
//   const userId = storedUser?.id;
//   const userRole = storedUser?.role || "teacher"; // Default to teacher if not specified

//   const [requests, setRequests] = useState([]);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [requestHistory, setRequestHistory] = useState([]);

//   useEffect(() => {
//     if (!userId) {
//       setMessage("User ID is missing. Please log in again.");
//       setLoading(false);
//       return;
//     }

//     const fetchRequests = async () => {
//       try {
//         setLoading(true);
        
//         if (userRole === "teacher") {
//           // Teachers see pending requests
//           const res = await axios.get(
//             `http://localhost:5001/api/attendance-request/requests/teacher/${userId}`,
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           );
//           setRequests(res.data);
//         } else if (userRole === "student") {
//           // Students see their pending requests
//           const pendingRes = await axios.get(
//             `http://localhost:5001/api/attendance-request/requests/student/${userId}/pending`,
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           );
//           setRequests(pendingRes.data);
          
//           // Students also see their request history (accepted/rejected)
//           const historyRes = await axios.get(
//             `http://localhost:5001/api/attendance-request/requests/student/${userId}/history`,
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           );
//           setRequestHistory(historyRes.data);
//         }
        
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching requests:", error.response?.data || error.message);
//         setMessage("Error fetching attendance requests. Please try again later.");
//         setLoading(false);
//       }
//     };

//     fetchRequests();
//   }, [userId, token, userRole]);

//   const handleStatusChange = async (id, status) => {
//     try {
//       await axios.put(
//         `http://localhost:5001/api/attendance-request/requests/${id}`,
//         { status },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
      
//       // Remove the request from the list instead of just updating status
//       setRequests((prev) => prev.filter((req) => req._id !== id));
      
//       // Show success message
//       setMessage(`Request ${status.toLowerCase()} successfully`);
      
//       // Clear message after 3 seconds
//       setTimeout(() => {
//         setMessage("");
//       }, 3000);
//     } catch (error) {
//       console.error("Error updating request:", error.response?.data || error.message);
//       setMessage(`Error ${status.toLowerCase()} request. Please try again.`);
//     }
//   };

//   const renderTeacherDashboard = () => (
//     <>
//       <div className="dashboard-header">
//         <h1>Teacher Dashboard</h1>
//         <p className="subtitle">Manage student attendance requests</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="dashboard-cards">
//         <div className="stat-card">
//           <div className="card-icon">
//             <FaClipboardList style={{ color: '#8b5e3b' }} />
//           </div>
//           <div className="card-info">
//             <h2>{requests.length}</h2>
//             <p>Pending Requests</p>
//           </div>
//         </div>
//       </div>

//       {/* Pending Requests Section */}
//       {requests.length === 0 ? (
//         <div className="recent-activity">
//           <h2>Attendance Requests</h2>
//           <div className="alert alert-info">
//             No pending attendance requests found.
//           </div>
//         </div>
//       ) : (
//         <div className="recent-activity">
//           <h2>Attendance Requests</h2>
//           <div className="activity-list">
//             {requests.map((req) => (
//               <div key={req._id} className="activity-item">
//                 <div className="activity-icon">
//                   <FaUserGraduate />
//                 </div>
//                 <div className="activity-details">
//                   <div className="row">
//                     <div className="col-md-6">
//                       <p className="activity-text"><strong>Student ID:</strong> {req.studentId}</p>
//                       <p className="activity-text"><strong>Subject:</strong> {req.subject}</p>
//                     </div>
//                     <div className="col-md-6">
//                       <p className="activity-text">
//                         <FaCalendarAlt className="me-1" />
//                         <strong>Date:</strong> {new Date(req.date).toLocaleDateString()}
//                       </p>
//                       <p className="activity-text">
//                         <FaInfoCircle className="me-1" />
//                         <strong>Status:</strong> <span className={`badge ${req.status === "Pending" ? "bg-warning" : req.status === "Accepted" ? "bg-success" : "bg-danger"}`}>{req.status}</span>
//                       </p>
//                     </div>
//                   </div>
//                   <p className="activity-text mt-2"><strong>Reason:</strong> {req.reason}</p>
                  
//                   {req.status === "Pending" && (
//                     <div className="mt-3">
//                       <button 
//                         className="btn action-btn me-2" 
//                         onClick={() => handleStatusChange(req._id, "Accepted")}
//                       >
//                         <FaCheck /> Accept
//                       </button>
//                       <button 
//                         className="btn action-btn" 
//                         onClick={() => handleStatusChange(req._id, "Rejected")}
//                       >
//                         <FaTimes /> Reject
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </>
//   );

//   const renderStudentDashboard = () => (
//     <>
//       <div className="dashboard-header">
//         <h1>Student Dashboard</h1>
//         <p className="subtitle">Your attendance requests</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="dashboard-cards">
//         <div className="stat-card">
//           <div className="card-icon">
//             <FaClipboardList style={{ color: '#8b5e3b' }} />
//           </div>
//           <div className="card-info">
//             <h2>{requests.length}</h2>
//             <p>Pending Requests</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="card-icon">
//             <FaCheck style={{ color: '#28a745' }} />
//           </div>
//           <div className="card-info">
//             <h2>{requestHistory.filter(req => req.status === "Accepted").length}</h2>
//             <p>Accepted Requests</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="card-icon">
//             <FaTimes style={{ color: '#dc3545' }} />
//           </div>
//           <div className="card-info">
//             <h2>{requestHistory.filter(req => req.status === "Rejected").length}</h2>
//             <p>Rejected Requests</p>
//           </div>
//         </div>
//       </div>

//       {/* Pending Requests Section */}
//       <div className="recent-activity mb-5">
//         <h2>Pending Requests</h2>
//         {requests.length === 0 ? (
//           <div className="alert alert-info">
//             No pending attendance requests found.
//           </div>
//         ) : (
//           <div className="activity-list">
//             {requests.map((req) => (
//               <div key={req._id} className="activity-item">
//                 <div className="activity-icon">
//                   <FaClipboardList />
//                 </div>
//                 <div className="activity-details">
//                   <div className="row">
//                     <div className="col-md-6">
//                       <p className="activity-text"><strong>Teacher ID:</strong> {req.teacherId}</p>
//                       <p className="activity-text"><strong>Subject:</strong> {req.subject}</p>
//                     </div>
//                     <div className="col-md-6">
//                       <p className="activity-text">
//                         <FaCalendarAlt className="me-1" />
//                         <strong>Date:</strong> {new Date(req.date).toLocaleDateString()}
//                       </p>
//                       <p className="activity-text">
//                         <FaInfoCircle className="me-1" />
//                         <strong>Status:</strong> <span className="badge bg-warning">Pending</span>
//                       </p>
//                     </div>
//                   </div>
//                   <p className="activity-text mt-2"><strong>Reason:</strong> {req.reason}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Request History Section */}
//       <div className="recent-activity">
//         <h2>Request History</h2>
//         {requestHistory.length === 0 ? (
//           <div className="alert alert-info">
//             No request history found.
//           </div>
//         ) : (
//           <div className="activity-list">
//             {requestHistory.map((req) => (
//               <div key={req._id} className="activity-item">
//                 <div className="activity-icon" style={{ backgroundColor: req.status === "Accepted" ? "#28a74520" : "#dc354520" }}>
//                   {req.status === "Accepted" ? <FaCheck style={{ color: '#28a745' }} /> : <FaTimes style={{ color: '#dc3545' }} />}
//                 </div>
//                 <div className="activity-details">
//                   <div className="row">
//                     <div className="col-md-6">
//                       <p className="activity-text"><strong>Teacher ID:</strong> {req.teacherId}</p>
//                       <p className="activity-text"><strong>Subject:</strong> {req.subject}</p>
//                     </div>
//                     <div className="col-md-6">
//                       <p className="activity-text">
//                         <FaCalendarAlt className="me-1" />
//                         <strong>Date:</strong> {new Date(req.date).toLocaleDateString()}
//                       </p>
//                       <p className="activity-text">
//                         <FaInfoCircle className="me-1" />
//                         <strong>Status:</strong> <span className={`badge ${req.status === "Accepted" ? "bg-success" : "bg-danger"}`}>{req.status}</span>
//                       </p>
//                     </div>
//                   </div>
//                   <p className="activity-text mt-2"><strong>Reason:</strong> {req.reason}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );

//   return (
//     <div className="dashboard-container">
//       {/* Status Message */}
//       {message && (
//         <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'} mb-4`}>
//           {message}
//         </div>
//       )}

//       {/* Loading State */}
//       {loading ? (
//         <div className="d-flex justify-content-center">
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       ) : (
//         userRole === "teacher" ? renderTeacherDashboard() : renderStudentDashboard()
//       )}
//     </div>
//   );
// };

// export default ViewRequest;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { 
//   Alert, 
//   Spinner, 
//   Card, 
//   Badge, 
//   Button,
//   Modal
// } from "react-bootstrap";
// import { FaCheck, FaTimes, FaClipboardList, FaUserGraduate, FaCalendarAlt, FaInfoCircle } from "react-icons/fa";

// import "bootstrap/dist/css/bootstrap.min.css";

// const ViewRequest = () => {
//   const storedUser = JSON.parse(localStorage.getItem("user")) || {};
//   const token = localStorage.getItem("token");
//   const userId = storedUser?.id;
//   const userRole = storedUser?.role || "teacher"; // Default to teacher if not specified

//   const [requests, setRequests] = useState([]);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [requestHistory, setRequestHistory] = useState([]);
  
//   // For modals and action confirmation
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [currentAction, setCurrentAction] = useState({ id: "", status: "" });
//   const [responseMessage, setResponseMessage] = useState("");
//   const [showResponseModal, setShowResponseModal] = useState(false);

//   const fetchRequests = async () => {
//     if (!userId) {
//       setMessage("User ID is missing. Please log in again.");
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
      
//       if (userRole === "teacher") {
//         // Teachers see pending requests
//         const res = await axios.get(
//           `http://localhost:5001/api/attendance-request/requests/teacher/${userId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setRequests(res.data);
//       } else if (userRole === "student") {
//         // Students see their pending requests
//         const pendingRes = await axios.get(
//           `http://localhost:5001/api/attendance-request/requests/student/${userId}/pending`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setRequests(pendingRes.data);
        
//         // Students also see their request history (accepted/rejected)
//         const historyRes = await axios.get(
//           `http://localhost:5001/api/attendance-request/requests/student/${userId}/history`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setRequestHistory(historyRes.data);
//       }
      
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching requests:", error.response?.data || error.message);
//       setMessage("Error fetching attendance requests. Please try again later.");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, [userId, token, userRole]);

//   const openConfirmModal = (id, status) => {
//     setCurrentAction({ id, status });
//     setShowConfirmModal(true);
//   };

//   const handleStatusChange = async () => {
//     setShowConfirmModal(false);
//     setLoading(true);
    
//     try {
//       const { id, status } = currentAction;
//       await axios.put(
//         `http://localhost:5001/api/attendance-request/requests/${id}`,
//         { status },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
      
//       // Update the UI by removing the request
//       setRequests((prev) => prev.filter((req) => req._id !== id));
      
//       // Show success message in modal
//       setResponseMessage(`You have ${status.toLowerCase()} the request. The student will be notified, and this request will be automatically deleted after 48 hours.`);
//       setShowResponseModal(true);
      
//     } catch (error) {
//       console.error("Error updating request:", error.response?.data || error.message);
//       setMessage(`Error ${currentAction.status.toLowerCase()} request. Please try again.`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderTeacherDashboard = () => (
//     <>
//       <div className="dashboard-header">
//         <h1>Teacher Dashboard</h1>
//         <p className="subtitle">Manage student attendance requests</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="dashboard-cards">
//         <div className="stat-card">
//           <div className="card-icon">
//             <FaClipboardList style={{ color: '#8b5e3b' }} />
//           </div>
//           <div className="card-info">
//             <h2>{requests.length}</h2>
//             <p>Pending Requests</p>
//           </div>
//         </div>
//       </div>

//       {/* Pending Requests Section */}
//       {requests.length === 0 ? (
//         <div className="recent-activity">
//           <h2>Attendance Requests</h2>
//           <div className="alert alert-info">
//             No pending attendance requests found.
//           </div>
//         </div>
//       ) : (
//         <div className="recent-activity">
//           <h2>Attendance Requests</h2>
//           <div className="activity-list">
//             {requests.map((req) => (
//               <div key={req._id} className="activity-item">
//                 <div className="activity-icon">
//                   <FaUserGraduate />
//                 </div>
//                 <div className="activity-details">
//                   <div className="row">
//                     <div className="col-md-6">
//                       <p className="activity-text"><strong>Student ID:</strong> {req.studentId}</p>
//                       <p className="activity-text"><strong>Subject:</strong> {req.subject}</p>
//                     </div>
//                     <div className="col-md-6">
//                       <p className="activity-text">
//                         <FaCalendarAlt className="me-1" />
//                         <strong>Date:</strong> {new Date(req.date).toLocaleDateString()}
//                       </p>
//                       <p className="activity-text">
//                         <FaInfoCircle className="me-1" />
//                         <strong>Status:</strong> <span className={`badge ${req.status === "Pending" ? "bg-warning" : req.status === "Accepted" ? "bg-success" : "bg-danger"}`}>{req.status}</span>
//                       </p>
//                     </div>
//                   </div>
//                   <p className="activity-text mt-2"><strong>Reason:</strong> {req.reason}</p>
                  
//                   {req.status === "Pending" && (
//                     <div className="mt-3">
//                       <button 
//                         className="btn action-btn me-2" 
//                         onClick={() => openConfirmModal(req._id, "Accepted")}
//                       >
//                         <FaCheck /> Accept
//                       </button>
//                       <button 
//                         className="btn action-btn" 
//                         onClick={() => openConfirmModal(req._id, "Rejected")}
//                       >
//                         <FaTimes /> Reject
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
      
//       {/* Confirmation Modal */}
//       <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Action</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           Are you sure you want to {currentAction.status.toLowerCase()} this attendance request?
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
//             Cancel
//           </Button>
//           <Button 
//             variant={currentAction.status === "Accepted" ? "success" : "danger"} 
//             onClick={handleStatusChange}
//           >
//             {currentAction.status === "Accepted" ? "Accept" : "Reject"}
//           </Button>
//         </Modal.Footer>
//       </Modal>
      
//       {/* Response Modal */}
//       <Modal show={showResponseModal} onHide={() => setShowResponseModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Action Completed</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>{responseMessage}</Modal.Body>
//         <Modal.Footer>
//           <Button variant="primary" onClick={() => setShowResponseModal(false)}>
//             Okay
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );

//   const renderStudentDashboard = () => (
//     <>
//       <div className="dashboard-header">
//         <h1>Student Dashboard</h1>
//         <p className="subtitle">Your attendance requests</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="dashboard-cards">
//         <div className="stat-card">
//           <div className="card-icon">
//             <FaClipboardList style={{ color: '#8b5e3b' }} />
//           </div>
//           <div className="card-info">
//             <h2>{requests.length}</h2>
//             <p>Pending Requests</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="card-icon">
//             <FaCheck style={{ color: '#28a745' }} />
//           </div>
//           <div className="card-info">
//             <h2>{requestHistory.filter(req => req.status === "Accepted").length}</h2>
//             <p>Accepted Requests</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="card-icon">
//             <FaTimes style={{ color: '#dc3545' }} />
//           </div>
//           <div className="card-info">
//             <h2>{requestHistory.filter(req => req.status === "Rejected").length}</h2>
//             <p>Rejected Requests</p>
//           </div>
//         </div>
//       </div>

//       {/* Pending Requests Section */}
//       <div className="recent-activity mb-5">
//         <h2>Pending Requests</h2>
//         {requests.length === 0 ? (
//           <div className="alert alert-info">
//             No pending attendance requests found.
//           </div>
//         ) : (
//           <div className="activity-list">
//             {requests.map((req) => (
//               <div key={req._id} className="activity-item">
//                 <div className="activity-icon">
//                   <FaClipboardList />
//                 </div>
//                 <div className="activity-details">
//                   <div className="row">
//                     <div className="col-md-6">
//                       <p className="activity-text"><strong>Teacher ID:</strong> {req.teacherId}</p>
//                       <p className="activity-text"><strong>Subject:</strong> {req.subject}</p>
//                     </div>
//                     <div className="col-md-6">
//                       <p className="activity-text">
//                         <FaCalendarAlt className="me-1" />
//                         <strong>Date:</strong> {new Date(req.date).toLocaleDateString()}
//                       </p>
//                       <p className="activity-text">
//                         <FaInfoCircle className="me-1" />
//                         <strong>Status:</strong> <span className="badge bg-warning">Pending</span>
//                       </p>
//                     </div>
//                   </div>
//                   <p className="activity-text mt-2"><strong>Reason:</strong> {req.reason}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Request History Section */}
//       <div className="recent-activity">
//         <h2>Request History</h2>
//         {requestHistory.length === 0 ? (
//           <div className="alert alert-info">
//             No request history found.
//           </div>
//         ) : (
//           <div className="activity-list">
//             {requestHistory.map((req) => (
//               <div key={req._id} className="activity-item">
//                 <div className="activity-icon" style={{ backgroundColor: req.status === "Accepted" ? "#28a74520" : "#dc354520" }}>
//                   {req.status === "Accepted" ? <FaCheck style={{ color: '#28a745' }} /> : <FaTimes style={{ color: '#dc3545' }} />}
//                 </div>
//                 <div className="activity-details">
//                   <div className="row">
//                     <div className="col-md-6">
//                       <p className="activity-text"><strong>Teacher ID:</strong> {req.teacherId}</p>
//                       <p className="activity-text"><strong>Subject:</strong> {req.subject}</p>
//                     </div>
//                     <div className="col-md-6">
//                       <p className="activity-text">
//                         <FaCalendarAlt className="me-1" />
//                         <strong>Date:</strong> {new Date(req.date).toLocaleDateString()}
//                       </p>
//                       <p className="activity-text">
//                         <FaInfoCircle className="me-1" />
//                         <strong>Status:</strong> <span className={`badge ${req.status === "Accepted" ? "bg-success" : "bg-danger"}`}>{req.status}</span>
//                       </p>
//                     </div>
//                   </div>
//                   <p className="activity-text mt-2"><strong>Reason:</strong> {req.reason}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );

//   return (
//     <div className="dashboard-container">
//       {/* Status Message */}
//       {message && (
//         <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'} mb-4`}>
//           {message}
//         </div>
//       )}

//       {/* Loading State */}
//       {loading ? (
//         <div className="d-flex justify-content-center">
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       ) : (
//         userRole === "teacher" ? renderTeacherDashboard() : renderStudentDashboard()
//       )}
//     </div>
//   );
// };

// export default ViewRequest;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { 
//   Alert, 
//   Spinner, 
//   Card, 
//   Badge, 
//   Button,
//   Modal
// } from "react-bootstrap";
// import { FaCheck, FaTimes, FaClipboardList, FaUserGraduate, FaCalendarAlt, FaInfoCircle } from "react-icons/fa";

// import "bootstrap/dist/css/bootstrap.min.css";

// const ViewRequest = () => {
//   const storedUser = JSON.parse(localStorage.getItem("user")) || {};
//   const token = localStorage.getItem("token");
//   const userId = storedUser?.id;
//   const userRole = storedUser?.role || "teacher"; // Default to teacher if not specified

//   const [requests, setRequests] = useState([]);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [requestHistory, setRequestHistory] = useState([]);
  
//   // For modals and action confirmation
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [currentAction, setCurrentAction] = useState({ id: "", status: "" });
//   const [responseMessage, setResponseMessage] = useState("");
//   const [showResponseModal, setShowResponseModal] = useState(false);

//   const fetchRequests = async () => {
//     if (!userId) {
//       setMessage("User ID is missing. Please log in again.");
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
      
//       if (userRole === "teacher") {
//         // Teachers see only pending requests
//         const res = await axios.get(
//           `http://localhost:5001/api/attendance-request/requests/teacher/${userId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         // Filter to only show pending requests
//         setRequests(res.data.filter(req => req.status === "Pending"));
//       } else if (userRole === "student") {
//         // Students see their pending requests
//         const pendingRes = await axios.get(
//           `http://localhost:5001/api/attendance-request/requests/student/${userId}/pending`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setRequests(pendingRes.data);
        
//         // Students also see their request history (accepted/rejected)
//         const historyRes = await axios.get(
//           `http://localhost:5001/api/attendance-request/requests/student/${userId}/history`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setRequestHistory(historyRes.data);
//       }
      
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching requests:", error.response?.data || error.message);
//       setMessage("Error fetching attendance requests. Please try again later.");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, [userId, token, userRole]);

//   const openConfirmModal = (id, status) => {
//     setCurrentAction({ id, status });
//     setShowConfirmModal(true);
//   };

//   const handleStatusChange = async () => {
//     setShowConfirmModal(false);
//     setLoading(true);
    
//     try {
//       const { id, status } = currentAction;
//       await axios.put(
//         `http://localhost:5001/api/attendance-request/requests/${id}`,
//         { status },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
      
//       // Update the UI by removing the request
//       setRequests((prev) => prev.filter((req) => req._id !== id));
      
//       // Show success message in modal
//       setResponseMessage(`You have ${status.toLowerCase()} the request. The student will be notified, and this request will be automatically deleted after 48 hours.`);
//       setShowResponseModal(true);
      
//     } catch (error) {
//       console.error("Error updating request:", error.response?.data || error.message);
//       setMessage(`Error ${currentAction.status.toLowerCase()} request. Please try again.`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderTeacherDashboard = () => (
//     <>
//       <div className="dashboard-header">
//         <h1>Teacher Dashboard</h1>
//         <p className="subtitle">Manage student attendance requests</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="dashboard-cards">
//         <div className="stat-card">
//           <div className="card-icon">
//             <FaClipboardList style={{ color: '#8b5e3b' }} />
//           </div>
//           <div className="card-info">
//             <h2>{requests.length}</h2>
//             <p>Pending Requests</p>
//           </div>
//         </div>
//       </div>

//       {/* Pending Requests Section */}
//       {requests.length === 0 ? (
//         <div className="recent-activity">
//           <h2>Attendance Requests</h2>
//           <div className="alert alert-info">
//             No pending attendance requests found.
//           </div>
//         </div>
//       ) : (
//         <div className="recent-activity">
//           <h2>Attendance Requests</h2>
//           <div className="activity-list">
//             {requests.map((req) => (
//               <div key={req._id} className="activity-item">
//                 <div className="activity-icon">
//                   <FaUserGraduate />
//                 </div>
//                 <div className="activity-details">
//                   <div className="row">
//                     <div className="col-md-6">
//                       <p className="activity-text"><strong>Student ID:</strong> {req.studentId}</p>
//                       <p className="activity-text"><strong>Subject:</strong> {req.subject}</p>
//                     </div>
//                     <div className="col-md-6">
//                       <p className="activity-text">
//                         <FaCalendarAlt className="me-1" />
//                         <strong>Date:</strong> {new Date(req.date).toLocaleDateString()}
//                       </p>
//                       <p className="activity-text">
//                         <FaInfoCircle className="me-1" />
//                         <strong>Status:</strong> <span className="badge bg-warning">{req.status}</span>
//                       </p>
//                     </div>
//                   </div>
//                   <p className="activity-text mt-2"><strong>Reason:</strong> {req.reason}</p>
                  
//                   <div className="mt-3">
//                     <button 
//                       className="btn action-btn me-2" 
//                       onClick={() => openConfirmModal(req._id, "Accepted")}
//                     >
//                       <FaCheck /> Accept
//                     </button>
//                     <button 
//                       className="btn action-btn" 
//                       onClick={() => openConfirmModal(req._id, "Rejected")}
//                     >
//                       <FaTimes /> Reject
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
      
//       {/* Confirmation Modal */}
//       <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Action</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           Are you sure you want to {currentAction.status.toLowerCase()} this attendance request?
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
//             Cancel
//           </Button>
//           <Button 
//             variant={currentAction.status === "Accepted" ? "success" : "danger"} 
//             onClick={handleStatusChange}
//           >
//             {currentAction.status === "Accepted" ? "Accept" : "Reject"}
//           </Button>
//         </Modal.Footer>
//       </Modal>
      
//       {/* Response Modal */}
//       <Modal show={showResponseModal} onHide={() => setShowResponseModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Action Completed</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>{responseMessage}</Modal.Body>
//         <Modal.Footer>
//           <Button variant="primary" onClick={() => setShowResponseModal(false)}>
//             Okay
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );

//   const renderStudentDashboard = () => (
//     <>
//       <div className="dashboard-header">
//         <h1>Student Dashboard</h1>
//         <p className="subtitle">Your attendance requests</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="dashboard-cards">
//         <div className="stat-card">
//           <div className="card-icon">
//             <FaClipboardList style={{ color: '#8b5e3b' }} />
//           </div>
//           <div className="card-info">
//             <h2>{requests.length}</h2>
//             <p>Pending Requests</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="card-icon">
//             <FaCheck style={{ color: '#28a745' }} />
//           </div>
//           <div className="card-info">
//             <h2>{requestHistory.filter(req => req.status === "Accepted").length}</h2>
//             <p>Accepted Requests</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="card-icon">
//             <FaTimes style={{ color: '#dc3545' }} />
//           </div>
//           <div className="card-info">
//             <h2>{requestHistory.filter(req => req.status === "Rejected").length}</h2>
//             <p>Rejected Requests</p>
//           </div>
//         </div>
//       </div>

//       {/* Pending Requests Section */}
//       <div className="recent-activity mb-5">
//         <h2>Pending Requests</h2>
//         {requests.length === 0 ? (
//           <div className="alert alert-info">
//             No pending attendance requests found.
//           </div>
//         ) : (
//           <div className="activity-list">
//             {requests.map((req) => (
//               <div key={req._id} className="activity-item">
//                 <div className="activity-icon">
//                   <FaClipboardList />
//                 </div>
//                 <div className="activity-details">
//                   <div className="row">
//                     <div className="col-md-6">
//                       <p className="activity-text"><strong>Teacher ID:</strong> {req.teacherId}</p>
//                       <p className="activity-text"><strong>Subject:</strong> {req.subject}</p>
//                     </div>
//                     <div className="col-md-6">
//                       <p className="activity-text">
//                         <FaCalendarAlt className="me-1" />
//                         <strong>Date:</strong> {new Date(req.date).toLocaleDateString()}
//                       </p>
//                       <p className="activity-text">
//                         <FaInfoCircle className="me-1" />
//                         <strong>Status:</strong> <span className="badge bg-warning">Pending</span>
//                       </p>
//                     </div>
//                   </div>
//                   <p className="activity-text mt-2"><strong>Reason:</strong> {req.reason}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Request History Section */}
//       <div className="recent-activity">
//         <h2>Request History</h2>
//         {requestHistory.length === 0 ? (
//           <div className="alert alert-info">
//             No request history found.
//           </div>
//         ) : (
//           <div className="activity-list">
//             {requestHistory.map((req) => (
//               <div key={req._id} className="activity-item">
//                 <div className="activity-icon" style={{ backgroundColor: req.status === "Accepted" ? "#28a74520" : "#dc354520" }}>
//                   {req.status === "Accepted" ? <FaCheck style={{ color: '#28a745' }} /> : <FaTimes style={{ color: '#dc3545' }} />}
//                 </div>
//                 <div className="activity-details">
//                   <div className="row">
//                     <div className="col-md-6">
//                       <p className="activity-text"><strong>Teacher ID:</strong> {req.teacherId}</p>
//                       <p className="activity-text"><strong>Subject:</strong> {req.subject}</p>
//                     </div>
//                     <div className="col-md-6">
//                       <p className="activity-text">
//                         <FaCalendarAlt className="me-1" />
//                         <strong>Date:</strong> {new Date(req.date).toLocaleDateString()}
//                       </p>
//                       <p className="activity-text">
//                         <FaInfoCircle className="me-1" />
//                         <strong>Status:</strong> <span className={`badge ${req.status === "Accepted" ? "bg-success" : "bg-danger"}`}>{req.status}</span>
//                       </p>
//                     </div>
//                   </div>
//                   <p className="activity-text mt-2"><strong>Reason:</strong> {req.reason}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );

//   return (
//     <div className="dashboard-container">
//       {/* Status Message */}
//       {message && (
//         <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'} mb-4`}>
//           {message}
//         </div>
//       )}

//       {/* Loading State */}
//       {loading ? (
//         <div className="d-flex justify-content-center">
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       ) : (
//         userRole === "teacher" ? renderTeacherDashboard() : renderStudentDashboard()
//       )}
//     </div>
//   );
// };

// export default ViewRequest;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Alert, 
  Spinner, 
  Card, 
  Badge, 
  Button,
  Modal
} from "react-bootstrap";
import { FaCheck, FaTimes, FaClipboardList, FaUserGraduate, FaCalendarAlt, FaInfoCircle } from "react-icons/fa";

import "bootstrap/dist/css/bootstrap.min.css";

const ViewRequest = () => {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const token = localStorage.getItem("token");
  const userId = storedUser?.id;
  const userRole = storedUser?.role || "teacher"; // Default to teacher if not specified

  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [requestHistory, setRequestHistory] = useState([]);
  
  // For modals and action confirmation
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentAction, setCurrentAction] = useState({ id: "", status: "" });
  const [responseMessage, setResponseMessage] = useState("");
  const [showResponseModal, setShowResponseModal] = useState(false);
  
  // New state to track the most recent action for dashboard acknowledgment
  const [recentAction, setRecentAction] = useState(null);

  const fetchRequests = async () => {
    if (!userId) {
      setMessage("User ID is missing. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      if (userRole === "teacher") {
        // Teachers see only pending requests
        const res = await axios.get(
          `http://localhost:5001/api/attendance-request/requests/teacher/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // Filter to only show pending requests
        setRequests(res.data.filter(req => req.status === "Pending"));
      } else if (userRole === "student") {
        // Students see their pending requests
        const pendingRes = await axios.get(
          `http://localhost:5001/api/attendance-request/requests/student/${userId}/pending`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRequests(pendingRes.data);
        
        // Students also see their request history (accepted/rejected)
        const historyRes = await axios.get(
          `http://localhost:5001/api/attendance-request/requests/student/${userId}/history`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRequestHistory(historyRes.data);
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching requests:", error.response?.data || error.message);
      setMessage("Error fetching attendance requests. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [userId, token, userRole]);

  const openConfirmModal = (id, status) => {
    setCurrentAction({ id, status });
    setShowConfirmModal(true);
  };

  const handleStatusChange = async () => {
    setShowConfirmModal(false);
    setLoading(true);
    
    try {
      const { id, status } = currentAction;
      
      // Store the current request details before removing it
      const actionedRequest = requests.find(req => req._id === id);
      
      await axios.put(
        `http://localhost:5001/api/attendance-request/requests/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      // Update the UI by removing the request
      setRequests((prev) => prev.filter((req) => req._id !== id));
      
      // Set the recent action acknowledgment
      setRecentAction({
        status,
        studentId: actionedRequest?.studentId,
        subject: actionedRequest?.subject,
        timestamp: new Date()
      });
      
      // Show success message in modal
      setResponseMessage(`You have ${status.toLowerCase()} the request. The student will be notified, and this request will be automatically deleted after 48 hours.`);
      setShowResponseModal(true);
      
    } catch (error) {
      console.error("Error updating request:", error.response?.data || error.message);
      setMessage(`Error ${currentAction.status.toLowerCase()} request. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const renderTeacherDashboard = () => (
    <>
      <div className="dashboard-header">
        <h1>Teacher Dashboard</h1>
        <p className="subtitle">Manage student attendance requests</p>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-cards">
        <div className="stat-card">
          <div className="card-icon">
            <FaClipboardList style={{ color: '#8b5e3b' }} />
          </div>
          <div className="card-info">
            <h2>{requests.length}</h2>
            <p>Pending Requests</p>
          </div>
        </div>
      </div>

      {/* Recent Action Acknowledgment */}
      {recentAction && (
        <div className={`alert ${recentAction.status === "Accepted" ? "alert-success" : "alert-danger"} mb-4`}>
          <strong>Recent Action:</strong> You {recentAction.status.toLowerCase()} the attendance request from student ID: {recentAction.studentId} for {recentAction.subject}.
          <span className="float-end text-muted small">
            {recentAction.timestamp.toLocaleTimeString()}
          </span>
        </div>
      )}

      {/* Pending Requests Section */}
      {requests.length === 0 ? (
        <div className="recent-activity">
          <h2>Attendance Requests</h2>
          <div className="alert alert-info">
            No pending attendance requests found.
          </div>
        </div>
      ) : (
        <div className="recent-activity">
          <h2>Attendance Requests</h2>
          <div className="activity-list">
            {requests.map((req) => (
              <div key={req._id} className="activity-item">
                <div className="activity-icon">
                  <FaUserGraduate />
                </div>
                <div className="activity-details">
                  <div className="row">
                    <div className="col-md-6">
                      <p className="activity-text"><strong>Student ID:</strong> {req.studentId}</p>
                      <p className="activity-text"><strong>Subject:</strong> {req.subject}</p>
                    </div>
                    <div className="col-md-6">
                      <p className="activity-text">
                        <FaCalendarAlt className="me-1" />
                        <strong>Date:</strong> {new Date(req.date).toLocaleDateString()}
                      </p>
                      <p className="activity-text">
                        <FaInfoCircle className="me-1" />
                        <strong>Status:</strong> <span className="badge bg-warning">{req.status}</span>
                      </p>
                    </div>
                  </div>
                  <p className="activity-text mt-2"><strong>Reason:</strong> {req.reason}</p>
                  
                  <div className="mt-3">
                    <button 
                      className="btn action-btn me-2" 
                      onClick={() => openConfirmModal(req._id, "Accepted")}
                    >
                      <FaCheck /> Accept
                    </button>
                    <button 
                      className="btn action-btn" 
                      onClick={() => openConfirmModal(req._id, "Rejected")}
                    >
                      <FaTimes /> Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to {currentAction.status.toLowerCase()} this attendance request?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button 
            variant={currentAction.status === "Accepted" ? "success" : "danger"} 
            onClick={handleStatusChange}
          >
            {currentAction.status === "Accepted" ? "Accept" : "Reject"}
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Response Modal */}
      <Modal show={showResponseModal} onHide={() => setShowResponseModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Action Completed</Modal.Title>
        </Modal.Header>
        <Modal.Body>{responseMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowResponseModal(false)}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

  const renderStudentDashboard = () => (
    <>
      <div className="dashboard-header">
        <h1>Student Dashboard</h1>
        <p className="subtitle">Your attendance requests</p>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-cards">
        <div className="stat-card">
          <div className="card-icon">
            <FaClipboardList style={{ color: '#8b5e3b' }} />
          </div>
          <div className="card-info">
            <h2>{requests.length}</h2>
            <p>Pending Requests</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="card-icon">
            <FaCheck style={{ color: '#28a745' }} />
          </div>
          <div className="card-info">
            <h2>{requestHistory.filter(req => req.status === "Accepted").length}</h2>
            <p>Accepted Requests</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="card-icon">
            <FaTimes style={{ color: '#dc3545' }} />
          </div>
          <div className="card-info">
            <h2>{requestHistory.filter(req => req.status === "Rejected").length}</h2>
            <p>Rejected Requests</p>
          </div>
        </div>
      </div>

      {/* Pending Requests Section */}
      <div className="recent-activity mb-5">
        <h2>Pending Requests</h2>
        {requests.length === 0 ? (
          <div className="alert alert-info">
            No pending attendance requests found.
          </div>
        ) : (
          <div className="activity-list">
            {requests.map((req) => (
              <div key={req._id} className="activity-item">
                <div className="activity-icon">
                  <FaClipboardList />
                </div>
                <div className="activity-details">
                  <div className="row">
                    <div className="col-md-6">
                      <p className="activity-text"><strong>Teacher ID:</strong> {req.teacherId}</p>
                      <p className="activity-text"><strong>Subject:</strong> {req.subject}</p>
                    </div>
                    <div className="col-md-6">
                      <p className="activity-text">
                        <FaCalendarAlt className="me-1" />
                        <strong>Date:</strong> {new Date(req.date).toLocaleDateString()}
                      </p>
                      <p className="activity-text">
                        <FaInfoCircle className="me-1" />
                        <strong>Status:</strong> <span className="badge bg-warning">Pending</span>
                      </p>
                    </div>
                  </div>
                  <p className="activity-text mt-2"><strong>Reason:</strong> {req.reason}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Request History Section */}
      <div className="recent-activity">
        <h2>Request History</h2>
        {requestHistory.length === 0 ? (
          <div className="alert alert-info">
            No request history found.
          </div>
        ) : (
          <div className="activity-list">
            {requestHistory.map((req) => (
              <div key={req._id} className="activity-item">
                <div className="activity-icon" style={{ backgroundColor: req.status === "Accepted" ? "#28a74520" : "#dc354520" }}>
                  {req.status === "Accepted" ? <FaCheck style={{ color: '#28a745' }} /> : <FaTimes style={{ color: '#dc3545' }} />}
                </div>
                <div className="activity-details">
                  <div className="row">
                    <div className="col-md-6">
                      <p className="activity-text"><strong>Teacher ID:</strong> {req.teacherId}</p>
                      <p className="activity-text"><strong>Subject:</strong> {req.subject}</p>
                    </div>
                    <div className="col-md-6">
                      <p className="activity-text">
                        <FaCalendarAlt className="me-1" />
                        <strong>Date:</strong> {new Date(req.date).toLocaleDateString()}
                      </p>
                      <p className="activity-text">
                        <FaInfoCircle className="me-1" />
                        <strong>Status:</strong> <span className={`badge ${req.status === "Accepted" ? "bg-success" : "bg-danger"}`}>{req.status}</span>
                      </p>
                    </div>
                  </div>
                  <p className="activity-text mt-2"><strong>Reason:</strong> {req.reason}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="dashboard-container">
      {/* Status Message */}
      {message && (
        <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'} mb-4`}>
          {message}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        userRole === "teacher" ? renderTeacherDashboard() : renderStudentDashboard()
      )}
    </div>
  );
};

export default ViewRequest;
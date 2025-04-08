



// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import '../../styles/Tt.css';

// // const Timetable = () => {
// //   const [timetable, setTimetable] = useState([]);
// //   const [teacherName, setTeacherName] = useState("");
// //   const [error, setError] = useState("");

// //   const teacherId = localStorage.getItem("teacherId");
// //   const role = localStorage.getItem("role");
// //   const token = localStorage.getItem("token");
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     if (!token) {
// //       console.error("No authentication token found");
// //       navigate("/login");
// //       return;
// //     }

// //     let url = "";
// //     if (role === "admin") {
// //       url = `http://localhost:5001/api/timetable`;
// //     } else if (role === "teacher" && teacherId) {
// //       url = `http://localhost:5001/api/timetable/teacher/${teacherId}`;
// //     } else {
// //       setError("Unauthorized access");
// //       return;
// //     }

// //     const config = {
// //       headers: {
// //         Authorization: `Bearer ${token}`,
// //       },
// //     };

// //     // Fetch Timetable
// //     axios
// //       .get(url, config)
// //       .then((response) => {
// //         console.log("API Response:", response.data);
// //         setTimetable(sortTimetable(response.data || []));
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching timetable:", error);
// //         setError("Failed to fetch timetable");
// //       });

// //     // Fetch Teacher Name (Only for teachers)
// //     if (role === "teacher") {
// //       axios
// //         .get(`http://localhost:5001/api/teachers/${teacherId}`, config)
// //         .then((response) => {
// //           console.log("Teacher Data:", response.data);
// //           setTeacherName(response.data.name || "Teacher");
// //         })
// //         .catch((error) => {
// //           console.error("Error fetching teacher name:", error);
// //         });
// //     }
// //   }, [teacherId, token, role, navigate]);

// //   // Function to sort timetable based on time slots
// //   const sortTimetable = (data) => {
// //     return data.sort((a, b) => {
// //       const convertTime = (time) => {
// //         let [hour, minutePart] = time.split(":");
// //         let [minute, period] = minutePart.trim().split(" ");
// //         hour = parseInt(hour, 10);
// //         minute = parseInt(minute, 10);

// //         if (period === "PM" && hour !== 12) hour += 12;
// //         if (period === "AM" && hour === 12) hour = 0;

// //         return hour * 60 + minute; // Convert to total minutes
// //       };

// //       let timeA = convertTime(a.timeSlot.split(" - ")[0]);
// //       let timeB = convertTime(b.timeSlot.split(" - ")[0]);

// //       return timeA - timeB;
// //     });
// //   };

// //   // Updated function to include subjectId in navigation
// //   const handleSlotClick = (entry) => {
// //     if (!entry) return;
  
// //     const parts = entry.section.split("-");
// //     const department = parts[0].trim();
// //     const section = parts.length > 1 ? parts[1].trim() : "A";
  
// //     navigate(`/teacher/attendance/${department}/${section}/${entry.subjectId}`);
// //   };
// //   // Default to 'A' if no section
    
// //     // We need to fetch the actual subject code (SUB001, SUB009, etc.)
// //     // instead of using MongoDB ObjectID
// //     // const fetchSubjectCode = async () => {
// //     //   try {
// //     //     const response = await axios.get(`http://localhost:5001/api/subjects/${entry.subjectId}`, {
// //     //       headers: { Authorization: `Bearer ${token}` }
// //     //     });
        
// //     //     if (response.data && response.data.subjectId) {
// //     //       // Navigate with the standard subject code (SUB001, SUB009, etc.)
// //     //       console.log(`Navigating with subject code: ${response.data.subjectId}`);
// //     //       navigate(`/teacher/attendance/${department}/${section}/${response.data.subjectId}`);
// //     //     } else {
// //     //       // Fallback to using the MongoDB ID if subject code not found
// //     //       console.log(`Subject code not found, using ID: ${entry.subjectId}`);
// //     //       navigate(`/teacher/attendance/${department}/${section}/${entry.subjectId}`);
// //     //     }
// //     //   } catch (error) {
// //     //     console.error("Error fetching subject details:", error);
// //     //     // Fallback to using the MongoDB ID
// //     //     navigate(`/teacher/attendance/${department}/${section}/${entry.subjectId}`);
// //     //   }
// //     // };
  

// //   return (
// //     <div className="timetable-container">
// //       {role === "teacher" && (
// //         <h1 className="welcome-text">
// //           Welcome, {teacherName || "Teacher"}!
// //         </h1>
// //       )}
// //       <h2 className="timetable-heading">
// //         {role === "admin" ? "All Timetables" : "Your Timetable"}
// //       </h2>

// //       {error ? (
// //         <p className="error-text">{error}</p>
// //       ) : (
// //         <div className="timetable-wrapper">
// //           {timetable.length > 0 ? (
// //             <table className="timetable">
// //               <thead>
// //                 <tr className="table-header">
// //                   <th className="table-th">Time Slot</th>
// //                   <th className="table-th">Monday</th>
// //                   <th className="table-th">Tuesday</th>
// //                   <th className="table-th">Wednesday</th>
// //                   <th className="table-th">Thursday</th>
// //                   <th className="table-th">Friday</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {Array.from(new Set(timetable.map((entry) => entry.timeSlot))).map(
// //                   (timeSlot, index) => (
// //                     <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
// //                       <td className="table-td">{timeSlot}</td>
// //                       {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => {
// //                         const entry = timetable.find(
// //                           (item) => item.timeSlot === timeSlot && item.day === day
// //                         );
// //                         return (
// //                           <td key={day} className="table-td">
// //                             {entry ? (
// //                               <div className="timetable-entry">
// //                                 <button className="subject-button" onClick={() => handleSlotClick(entry)}>
// //                                   {entry.subjectId}
// //                                 </button>
// //                                 <span className="section-text">{entry.section}</span>
// //                               </div>
// //                             ) : (
// //                               <span className="empty-slot">-</span>
// //                             )}
// //                           </td>
// //                         );
// //                       })}
// //                     </tr>
// //                   )
// //                 )}
// //               </tbody>
// //             </table>
// //           ) : (
// //             <p className="no-timetable">No timetable available.</p>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Timetable;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../../styles/Tt.css';

// const Timetable = () => {
//   const [timetable, setTimetable] = useState([]);
//   const [teacherName, setTeacherName] = useState("");
//   const [error, setError] = useState("");

//   const teacherId = localStorage.getItem("teacherId");
//   const role = localStorage.getItem("role");
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!token) {
//       console.error("No authentication token found");
//       navigate("/login");
//       return;
//     }

//     let url = "";
//     if (role === "admin") {
//       url = `http://localhost:5001/api/timetable`;
//     } else if (role === "teacher" && teacherId) {
//       url = `http://localhost:5001/api/timetable/teacher/${teacherId}`;
//     } else {
//       setError("Unauthorized access");
//       return;
//     }

//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     // Fetch Timetable
//     axios
//       .get(url, config)
//       .then((response) => {
//         console.log("API Response:", response.data);
//         setTimetable(sortTimetable(response.data || []));
//       })
//       .catch((error) => {
//         console.error("Error fetching timetable:", error);
//         setError("Failed to fetch timetable");
//       });

//     // Fetch Teacher Name (Only for teachers)
//     if (role === "teacher") {
//       axios
//         .get(`http://localhost:5001/api/teachers/${teacherId}`, config)
//         .then((response) => {
//           console.log("Teacher Data:", response.data);
//           setTeacherName(response.data.name || "Teacher");
//         })
//         .catch((error) => {
//           console.error("Error fetching teacher name:", error);
//         });
//     }
//   }, [teacherId, token, role, navigate]);

//   const sortTimetable = (data) => {
//     return data.sort((a, b) => {
//       const convertTime = (time) => {
//         let [hour, minutePart] = time.split(":");
//         let [minute, period] = minutePart.trim().split(" ");
//         hour = parseInt(hour, 10);
//         minute = parseInt(minute, 10);
//         if (period === "PM" && hour !== 12) hour += 12;
//         if (period === "AM" && hour === 12) hour = 0;
//         return hour * 60 + minute;
//       };

//       let timeA = convertTime(a.timeSlot.split(" - ")[0]);
//       let timeB = convertTime(b.timeSlot.split(" - ")[0]);
//       return timeA - timeB;
//     });
//   };

//   const handleSlotClick = (entry) => {
//     if (!entry || !entry.subjectId) return;

//     const parts = entry.section.split("-");
//     const department = parts[0].trim();
//     const section = parts.length > 1 ? parts[1].trim() : "A";

//     // ✅ FIXED HERE: Use subjectId.name instead of subjectId object
//     const subjectCode = entry.subjectId.name || entry.subjectId;

//     navigate(`/teacher/attendance/${department}/${section}/${subjectCode}`);
//   };

//   return (
//     <div className="timetable-container">
//       {role === "teacher" && (
//         <h1 className="welcome-text">
//           Welcome, {teacherName || "Teacher"}!
//         </h1>
//       )}
//       <h2 className="timetable-heading">
//         {role === "admin" ? "All Timetables" : "Your Timetable"}
//       </h2>

//       {error ? (
//         <p className="error-text">{error}</p>
//       ) : (
//         <div className="timetable-wrapper">
//           {timetable.length > 0 ? (
//             <table className="timetable">
//               <thead>
//                 <tr className="table-header">
//                   <th className="table-th">Time Slot</th>
//                   <th className="table-th">Monday</th>
//                   <th className="table-th">Tuesday</th>
//                   <th className="table-th">Wednesday</th>
//                   <th className="table-th">Thursday</th>
//                   <th className="table-th">Friday</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {Array.from(new Set(timetable.map((entry) => entry.timeSlot))).map(
//                   (timeSlot, index) => (
//                     <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
//                       <td className="table-td">{timeSlot}</td>
//                       {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => {
//                         const entry = timetable.find(
//                           (item) => item.timeSlot === timeSlot && item.day === day
//                         );
//                         return (
//                           <td key={day} className="table-td">
//                             {entry ? (
//                               <div className="timetable-entry">
//                                 <button className="subject-button" onClick={() => handleSlotClick(entry)}>
//                                   {/* ✅ FIXED HERE: render subject name */}
//                                   {entry.subjectId?.name || "N/A"}
//                                 </button>
//                                 <span className="section-text">{entry.section}</span>
//                               </div>
//                             ) : (
//                               <span className="empty-slot">-</span>
//                             )}
//                           </td>
//                         );
//                       })}
//                     </tr>
//                   )
//                 )}
//               </tbody>
//             </table>
//           ) : (
//             <p className="no-timetable">No timetable available.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Timetable;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../../styles/Tt.css';

// const Timetable = () => {
//   const [timetable, setTimetable] = useState([]);
//   const [teacherName, setTeacherName] = useState("");
//   const [error, setError] = useState("");

//   const teacherId = localStorage.getItem("teacherId");
//   const role = localStorage.getItem("role");
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!token) {
//       console.error("No authentication token found");
//       navigate("/login");
//       return;
//     }

//     let url = "";
//     if (role === "admin") {
//       url = `http://localhost:5001/api/timetable`;
//     } else if (role === "teacher" && teacherId) {
//       url = `http://localhost:5001/api/timetable/teacher/${teacherId}`;
//     } else {
//       setError("Unauthorized access");
//       return;
//     }

//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     // Fetch Timetable
//     axios
//       .get(url, config)
//       .then((response) => {
//         console.log("API Response:", response.data);
//         setTimetable(sortTimetable(response.data || []));
//       })
//       .catch((error) => {
//         console.error("Error fetching timetable:", error);
//         setError("Failed to fetch timetable");
//       });

//     // Fetch Teacher Name (Only for teachers)
//     if (role === "teacher") {
//       axios
//         .get(`http://localhost:5001/api/teachers/${teacherId}`, config)
//         .then((response) => {
//           console.log("Teacher Data:", response.data);
//           setTeacherName(response.data.name || "Teacher");
//         })
//         .catch((error) => {
//           console.error("Error fetching teacher name:", error);
//         });
//     }
//   }, [teacherId, token, role, navigate]);

//   const sortTimetable = (data) => {
//     return data.sort((a, b) => {
//       const convertTime = (time) => {
//         let [hour, minutePart] = time.split(":");
//         let [minute, period] = minutePart.trim().split(" ");
//         hour = parseInt(hour, 10);
//         minute = parseInt(minute, 10);
//         if (period === "PM" && hour !== 12) hour += 12;
//         if (period === "AM" && hour === 12) hour = 0;
//         return hour * 60 + minute;
//       };

//       let timeA = convertTime(a.timeSlot.split(" - ")[0]);
//       let timeB = convertTime(b.timeSlot.split(" - ")[0]);
//       return timeA - timeB;
//     });
//   };

//   const handleSlotClick = (entry) => {
//     if (!entry || !entry.subjectId) return;

//     const parts = entry.section.split("-");
//     const department = parts[0].trim();
//     const section = parts.length > 1 ? parts[1].trim() : "A";

//     // ✅ FIXED HERE: send subjectId._id to backend, not name
//     const subjectCode = entry.subjectId._id || entry.subjectId;

//     navigate(`/teacher/attendance/${department}/${section}/${subjectCode}`);
//   };

//   return (
//     <div className="timetable-container">
//       {role === "teacher" && (
//         <h1 className="welcome-text">
//           Welcome, {teacherName || "Teacher"}!
//         </h1>
//       )}
//       <h2 className="timetable-heading">
//         {role === "admin" ? "All Timetables" : "Your Timetable"}
//       </h2>

//       {error ? (
//         <p className="error-text">{error}</p>
//       ) : (
//         <div className="timetable-wrapper">
//           {timetable.length > 0 ? (
//             <table className="timetable">
//               <thead>
//                 <tr className="table-header">
//                   <th className="table-th">Time Slot</th>
//                   <th className="table-th">Monday</th>
//                   <th className="table-th">Tuesday</th>
//                   <th className="table-th">Wednesday</th>
//                   <th className="table-th">Thursday</th>
//                   <th className="table-th">Friday</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {Array.from(new Set(timetable.map((entry) => entry.timeSlot))).map(
//                   (timeSlot, index) => (
//                     <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
//                       <td className="table-td">{timeSlot}</td>
//                       {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => {
//                         const entry = timetable.find(
//                           (item) => item.timeSlot === timeSlot && item.day === day
//                         );
//                         return (
//                           <td key={day} className="table-td">
//                             {entry ? (
//                               <div className="timetable-entry">
//                                 <button className="subject-button" onClick={() => handleSlotClick(entry)}>
//                                   {/* ✅ Also fixed: only render subject name for display */}
//                                   {entry.subjectId?.name || "N/A"}
//                                 </button>
//                                 <span className="section-text">{entry.section}</span>
//                               </div>
//                             ) : (
//                               <span className="empty-slot">-</span>
//                             )}
//                           </td>
//                         );
//                       })}
//                     </tr>
//                   )
//                 )}
//               </tbody>
//             </table>
//           ) : (
//             <p className="no-timetable">No timetable available.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Timetable;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Alert, Spinner, Table } from 'react-bootstrap';

const Timetable = () => {
  const [timetable, setTimetable] = useState([]);
  const [processedTimetable, setProcessedTimetable] = useState([]);
  const [teacherName, setTeacherName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const teacherId = localStorage.getItem("teacherId");
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Define time formats and slots in chronological order
  const timeFormats = {
    "9:00 AM": 9, "10:00 AM": 10, "11:00 AM": 11, "12:00 PM": 12,
    "1:00 PM": 13, "2:00 PM": 14, "3:00 PM": 15, "4:00 PM": 16
  };

  // Standard time slots for display in correct chronological order
  const timeSlots = [
    "9:00 - 11:00 AM", 
    "11:00 - 12:00 PM", 
    "1:00 - 2:00 PM", 
    "2:00 - 4:00 PM", 
    "3:00 - 4:00 PM"
  ];
  
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Parse time slot into numeric format
  const parseTimeSlot = (timeSlot) => {
    try {
      const [startTimeStr, endTimeStr] = timeSlot.split(" - ").map(t => t.trim());
      return {
        start: timeFormats[startTimeStr] || 0,
        end: timeFormats[endTimeStr] || 0,
        original: timeSlot
      };
    } catch (error) {
      console.error("Error parsing time slot:", error, timeSlot);
      return { start: 0, end: 0, original: timeSlot };
    }
  };

  // Process timetable data to handle multi-hour slots
  const processMultiHourSlots = (data) => {
    // Create a structured timetable with days and time slots
    const structuredTimetable = {};
    
    days.forEach(day => {
      structuredTimetable[day] = {};
      
      // Find classes for this day
      const dayClasses = data.filter(entry => entry.day === day);
      
      dayClasses.forEach(entry => {
        const { start, end } = parseTimeSlot(entry.timeSlot);
        
        // For multi-hour slots, mark each hour
        for (let hour = start; hour < end; hour++) {
          const hourKey = Object.keys(timeFormats).find(k => timeFormats[k] === hour);
          const nextHourKey = Object.keys(timeFormats).find(k => timeFormats[k] === hour + 1);
          
          if (hourKey && nextHourKey) {
            const slotKey = `${hourKey} - ${nextHourKey}`;
            structuredTimetable[day][slotKey] = {
              ...entry,
              isStartingSlot: hour === start,
              isContinuation: hour > start,
              duration: end - start
            };
          }
        }
      });
    });
    
    return structuredTimetable;
  };

  useEffect(() => {
    if (!token) {
      console.error("No authentication token found");
      navigate("/login");
      return;
    }

    let url = "";
    if (role === "admin") {
      url = `http://localhost:5001/api/timetable`;
    } else if (role === "teacher" && teacherId) {
      url = `http://localhost:5001/api/timetable/teacher/${teacherId}`;
    } else {
      setError("Unauthorized access");
      setLoading(false);
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Fetch Timetable
    axios
      .get(url, config)
      .then((response) => {
        console.log("API Response:", response.data);
        const sortedData = sortTimetable(response.data || []);
        setTimetable(sortedData);
        setProcessedTimetable(processMultiHourSlots(sortedData));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching timetable:", error);
        setError("Failed to fetch timetable");
        setLoading(false);
      });

    // Fetch Teacher Name (Only for teachers)
    if (role === "teacher") {
      axios
        .get(`http://localhost:5001/api/teachers/${teacherId}`, config)
        .then((response) => {
          console.log("Teacher Data:", response.data);
          setTeacherName(response.data.name || "Teacher");
        })
        .catch((error) => {
          console.error("Error fetching teacher name:", error);
        });
    }
  }, [teacherId, token, role, navigate]);

  const sortTimetable = (data) => {
    return data.sort((a, b) => {
      const convertTime = (time) => {
        let [hour, minutePart] = time.split(":");
        let [minute, period] = minutePart.trim().split(" ");
        hour = parseInt(hour, 10);
        minute = parseInt(minute, 10);
        if (period === "PM" && hour !== 12) hour += 12;
        if (period === "AM" && hour === 12) hour = 0;
        return hour * 60 + minute;
      };

      let timeA = convertTime(a.timeSlot.split(" - ")[0]);
      let timeB = convertTime(b.timeSlot.split(" - ")[0]);
      return timeA - timeB;
    });
  };

  const handleSlotClick = (entry) => {
    if (!entry || !entry.subjectId) return;

    const parts = entry.section.split("-");
    const department = parts[0].trim();
    const section = parts.length > 1 ? parts[1].trim() : "A";

    // Send subjectId._id to backend, not name
    const subjectCode = entry.subjectId._id || entry.subjectId;

    navigate(`/teacher/attendance/${department}/${section}/${subjectCode}`);
  };

  // Function to get class details for a day and time slot
  const getClassDetails = (day, timeSlot) => {
    return processedTimetable[day]?.[timeSlot] || null;
  };

  // Sort time slots for consistent display
  const getOrderedTimeSlots = () => {
    // Extract all unique time slots from the timetable
    const uniqueSlots = Array.from(new Set(timetable.map((entry) => entry.timeSlot)));
    
    // Sort them by starting time
    return uniqueSlots.sort((a, b) => {
      const slotA = parseTimeSlot(a);
      const slotB = parseTimeSlot(b);
      
      // First compare starting hours
      if (slotA.start !== slotB.start) {
        return slotA.start - slotB.start;
      }
      
      // If starting hours are the same, sort by duration (shorter first)
      return (slotA.end - slotA.start) - (slotB.end - slotB.start);
    });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {teacherName || "Teacher"}!</h1>
        <p className="subtitle">View your weekly schedule</p>
      </div>

      {error && (
        <Alert variant="danger">
          <Alert.Heading>Error loading timetable</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-2">Loading your timetable...</p>
        </div>
      ) : timetable.length === 0 ? (
        <Alert variant="info">
          No timetable available. Please contact your administrator.
        </Alert>
      ) : (
        <div className="timetable-container">
          <Table bordered className="timetable-grid">
            <thead>
              <tr>
                <th className="time-slot-header">Time Slot</th>
                {days.map((day) => (
                  <th key={day}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {getOrderedTimeSlots().map((timeSlot) => {
                return (
                  <tr key={timeSlot}>
                    <td className="time-slot">
                      {timeSlot}
                    </td>
                    {days.map((day) => {
                      const classDetails = timetable.find(
                        item => item.day === day && item.timeSlot === timeSlot
                      );
                      
                      return (
                        <td 
                          key={`${day}-${timeSlot}`} 
                          className={classDetails ? "has-class" : ""}
                        >
                          {classDetails && (
                            <div 
                              className="class-cell" 
                              onClick={() => handleSlotClick(classDetails)}
                            >
                              <div className="subject-name">
                                {classDetails.subjectId?.name || "N/A"}
                              </div>
                              <div className="section-info">{classDetails.section}</div>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}

      {/* Inline Styles */}
      <style jsx>{`
        .dashboard-container {
          padding: 2rem;
          background-color: #fff6ea;
          min-height: 100vh;
          border-radius: 10px;
        }
        
        .dashboard-header {
          margin-bottom: 2rem;
        }
        
        .dashboard-header h1 {
          color: #5c3d2e;
          font-size: 2.2rem;
          margin-bottom: 0.5rem;
        }
        
        .subtitle {
          color: #8b5e3b;
          font-size: 1.1rem;
          opacity: 0.8;
        }

        .timetable-container {
          background-color: white;
          border-radius: 10px;
          padding: 1rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          overflow-x: auto;
        }
        
        .timetable-grid {
          table-layout: fixed;
          margin-bottom: 0;
          width: 100%;
          border-collapse: collapse;
        }
        
        .timetable-grid th {
          background-color: #5c3d2e;
          color: white;
          text-align: center;
          padding: 10px;
          border: 1px solid #8b5e3b;
        }
        
        .time-slot-header {
          width: 15%;
        }
        
        .time-slot {
          font-weight: bold;
          vertical-align: middle;
          text-align: center;
          background-color: #f8ece1;
          color: #5c3d2e;
          padding: 10px;
          border: 1px solid #ddd;
        }
        
        .has-class {
          padding: 0;
          background-color: #fffbf6;
          border: 1px solid #ddd;
        }
        
        .class-cell {
          padding: 10px;
          height: 100%;
          border-left: 4px solid #8b5e3b;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: all 0.2s;
          cursor: pointer;
        }
        
        .class-cell:hover {
          background-color: #f8e3cb;
          border-left-color: #5c3d2e;
        }
        
        .subject-name {
          font-weight: bold;
          color: #5c3d2e;
          margin-bottom: 4px;
        }
        
        .section-info {
          font-size: 0.9em;
          color: #8b5e3b;
        }
        
        .continuation-cell {
          background-color: #f8f1e9;
          border-left: 4px solid #8b5e3b;
          border-top: 1px dashed #8b5e3b;
        }
        
        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .dashboard-container {
            padding: 1rem;
          }
          
          .dashboard-header h1 {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Timetable;







// import { useEffect, useState } from "react";
// import axios from "axios";

// const StudentTimetable = () => {
//   const [timetable, setTimetable] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const student = JSON.parse(localStorage.getItem("user"));
//     const token = localStorage.getItem("token");

//     if (!student?.section) {
//       setError("User section not found!");
//       setLoading(false);
//       return;
//     }

//     console.log("Fetching timetable for section:", student.section);

//     axios
//       .get(`http://localhost:5001/api/section-timetable/${student.section}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((response) => {
//         setTimetable(response.data);
//         setError(null);
//       })
//       .catch((error) => {
//         console.error("Error fetching timetable:", error);
//         setError(error.response?.data?.message || "Error fetching timetable.");
//       })
//       .finally(() => {
//         setLoading(false);
//       });

//   }, []);

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center">Student Timetable</h2>

//       {loading ? (
//         <p>Loading timetable...</p>
//       ) : error ? (
//         <p style={{ color: "red" }}>{error}</p>
//       ) : (
//         <table className="table table-bordered">
//           <thead className="table-dark">
//             <tr>
//               <th>Day</th>
//               <th>Time Slot</th>
//               <th>Subject</th>
//               <th>Teacher ID</th>
//             </tr>
//           </thead>
//           <tbody>
//             {timetable.length > 0 ? (
//               timetable.map((daySchedule) =>
//                 daySchedule.schedule.map((slot) => (
//                   <tr key={slot._id}>
//                     <td>{daySchedule.day}</td>
//                     <td>{slot.timeSlot}</td>
//                     <td>{slot.subject}</td>
//                     <td>{slot.teacherId}</td>
//                   </tr>
//                 ))
//               )
//             ) : (
//               <tr>
//                 <td colSpan="4" className="text-center">
//                   No timetable available.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default StudentTimetable;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Spinner, Table } from "react-bootstrap";

const StudentTimetable = () => {
  const [timetable, setTimetable] = useState([]);
  const [processedTimetable, setProcessedTimetable] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Time formats and slots
  const timeFormats = {
    "9:00": 9, "10:00": 10, "11:00": 11, "12:00": 12,
    "1:00": 13, "2:00": 14, "3:00": 15, "4:00": 16
  };

  const timeSlots = [
    "9:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", 
    "12:00 - 1:00", "1:00 - 2:00", "2:00 - 3:00", "3:00 - 4:00"
  ];
  
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Parse time slot into numeric format
  const parseTimeSlot = (timeSlot) => {
    try {
      const [startTimeStr, endTimeStr] = timeSlot.split(" - ").map(t => t.trim());
      return {
        start: timeFormats[startTimeStr],
        end: timeFormats[endTimeStr],
        original: timeSlot
      };
    } catch (error) {
      console.error("Error parsing time slot:", error, timeSlot);
      return { start: 0, end: 0, original: timeSlot };
    }
  };

  // Expand multi-hour slots into individual hour slots
  const expandTimeSlots = (schedules) => {
    const result = [];

    schedules.forEach(daySchedule => {
      const expandedSchedule = [];
      
      daySchedule.schedule.forEach(slot => {
        const parsedSlot = parseTimeSlot(slot.timeSlot);
        
        // If it's a multi-hour slot, create individual hour slots
        if (parsedSlot.end - parsedSlot.start > 1) {
          for (let i = parsedSlot.start; i < parsedSlot.end; i++) {
            const hourKey = Object.keys(timeFormats).find(k => timeFormats[k] === i);
            const nextHourKey = Object.keys(timeFormats).find(k => timeFormats[k] === i + 1);
            const hourSlot = `${hourKey} - ${nextHourKey}`;
            
            expandedSchedule.push({
              ...slot,
              timeSlot: hourSlot,
              isStartingSlot: i === parsedSlot.start,
              _id: `${slot._id}-${i}` // Generate unique ID for each expanded slot
            });
          }
        } else {
          // For one-hour slots, mark as starting slot
          expandedSchedule.push({
            ...slot,
            isStartingSlot: true
          });
        }
      });

      result.push({
        ...daySchedule,
        schedule: expandedSchedule
      });
    });

    return result;
  };

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const student = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");
        
        if (!student?.section) {
          setError("User section not found!");
          setLoading(false);
          return;
        }
        
        console.log("Fetching timetable for section:", student.section);
        
        const response = await axios.get(
          `http://localhost:5001/api/section-timetable/${student.section}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        setTimetable(response.data);
        
        // Process the timetable to handle multi-hour slots
        const expanded = expandTimeSlots(response.data);
        setProcessedTimetable(expanded);
        
        setError(null);
      } catch (error) {
        console.error("Error fetching timetable:", error);
        setError(error.response?.data?.message || "Error fetching timetable.");
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, []);

  // Helper function to find class for a specific day and time slot
  const getClassDetails = (day, timeSlot) => {
    const daySchedule = processedTimetable.find(schedule => schedule.day === day);
    if (!daySchedule) return null;
    
    return daySchedule.schedule.find(slot => slot.timeSlot === timeSlot);
  };

  // Helper to get consistent row span for multi-hour slots
  const getRowSpanIfNeeded = (day, timeSlot) => {
    // This function would calculate rowspan for slots that span multiple hours
    // but we're using a different approach with expanded slots instead
    return 1;
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Your Class Schedule</h1>
        <p className="subtitle">View your weekly timetable</p>
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
          No timetable available for your section. Please contact your administrator.
        </Alert>
      ) : (
        <div className="timetable-container">
          <Table bordered className="timetable-grid">
            <thead>
              <tr>
                <th style={{ width: "12%" }}>Time Slot</th>
                {days.map((day) => (
                  <th key={day} style={{ width: "17.6%" }}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((timeSlot) => (
                <tr key={timeSlot}>
                  <td className="time-slot">{timeSlot}</td>
                  {days.map((day) => {
                    const classDetails = getClassDetails(day, timeSlot);
                    
                    return (
                      <td 
                        key={`${day}-${timeSlot}`} 
                        className={classDetails ? "has-class" : ""}
                      >
                        {classDetails && (
                          <div className={`class-cell ${!classDetails.isStartingSlot ? 'continuation-cell' : ''}`}>
                            <div className="subject-name">{classDetails.subject}</div>
                            <div className="teacher-info">Teacher: {classDetails.teacherId}</div>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Inline Styles */}
      <style type="text/css">{`
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
        }
        
        .timetable-grid th {
          background-color: #5c3d2e;
          color: white;
          text-align: center;
          padding: 10px;
        }
        
        .time-slot {
          font-weight: bold;
          vertical-align: middle;
          text-align: center;
          background-color: #f8ece1;
          color: #5c3d2e;
        }
        
        .has-class {
          padding: 0;
          background-color: #fffbf6;
        }
        
        .class-cell {
          padding: 10px;
          height: 100%;
          border-left: 4px solid #8b5e3b;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .continuation-cell {
          background-color: #f8f1e9;
          border-left: 4px solid #8b5e3b;
          border-top: 1px dashed #8b5e3b;
        }
        
        .subject-name {
          font-weight: bold;
          color: #5c3d2e;
          margin-bottom: 4px;
        }
        
        .teacher-info {
          font-size: 0.9em;
          color: #8b5e3b;
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

export default StudentTimetable;


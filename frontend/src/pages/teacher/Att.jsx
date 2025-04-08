
// // import { useParams } from "react-router-dom";
// // import { useState, useEffect, useRef } from "react";
// // import '../../styles/Att.css';

// // const Att = () => {
// //   const { department, section, subjectId } = useParams();
// //   const [students, setStudents] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [randomCode, setRandomCode] = useState(null);
// //   const [timeLeft, setTimeLeft] = useState(0);
// //   const [codeActive, setCodeActive] = useState(false);
// //   const [manualMode, setManualMode] = useState(false);
// //   const [manualAttendance, setManualAttendance] = useState({});
// //   const [subjectName, setSubjectName] = useState("");
// //   const timerRef = useRef(null);

// //   useEffect(() => {
// //     const fetchStudents = async () => {
// //       const token = localStorage.getItem("token");
// //       if (!token) {
// //         setError("Authentication token not found");
// //         setLoading(false);
// //         return;
// //       }

// //       try {
// //         const response = await fetch(
// //           `http://localhost:5001/api/attendance/students?department=${department}&section=${section}`,
// //           {
// //             headers: { Authorization: `Bearer ${token}` },
// //           }
// //         );

// //         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
// //         const data = await response.json();

// //         const studentsWithStatus = data.map(student => ({
// //           ...student,
// //           attendanceStatus: 'pending'
// //         }));

// //         setStudents(studentsWithStatus);
// //       } catch (error) {
// //         console.error("Error fetching students:", error);
// //         setError("Failed to fetch students data");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchStudents();
// //   }, [department, section]);

// //   useEffect(() => {
// //     const fetchSubject = async () => {
// //       const token = localStorage.getItem("token");
// //       if (!token) return;

// //       try {
// //         const res = await fetch(`http://localhost:5001/api/subjects/${subjectId}`, {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //         if (res.ok) {
// //           const data = await res.json();
// //           setSubjectName(data.name);
// //         }
// //       } catch (err) {
// //         console.error("Error fetching subject name", err);
// //       }
// //     };

// //     fetchSubject();
// //   }, [subjectId]);

// //   const generateRandomCode = async () => {
// //     const token = localStorage.getItem("token");

// //     try {
// //       const response = await fetch("http://localhost:5001/api/attendance/generate-attendance-code", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}`,
// //         },
// //         body: JSON.stringify({
// //           subjectId: subjectId,
// //           department: department
// //         }),
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         throw new Error(errorData.message || "Failed to generate code");
// //       }

// //       const data = await response.json();
// //       setRandomCode(data.code);

// //       setTimeLeft(40);
// //       setCodeActive(true);

// //       if (timerRef.current) {
// //         clearInterval(timerRef.current);
// //       }

// //       timerRef.current = setInterval(() => {
// //         setTimeLeft(prev => {
// //           if (prev <= 1) {
// //             clearInterval(timerRef.current);
// //             setCodeActive(false);
// //             return 0;
// //           }
// //           return prev - 1;
// //         });
// //       }, 1000);

// //       setStudents(prev =>
// //         prev.map(student => ({
// //           ...student,
// //           attendanceStatus: 'pending'
// //         }))
// //       );

// //     } catch (error) {
// //       console.error("Error generating code:", error);
// //       setError("Failed to generate random code");
// //     }
// //   };

// //   const toggleManualAttendance = () => {
// //     setManualMode(prev => !prev);
// //     if (!manualMode) {
// //       const initialManualAttendance = {};
// //       students.forEach(student => {
// //         initialManualAttendance[student.studentId] = 'absent';
// //       });
// //       setManualAttendance(initialManualAttendance);
// //     }
// //   };

// //   const handleAttendanceChange = (studentId, status) => {
// //     setManualAttendance(prev => ({
// //       ...prev,
// //       [studentId]: status
// //     }));
// //   };

// //   const submitManualAttendance = async () => {
// //     const token = localStorage.getItem("token");
// //     if (!token) {
// //       setError("Authentication token not found");
// //       return;
// //     }

// //     try {
// //       const response = await fetch("http://localhost:5001/api/attendance/submit-manual-attendance", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}`,
// //         },
// //         body: JSON.stringify({
// //           subjectId: subjectId,
// //           attendance: manualAttendance,
// //           date: new Date().toISOString().split('T')[0]
// //         }),
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         throw new Error(errorData.message || "Failed to submit attendance");
// //       }

// //       const data = await response.json();

// //       setStudents(prev =>
// //         prev.map(student => ({
// //           ...student,
// //           attendanceStatus: manualAttendance[student.studentId] || 'absent'
// //         }))
// //       );

// //       setManualMode(false);
// //       alert("Attendance submitted successfully!");
// //     } catch (error) {
// //       console.error("Error submitting manual attendance:", error);
// //       setError("Failed to submit attendance");
// //     }
// //   };

// //   const cancelManualAttendance = () => {
// //     setManualMode(false);
// //     setManualAttendance({});
// //   };

// //   useEffect(() => {
// //     const checkAttendanceStatus = async () => {
// //       const token = localStorage.getItem("token");
// //       try {
// //         const response = await fetch(
// //           `http://localhost:5001/api/attendance/get-attendance-status?subjectId=${subjectId}&date=${new Date().toISOString().split('T')[0]}`,
// //           {
// //             headers: { Authorization: `Bearer ${token}` },
// //           }
// //         );

// //         if (response.ok) {
// //           const data = await response.json();

// //           setStudents(prevStudents =>
// //             prevStudents.map(student => {
// //               const matchingRecord = data.find(record => record.studentId === student.studentId);
// //               return {
// //                 ...student,
// //                 attendanceStatus: matchingRecord ? matchingRecord.status : 'pending'
// //               };
// //             })
// //           );
// //         }
// //       } catch (error) {
// //         console.error("Error checking attendance status:", error);
// //       }
// //     };

// //     if (!manualMode) {
// //       const intervalId = setInterval(checkAttendanceStatus, 2000);
// //       return () => clearInterval(intervalId);
// //     }
// //   }, [subjectId, manualMode]);

// //   useEffect(() => {
// //     return () => {
// //       if (timerRef.current) {
// //         clearInterval(timerRef.current);
// //       }
// //     };
// //   }, []);

// //   return (
// //     <div className="attendance-container">
// //       <h2>Attendance - {department} Section {section}</h2>
// //       <h3>Subject: {subjectName || subjectId}</h3>

// //       <div className="attendance-buttons">
// //         <button 
// //           onClick={generateRandomCode} 
// //           className="generate-btn"
// //           disabled={codeActive || manualMode}
// //         >
// //           {codeActive ? 'Code Active' : 'Generate Random Code'}
// //         </button>

// //         <button 
// //           onClick={toggleManualAttendance} 
// //           className={`manual-btn ${manualMode ? 'active' : ''}`}
// //           disabled={codeActive}
// //         >
// //           {manualMode ? 'Cancel Manual Mode' : 'Take Manual Attendance'}
// //         </button>

// //         {manualMode && (
// //           <button 
// //             onClick={submitManualAttendance} 
// //             className="submit-btn"
// //           >
// //             Submit Attendance
// //           </button>
// //         )}
// //       </div>

// //       {randomCode && !manualMode && (
// //         <div className="code-display">
// //           <h3>Attendance Code:</h3>
// //           <p className="code">{randomCode}</p>
// //           {codeActive ? (
// //             <p className="timer">Time Remaining: {timeLeft} seconds</p>
// //           ) : (
// //             <p className="timer expired">Code Expired</p>
// //           )}
// //           <p className="code-subject">For subject: {subjectName || subjectId}</p>
// //         </div>
// //       )}

// //       {error && <p className="error-message">{error}</p>}

// //       {loading ? (
// //         <p>Loading students...</p>
// //       ) : (
// //         <div className="students-list">
// //           <table>
// //             <thead>
// //               <tr>
// //                 <th>Student ID</th>
// //                 <th>Name</th>
// //                 {manualMode ? (
// //                   <th>Mark Attendance</th>
// //                 ) : (
// //                   <th>Attendance Status</th>
// //                 )}
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {students.map((student) => (
// //                 <tr key={student.studentId}>
// //                   <td>{student.studentId}</td>
// //                   <td>{student.name}</td>
// //                   {manualMode ? (
// //                     <td className="attendance-options">
// //                       <button 
// //                         className={`present-btn ${manualAttendance[student.studentId] === 'present' ? 'selected' : ''}`}
// //                         onClick={() => handleAttendanceChange(student.studentId, 'present')}
// //                       >
// //                         Present
// //                       </button>
// //                       <button 
// //                         className={`absent-btn ${manualAttendance[student.studentId] === 'absent' ? 'selected' : ''}`}
// //                         onClick={() => handleAttendanceChange(student.studentId, 'absent')}
// //                       >
// //                         Absent
// //                       </button>
// //                     </td>
// //                   ) : (
// //                     <td>
// //                       {student.attendanceStatus === 'present' ? (
// //                         <span className="status-marked">Present</span>
// //                       ) : student.attendanceStatus === 'absent' ? (
// //                         <span className="status-absent">Absent</span>
// //                       ) : (
// //                         <span className="status-pending">Pending</span>
// //                       )}
// //                     </td>
// //                   )}
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Att; 

import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import '../../styles/Att.css';

const Att = () => {
  const { department, section, subjectId } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [randomCode, setRandomCode] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [codeActive, setCodeActive] = useState(false);
  const [manualMode, setManualMode] = useState(false);
  const [manualAttendance, setManualAttendance] = useState({});
  const [subjectName, setSubjectName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const timerRef = useRef(null);
  const attendanceCheckIntervalRef = useRef(null);

  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token not found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5001/api/attendance/students?department=${department}&section=${section}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        const studentsWithStatus = data.map(student => ({
          ...student,
          attendanceStatus: 'pending'
        }));

        setStudents(studentsWithStatus);
      } catch (error) {
        console.error("Error fetching students:", error);
        setError("Failed to fetch students data");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [department, section]);

  useEffect(() => {
    const fetchSubject = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(`http://localhost:5001/api/subjects/${subjectId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setSubjectName(data.name);
        }
      } catch (err) {
        console.error("Error fetching subject name", err);
      }
    };

    fetchSubject();
  }, [subjectId]);

  const generateRandomCode = async () => {
    const token = localStorage.getItem("token");

    try {
      setError("");
      const response = await fetch("http://localhost:5001/api/attendance/generate-attendance-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subjectId: subjectId,
          department: department
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to generate code");
      }

      const data = await response.json();
      setRandomCode(data.code);

      setTimeLeft(40);
      setCodeActive(true);

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setCodeActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Start checking attendance status immediately after generating code
      checkAttendanceStatus();
    } catch (error) {
      console.error("Error generating code:", error);
      setError("Failed to generate random code");
    }
  };

  // Synchronize manual attendance with current student statuses
  const toggleManualAttendance = () => {
    if (!manualMode) {
      // When switching TO manual mode, initialize with current student statuses
      const initialManualAttendance = {};
      students.forEach(student => {
        initialManualAttendance[student.studentId] = student.attendanceStatus === 'pending' ? 
          'absent' : student.attendanceStatus;
      });
      setManualAttendance(initialManualAttendance);
    } else {
      // When switching FROM manual mode WITHOUT submitting,
      // discard changes and revert to previous state
      // (The state is already maintained in the students array)
    }
    setManualMode(prev => !prev);
  };

  const handleAttendanceChange = (studentId, status) => {
    setManualAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
    
    // Immediately update the student list to reflect the change visually
    // This makes the change visible even without submitting
    setStudents(prev =>
      prev.map(student => 
        student.studentId === studentId ? 
          { ...student, attendanceStatus: status } : 
          student
      )
    );
  };

  const submitManualAttendance = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication token not found");
      return;
    }

    try {
      setError("");
      const response = await fetch("http://localhost:5001/api/attendance/submit-manual-attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subjectId: subjectId,
          attendance: manualAttendance,
          date: new Date().toISOString().split('T')[0]
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit attendance");
      }

      await response.json();

      // Students state is already updated in handleAttendanceChange,
      // so we don't need to update it again here

      setManualMode(false);
      setSuccessMessage("Attendance submitted successfully!");
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error submitting manual attendance:", error);
      setError("Failed to submit attendance");
    }
  };

  const cancelManualAttendance = () => {
    // When canceling manual mode, reload the actual attendance status from server
    setManualMode(false);
    setManualAttendance({});
    checkAttendanceStatus();
  };

  const checkAttendanceStatus = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:5001/api/attendance/get-attendance-status?subjectId=${subjectId}&date=${new Date().toISOString().split('T')[0]}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        const data = await response.json();

        setStudents(prevStudents =>
          prevStudents.map(student => {
            const matchingRecord = data.find(record => record.studentId === student.studentId);
            return {
              ...student,
              attendanceStatus: matchingRecord ? matchingRecord.status : 'pending'
            };
          })
        );
      }
    } catch (error) {
      console.error("Error checking attendance status:", error);
    }
  };

  // Setup polling interval for attendance status when not in manual mode
  useEffect(() => {
    if (!manualMode) {
      // Check immediately when switching from manual to random mode
      checkAttendanceStatus();
      
      // Setup interval for periodic checks
      attendanceCheckIntervalRef.current = setInterval(checkAttendanceStatus, 2000);
      return () => clearInterval(attendanceCheckIntervalRef.current);
    } else {
      // Clear interval when in manual mode
      if (attendanceCheckIntervalRef.current) {
        clearInterval(attendanceCheckIntervalRef.current);
      }
    }
  }, [subjectId, manualMode]);

  // Clean up timers when component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (attendanceCheckIntervalRef.current) {
        clearInterval(attendanceCheckIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="attendance-container">
      <h2>Attendance - {department} Section {section}</h2>
      <h3>Subject: {subjectName || subjectId}</h3>

      <div className="attendance-buttons">
        <button 
          onClick={generateRandomCode} 
          className="generate-btn"
          disabled={codeActive || manualMode}
        >
          {codeActive ? 'Code Active' : 'Generate Random Code'}
        </button>

        <button 
          onClick={toggleManualAttendance} 
          className={`manual-btn ${manualMode ? 'active' : ''}`}
          disabled={codeActive}
        >
          {manualMode ? 'Exit Manual Mode' : 'Take Manual Attendance'}
        </button>

        {manualMode && (
          <>
            <button 
              onClick={submitManualAttendance} 
              className="submit-btn"
            >
              Submit Attendance
            </button>
            <button 
              onClick={cancelManualAttendance} 
              className="cancel-btn"
            >
              Reset
            </button>
          </>
        )}
      </div>

      {manualMode && (
        <div className="mode-indicator">
          Manual Attendance Mode
        </div>
      )}

      {successMessage && (
        <div className="success-message">
          <span className="success-icon">✓</span> {successMessage}
        </div>
      )}

      {randomCode && !manualMode && (
        <div className="code-display">
          <h3>Attendance Code:</h3>
          <p className="code">{randomCode}</p>
          {codeActive ? (
            <p className="timer">
              <span className="timer-pulse"></span> Time Remaining: {timeLeft} seconds
            </p>
          ) : (
            <p className="timer expired">Code Expired</p>
          )}
          <p className="code-subject">For subject: {subjectName || subjectId}</p>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <div className="loading">
          <div className="loading-spinner"></div>
          Loading students...
        </div>
      ) : (
        <div className="students-list">
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                {manualMode ? (
                  <th>Mark Attendance</th>
                ) : (
                  <th>Attendance Status</th>
                )}
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.studentId}>
                  <td>{student.studentId}</td>
                  <td>{student.name}</td>
                  {manualMode ? (
                    <td className="attendance-options">
                      <button 
                        className={`present-btn ${manualAttendance[student.studentId] === 'present' ? 'selected' : ''}`}
                        onClick={() => handleAttendanceChange(student.studentId, 'present')}
                      >
                        Present
                      </button>
                      <button 
                        className={`absent-btn ${manualAttendance[student.studentId] === 'absent' ? 'selected' : ''}`}
                        onClick={() => handleAttendanceChange(student.studentId, 'absent')}
                      >
                        Absent
                      </button>
                    </td>
                  ) : (
                    <td>
                      {student.attendanceStatus === 'present' ? (
                        <span className="status-marked">Present</span>
                      ) : student.attendanceStatus === 'absent' ? (
                        <span className="status-absent">Absent</span>
                      ) : (
                        <span className="status-pending">Pending</span>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Att;

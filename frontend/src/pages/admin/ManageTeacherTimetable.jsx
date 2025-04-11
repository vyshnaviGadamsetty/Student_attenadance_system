
// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import { Table, Button, Modal, Form } from "react-bootstrap";

// const ManageTeacherTimetable = () => {
//   const [timetables, setTimetables] = useState([]);
//   const [subjectsList, setSubjectsList] = useState([]);
//   const [teachersList, setTeachersList] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentTimetableId, setCurrentTimetableId] = useState(null);
//   const [selectedTeacherId, setSelectedTeacherId] = useState("");
//   const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"

//   const [timetableData, setTimetableData] = useState({
//     teacherId: "",
//     section: "",
//     subjectId: "",
//     day: "",
//     timeSlot: "",
//   });

//   // Base one-hour interval time slots
//   const baseTimeSlots = [
//     "9:00 - 10:00 AM",
//     "10:00 - 11:00 AM", 
//     "11:00 - 12:00 PM",
//     "12:00 - 1:00 PM",
//     "1:00 - 2:00 PM",
//     "2:00 - 3:00 PM",
//     "3:00 - 4:00 PM"
//   ];

//   // Time formats reference for conversion
//   const timeFormats = {
//     "9:00": 9,
//     "10:00": 10,
//     "11:00": 11,
//     "12:00": 12,
//     "1:00": 13,
//     "2:00": 14,
//     "3:00": 15,
//     "4:00": 16,
//     "5:00": 17
//   };

//   // Generate all possible 2-hour combinations
//   const generateTwoHourSlots = () => {
//     const twoHourSlots = [];
//     for (let i = 0; i < baseTimeSlots.length - 1; i++) {
//       const startTime = baseTimeSlots[i].split(" - ")[0];
//       const endTime = baseTimeSlots[i + 1].split(" - ")[1];
//       twoHourSlots.push(`${startTime} - ${endTime} (2 hours)`);
//     }
//     return twoHourSlots;
//   };

//   // Combine 1-hour and 2-hour slots for the dropdown
//   const allTimeSlots = [...baseTimeSlots, ...generateTwoHourSlots()];
  
//   // For the grid view, we'll still use the 1-hour slots as the base
//   const timeSlots = baseTimeSlots;
//   const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

//   useEffect(() => {
//     fetchSubjects();
//     fetchTeachers();
//     fetchTimetables();
//   }, []);

//   const fetchTimetables = async () => {
//     try {
//       const response = await axiosInstance.get("/timetable");
//       setTimetables(response.data);
//     } catch (error) {
//       console.error("Error fetching timetables:", error);
//     }
//   };

//   const fetchSubjects = async () => {
//     try {
//       const response = await axiosInstance.get("/subjects");
//       setSubjectsList(response.data);
//     } catch (error) {
//       console.error("Error fetching subjects:", error);
//     }
//   };

//   const fetchTeachers = async () => {
//     try {
//       const response = await axiosInstance.get("/teachers");
//       setTeachersList(response.data);
//     } catch (error) {
//       console.error("Error fetching teachers:", error);
//     }
//   };

//   const handleChange = (e) => {
//     setTimetableData({ ...timetableData, [e.target.name]: e.target.value });
//   };

//   const addTimetable = async () => {
//     if (!timetableData.teacherId || !timetableData.section || !timetableData.subjectId || !timetableData.day || !timetableData.timeSlot) {
//       alert("All fields are required.");
//       return;
//     }

//     try {
//       const response = await axiosInstance.post("/timetable", timetableData);
//       setTimetables([...timetables, response.data.timetable]);
//       resetForm();
//     } catch (error) {
//       alert("Error adding timetable: " + error.response?.data?.message || error.message);
//       console.error("Error adding timetable:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this timetable?")) {
//       try {
//         await axiosInstance.delete(`/timetable/${id}`);
//         setTimetables(timetables.filter((timetable) => timetable._id !== id));
//       } catch (error) {
//         alert("Error deleting timetable: " + error.response?.data?.message || error.message);
//         console.error("Error deleting timetable:", error);
//       }
//     }
//   };

//   const handleEdit = (timetable) => {
//     setIsEditing(true);
//     setCurrentTimetableId(timetable._id);
//     setTimetableData({
//       teacherId: timetable.teacherId,
//       section: timetable.section,
//       subjectId: timetable.subjectId,
//       day: timetable.day,
//       timeSlot: timetable.timeSlot,
//     });
//     setShowModal(true);
//   };

//   const updateTimetable = async () => {
//     try {
//       const response = await axiosInstance.put(`/timetable/${currentTimetableId}`, timetableData);
//       setTimetables(
//         timetables.map((timetable) =>
//           timetable._id === currentTimetableId ? { ...timetable, ...response.data.timetable } : timetable
//         )
//       );
//       resetForm();
//     } catch (error) {
//       alert("Error updating timetable: " + error.response?.data?.message || error.message);
//       console.error("Error updating timetable:", error);
//     }
//   };

//   const resetForm = () => {
//     setShowModal(false);
//     setIsEditing(false);
//     setTimetableData({
//       teacherId: "",
//       section: "",
//       subjectId: "",
//       day: "",
//       timeSlot: "",
//     });
//   };

//   // Filter timetables by teacherId if provided
//   const filteredTimetables = timetables.filter((timetable) => {
//     if (selectedTeacherId) {
//       return timetable.teacherId === selectedTeacherId;
//     }
//     return timetable.teacherId.toLowerCase().includes(searchQuery.toLowerCase());
//   });

//   // Standardize time format (convert to 24-hour format for comparison)
//   const standardizeTime = (timeStr) => {
//     // Remove any extra spaces
//     timeStr = timeStr.trim();
    
//     // Extract hours and AM/PM
//     let hours = timeStr.split(':')[0].trim();
//     const isPM = timeStr.toLowerCase().includes('pm') && parseInt(hours) < 12;
    
//     // Get the numeric hour value
//     if (timeFormats[timeStr.split(' ')[0]]) {
//       return timeFormats[timeStr.split(' ')[0]];
//     }
    
//     // Convert to 24-hour format if needed
//     let hourNum = parseInt(hours);
//     if (isPM) {
//       hourNum += 12;
//     }
    
//     return hourNum;
//   };

//   // Parse a time slot to get start and end times
//   const parseTimeSlot = (timeSlot) => {
//     try {
//       // Remove the "(2 hours)" suffix if present
//       const slotText = timeSlot.replace(" (2 hours)", "");
      
//       // Split into start and end times
//       const [startTimeStr, endTimeStr] = slotText.split(" - ").map(t => t.trim());
      
//       // Handle AM/PM if not specified in start time
//       let startTime = startTimeStr;
//       if (!startTimeStr.toLowerCase().includes('am') && !startTimeStr.toLowerCase().includes('pm')) {
//         if (endTimeStr.toLowerCase().includes('am')) {
//           startTime += ' AM';
//         } else if (endTimeStr.toLowerCase().includes('pm')) {
//           startTime += ' PM';
//         }
//       }
      
//       // Convert to standardized time
//       return {
//         start: standardizeTime(startTime),
//         end: standardizeTime(endTimeStr),
//         original: timeSlot
//       };
//     } catch (error) {
//       console.error("Error parsing time slot:", error, timeSlot);
//       return { start: 0, end: 0, original: timeSlot };
//     }
//   };

//   // Check if a time slot overlaps with another
//   const timeSlotOverlaps = (slot1, slot2) => {
//     const time1 = parseTimeSlot(slot1);
//     const time2 = parseTimeSlot(slot2);
    
//     // True overlap: one starts before the other ends
//     return time1.start < time2.end && time1.end > time2.start;
//   };
  
//   // Get the duration of a time slot in hours
//   const getSlotDuration = (timeSlot) => {
//     if (timeSlot.includes('(2 hours)')) {
//       return 2;
//     }
//     const parsed = parseTimeSlot(timeSlot);
//     // Calculate duration based on start and end times
//     return parsed.end - parsed.start;
//   };

//   // Check if this is the starting time of a class
//   const isStartingTimeSlot = (classSlot, gridSlot) => {
//     const classTime = parseTimeSlot(classSlot);
//     const gridTime = parseTimeSlot(gridSlot);
    
//     // Match the starting hours
//     return classTime.start === gridTime.start;
//   };

//   // Get class details for a specific day and time slot
//   const getClassDetails = (day, timeSlot) => {
//     // Find any class that overlaps with this time slot on this day
//     const matchingClass = filteredTimetables.find(timetable => 
//       timetable.day === day && timeSlotOverlaps(timetable.timeSlot, timeSlot)
//     );
    
//     if (matchingClass) {
//       // Check if this is the starting time slot of the class
//       const isStarting = isStartingTimeSlot(matchingClass.timeSlot, timeSlot);
//       const duration = getSlotDuration(matchingClass.timeSlot);
      
//       return {
//         subject: matchingClass.subjectId?.name || "Unknown",
//         section: matchingClass.section,
//         id: matchingClass._id,
//         timeSlot: matchingClass.timeSlot,
//         isStartingSlot: isStarting,
//         duration: duration
//       };
//     }
    
//     return null;
//   };

//   // Helper to find the subject name
//   const getSubjectName = (subjectId) => {
//     const subject = subjectsList.find(s => s._id === subjectId);
//     return subject ? subject.name : "Unknown";
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Manage Teacher Timetable</h2>
      
//       <div className="d-flex justify-content-between mb-3">
//         <div className="flex-grow-1 me-2">
//           {viewMode === "grid" ? (
//             <Form.Select 
//               value={selectedTeacherId} 
//               onChange={(e) => setSelectedTeacherId(e.target.value)}
//               className="mb-3"
//             >
//               <option value="">Select Teacher</option>
//               {teachersList.map((teacher) => (
//                 <option key={teacher._id} value={teacher.teacherId}>
//                   {teacher.name} ({teacher.teacherId})
//                 </option>
//               ))}
//             </Form.Select>
//           ) : (
//             <Form.Control
//               type="text"
//               placeholder="Search by Teacher ID"
//               className="mb-3"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           )}
//         </div>
//         <div>
//           <Button 
//             variant="outline-secondary" 
//             className="me-2"
//             onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
//           >
//             {viewMode === "grid" ? "List View" : "Timetable View"}
//           </Button>
//           <Button onClick={() => setShowModal(true)}>
//             Add Timetable
//           </Button>
//         </div>
//       </div>

//       {/* Grid/Timetable View */}
//       {viewMode === "grid" && (
//         <div className="timetable-container">
//           <Table bordered className="timetable-grid">
//             <thead>
//               <tr>
//                 <th style={{ width: "12%" }}>Time Slot</th>
//                 {days.map((day) => (
//                   <th key={day} style={{ width: "17.6%" }}>{day}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {timeSlots.map((timeSlot) => (
//                 <tr key={timeSlot}>
//                   <td className="time-slot">{timeSlot}</td>
//                   {days.map((day) => {
//                     const classDetails = getClassDetails(day, timeSlot);
//                     const cellClass = classDetails 
//                       ? `has-class ${!classDetails.isStartingSlot ? 'continuation' : ''}`
//                       : "";
                      
//                     return (
//                       <td key={`${day}-${timeSlot}`} className={cellClass}>
//                         {classDetails ? (
//                           <div className="class-cell">
//                             <div className="subject-name">{classDetails.subject}</div>
//                             <div className="section-name">{classDetails.section}</div>
//                             <div className="time-display">{classDetails.timeSlot}</div>
//                             {classDetails.isStartingSlot && (
//                               <div className="actions mt-1">
//                                 <Button 
//                                   variant="warning" 
//                                   size="sm" 
//                                   className="me-1 py-0 px-1"
//                                   onClick={() => {
//                                     const timetable = filteredTimetables.find(t => t._id === classDetails.id);
//                                     if (timetable) handleEdit(timetable);
//                                   }}
//                                 >
//                                   Edit
//                                 </Button>
//                                 <Button 
//                                   variant="danger" 
//                                   size="sm" 
//                                   className="py-0 px-1"
//                                   onClick={() => handleDelete(classDetails.id)}
//                                 >
//                                   Delete
//                                 </Button>
//                               </div>
//                             )}
//                           </div>
//                         ) : null}
//                       </td>
//                     );
//                   })}
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>
//       )}

//       {/* List View (Original Table) */}
//       {viewMode === "list" && (
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Teacher ID</th>
//               <th>Section</th>
//               <th>Subject</th>
//               <th>Day</th>
//               <th>Time Slot</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredTimetables.map((timetable) => (
//               <tr key={timetable._id}>
//                 <td>{timetable.teacherId}</td>
//                 <td>{timetable.section}</td>
//                 <td>{getSubjectName(timetable.subjectId)}</td>
//                 <td>{timetable.day}</td>
//                 <td>{timetable.timeSlot}</td>
//                 <td>
//                   <Button variant="warning" className="me-2" onClick={() => handleEdit(timetable)}>
//                     Edit
//                   </Button>
//                   <Button variant="danger" onClick={() => handleDelete(timetable._id)}>
//                     Delete
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}

//       {/* Add/Edit Modal */}
//       <Modal show={showModal} onHide={resetForm}>
//         <Modal.Header closeButton>
//           <Modal.Title>{isEditing ? "Edit Timetable" : "Add Timetable"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-2">
//               <Form.Label>Teacher</Form.Label>
//               <Form.Select name="teacherId" value={timetableData.teacherId} onChange={handleChange}>
//                 <option value="">Select a teacher</option>
//                 {teachersList.map((teacher) => (
//                   <option key={teacher._id} value={teacher.teacherId}>{teacher.name}</option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Label>Section</Form.Label>
//               <Form.Control type="text" name="section" value={timetableData.section} onChange={handleChange} />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Label>Subject</Form.Label>
//               <Form.Select name="subjectId" value={timetableData.subjectId} onChange={handleChange}>
//                 <option value="">Select a subject</option>
//                 {subjectsList.map((subject) => (
//                   <option key={subject._id} value={subject._id}>{subject.name}</option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Label>Day</Form.Label>
//               <Form.Select name="day" value={timetableData.day} onChange={handleChange}>
//                 <option value="">Select a day</option>
//                 {days.map((day) => (
//                   <option key={day} value={day}>{day}</option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Label>Time Slot</Form.Label>
//               <Form.Select name="timeSlot" value={timetableData.timeSlot} onChange={handleChange}>
//                 <option value="">Select a time slot</option>
//                 {/* 1-hour slots */}
//                 <optgroup label="1-Hour Slots">
//                   {baseTimeSlots.map((slot) => (
//                     <option key={slot} value={slot}>{slot}</option>
//                   ))}
//                 </optgroup>
//                 {/* 2-hour slots */}
//                 <optgroup label="2-Hour Slots">
//                   {generateTwoHourSlots().map((slot) => (
//                     <option key={slot} value={slot}>{slot}</option>
//                   ))}
//                 </optgroup>
//               </Form.Select>
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={resetForm}>Close</Button>
//           <Button variant="primary" onClick={isEditing ? updateTimetable : addTimetable}>
//             {isEditing ? "Update" : "Save"}
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Add custom CSS */}
//       <style jsx>{`
//         .timetable-grid {
//           table-layout: fixed;
//         }
//         .time-slot {
//           font-weight: bold;
//           vertical-align: middle;
//         }
//         .has-class {
//           background-color: #e3f2fd;
//           padding: 0;
//           position: relative;
//         }
//         .continuation {
//           border-top: 1px dashed #90caf9;
//         }
//         .continuation .subject-name {
//           font-style: italic;
//         }
//         .class-cell {
//           padding: 8px;
//         }
//         .subject-name {
//           font-weight: bold;
//           color: #1565c0;
//         }
//         .section-name {
//           font-size: 0.9em;
//           color: #546e7a;
//         }
//         .time-display {
//           font-size: 0.8em;
//           color: #78909c;
//           font-style: italic;
//         }
//         .actions {
//           display: flex;
//           justify-content: flex-end;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ManageTeacherTimetable;

import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Table, Button, Modal, Form } from "react-bootstrap";
import "../../styles/AdminShared.css";
const ManageTeacherTimetable = () => {
  const [timetables, setTimetables] = useState([]);
  const [subjectsList, setSubjectsList] = useState([]);
  const [teachersList, setTeachersList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTimetableId, setCurrentTimetableId] = useState(null);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"

  const [timetableData, setTimetableData] = useState({
    teacherId: "",
    section: "",
    subjectId: "",
    day: "",
    timeSlot: "",
  });

  // Base one-hour interval time slots
  const baseTimeSlots = [
    "9:00 - 10:00 AM",
    "10:00 - 11:00 AM", 
    "11:00 - 12:00 PM",
    "12:00 - 1:00 PM",
    "1:00 - 2:00 PM",
    "2:00 - 3:00 PM",
    "3:00 - 4:00 PM"
  ];

  // Time formats reference for conversion
  const timeFormats = {
    "9:00": 9,
    "10:00": 10,
    "11:00": 11,
    "12:00": 12,
    "1:00": 13,
    "2:00": 14,
    "3:00": 15,
    "4:00": 16,
    "5:00": 17
  };

  // Generate all possible 2-hour combinations
  const generateTwoHourSlots = () => {
    const twoHourSlots = [];
    for (let i = 0; i < baseTimeSlots.length - 1; i++) {
      const startTime = baseTimeSlots[i].split(" - ")[0];
      const endTime = baseTimeSlots[i + 1].split(" - ")[1];
      twoHourSlots.push(`${startTime} - ${endTime} (2 hours)`);
    }
    return twoHourSlots;
  };

  // Combine 1-hour and 2-hour slots for the dropdown
  const allTimeSlots = [...baseTimeSlots, ...generateTwoHourSlots()];
  
  // For the grid view, we'll still use the 1-hour slots as the base
  const timeSlots = baseTimeSlots;
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  useEffect(() => {
    fetchSubjects();
    fetchTeachers();
    fetchTimetables();
  }, []);

  const fetchTimetables = async () => {
    try {
      const response = await axiosInstance.get("/timetable");
      setTimetables(response.data);
    } catch (error) {
      console.error("Error fetching timetables:", error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await axiosInstance.get("/subjects");
      setSubjectsList(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await axiosInstance.get("/teachers");
      setTeachersList(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const handleChange = (e) => {
    setTimetableData({ ...timetableData, [e.target.name]: e.target.value });
  };

  const addTimetable = async () => {
    if (!timetableData.teacherId || !timetableData.section || !timetableData.subjectId || !timetableData.day || !timetableData.timeSlot) {
      alert("All fields are required.");
      return;
    }

    try {
      const response = await axiosInstance.post("/timetable", timetableData);
      setTimetables([...timetables, response.data.timetable]);
      resetForm();
    } catch (error) {
      alert("Error adding timetable: " + error.response?.data?.message || error.message);
      console.error("Error adding timetable:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this timetable?")) {
      try {
        await axiosInstance.delete(`/timetable/${id}`);
        setTimetables(timetables.filter((timetable) => timetable._id !== id));
      } catch (error) {
        alert("Error deleting timetable: " + error.response?.data?.message || error.message);
        console.error("Error deleting timetable:", error);
      }
    }
  };

  const handleEdit = (timetable) => {
    setIsEditing(true);
    setCurrentTimetableId(timetable._id);
    setTimetableData({
      teacherId: timetable.teacherId,
      section: timetable.section,
      subjectId: timetable.subjectId,
      day: timetable.day,
      timeSlot: timetable.timeSlot,
    });
    setShowModal(true);
  };

  const updateTimetable = async () => {
    try {
      const response = await axiosInstance.put(`/timetable/${currentTimetableId}`, timetableData);
      setTimetables(
        timetables.map((timetable) =>
          timetable._id === currentTimetableId ? { ...timetable, ...response.data.timetable } : timetable
        )
      );
      resetForm();
    } catch (error) {
      alert("Error updating timetable: " + error.response?.data?.message || error.message);
      console.error("Error updating timetable:", error);
    }
  };

  const resetForm = () => {
    setShowModal(false);
    setIsEditing(false);
    setTimetableData({
      teacherId: "",
      section: "",
      subjectId: "",
      day: "",
      timeSlot: "",
    });
  };

  // Filter timetables by teacherId if provided
  const filteredTimetables = timetables.filter((timetable) => {
    if (selectedTeacherId) {
      return timetable.teacherId === selectedTeacherId;
    }
    return timetable.teacherId.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Standardize time format (convert to 24-hour format for comparison)
  const standardizeTime = (timeStr) => {
    // Remove any extra spaces
    timeStr = timeStr.trim();
    
    // Extract hours and AM/PM
    let hours = timeStr.split(':')[0].trim();
    const isPM = timeStr.toLowerCase().includes('pm') && parseInt(hours) < 12;
    
    // Get the numeric hour value
    if (timeFormats[timeStr.split(' ')[0]]) {
      return timeFormats[timeStr.split(' ')[0]];
    }
    
    // Convert to 24-hour format if needed
    let hourNum = parseInt(hours);
    if (isPM) {
      hourNum += 12;
    }
    
    return hourNum;
  };

  // Parse a time slot to get start and end times
  const parseTimeSlot = (timeSlot) => {
    try {
      // Remove the "(2 hours)" suffix if present
      const slotText = timeSlot.replace(" (2 hours)", "");
      
      // Split into start and end times
      const [startTimeStr, endTimeStr] = slotText.split(" - ").map(t => t.trim());
      
      // Handle AM/PM if not specified in start time
      let startTime = startTimeStr;
      if (!startTimeStr.toLowerCase().includes('am') && !startTimeStr.toLowerCase().includes('pm')) {
        if (endTimeStr.toLowerCase().includes('am')) {
          startTime += ' AM';
        } else if (endTimeStr.toLowerCase().includes('pm')) {
          startTime += ' PM';
        }
      }
      
      // Convert to standardized time
      return {
        start: standardizeTime(startTime),
        end: standardizeTime(endTimeStr),
        original: timeSlot
      };
    } catch (error) {
      console.error("Error parsing time slot:", error, timeSlot);
      return { start: 0, end: 0, original: timeSlot };
    }
  };

  // Check if a time slot overlaps with another
  const timeSlotOverlaps = (slot1, slot2) => {
    const time1 = parseTimeSlot(slot1);
    const time2 = parseTimeSlot(slot2);
    
    // True overlap: one starts before the other ends
    return time1.start < time2.end && time1.end > time2.start;
  };
  
  // Get the duration of a time slot in hours
  const getSlotDuration = (timeSlot) => {
    if (timeSlot.includes('(2 hours)')) {
      return 2;
    }
    const parsed = parseTimeSlot(timeSlot);
    // Calculate duration based on start and end times
    return parsed.end - parsed.start;
  };

  // Check if this is the starting time of a class
  const isStartingTimeSlot = (classSlot, gridSlot) => {
    const classTime = parseTimeSlot(classSlot);
    const gridTime = parseTimeSlot(gridSlot);
    
    // Match the starting hours
    return classTime.start === gridTime.start;
  };

  // Get class details for a specific day and time slot
  const getClassDetails = (day, timeSlot) => {
    // Find any class that overlaps with this time slot on this day
    const matchingClass = filteredTimetables.find(timetable => 
      timetable.day === day && timeSlotOverlaps(timetable.timeSlot, timeSlot)
    );
    
    if (matchingClass) {
      // Check if this is the starting time slot of the class
      const isStarting = isStartingTimeSlot(matchingClass.timeSlot, timeSlot);
      const duration = getSlotDuration(matchingClass.timeSlot);
      
      return {
        subject: getSubjectName(matchingClass.subjectId), // Using the same getSubjectName function for consistency
        section: matchingClass.section,
        id: matchingClass._id,
        timeSlot: matchingClass.timeSlot,
        isStartingSlot: isStarting,
        duration: duration
      };
    }
    
    return null;
  };

  // Improved helper to find the subject name - handles both object and ID
  const getSubjectName = (subjectId) => {
    // If subjectId is already an object with a name property, return that
    if (subjectId && typeof subjectId === 'object' && subjectId.name) {
      return subjectId.name;
    }
    // Otherwise, find the subject by ID
    const subject = subjectsList.find(s => s._id === subjectId);
    return subject ? subject.name : "Unknown";
  };

  return (
    <div className="container mt-4">
      <h2>Manage Teacher Timetable</h2>
      
      <div className="d-flex justify-content-between mb-3">
        <div className="flex-grow-1 me-2">
          {viewMode === "grid" ? (
            <Form.Select 
              value={selectedTeacherId} 
              onChange={(e) => setSelectedTeacherId(e.target.value)}
              className="mb-3"
            >
              <option value="">Select Teacher</option>
              {teachersList.map((teacher) => (
                <option key={teacher._id} value={teacher.teacherId}>
                  {teacher.name} ({teacher.teacherId})
                </option>
              ))}
            </Form.Select>
          ) : (
            <Form.Control
              type="text"
              placeholder="Search by Teacher ID"
              className="mb-3"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          )}
        </div>
        <div>
          <Button 
            variant="outline-secondary" 
            className="me-2"
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          >
            {viewMode === "grid" ? "List View" : "Timetable View"}
          </Button>
          <Button onClick={() => setShowModal(true)}>
            Add Timetable
          </Button>
        </div>
      </div>

      {/* Grid/Timetable View */}
      {viewMode === "grid" && (
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
                    const cellClass = classDetails 
                      ? `has-class ${!classDetails.isStartingSlot ? 'continuation' : ''}`
                      : "";
                      
                    return (
                      <td key={`${day}-${timeSlot}`} className={cellClass}>
                        {classDetails ? (
                          <div className="class-cell">
                            <div className="subject-name">{classDetails.subject}</div>
                            <div className="section-name">{classDetails.section}</div>
                            <div className="time-display">{classDetails.timeSlot}</div>
                            {classDetails.isStartingSlot && (
                              <div className="actions mt-1">
                                <Button 
                                  variant="warning" 
                                  size="sm" 
                                  className="me-1 py-0 px-1"
                                  onClick={() => {
                                    const timetable = filteredTimetables.find(t => t._id === classDetails.id);
                                    if (timetable) handleEdit(timetable);
                                  }}
                                >
                                  Edit
                                </Button>
                                <Button 
                                  variant="danger" 
                                  size="sm" 
                                  className="py-0 px-1"
                                  onClick={() => handleDelete(classDetails.id)}
                                >
                                  Delete
                                </Button>
                              </div>
                            )}
                          </div>
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* List View (Original Table) */}
      {viewMode === "list" && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Teacher ID</th>
              <th>Section</th>
              <th>Subject</th>
              <th>Day</th>
              <th>Time Slot</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTimetables.map((timetable) => (
              <tr key={timetable._id}>
                <td>{timetable.teacherId}</td>
                <td>{timetable.section}</td>
                <td>{getSubjectName(timetable.subjectId)}</td>
                <td>{timetable.day}</td>
                <td>{timetable.timeSlot}</td>
                <td>
                  <Button variant="warning" className="me-2" onClick={() => handleEdit(timetable)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(timetable._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={resetForm}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Timetable" : "Add Timetable"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Teacher</Form.Label>
              <Form.Select name="teacherId" value={timetableData.teacherId} onChange={handleChange}>
                <option value="">Select a teacher</option>
                {teachersList.map((teacher) => (
                  <option key={teacher._id} value={teacher.teacherId}>{teacher.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Section</Form.Label>
              <Form.Control type="text" name="section" value={timetableData.section} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Subject</Form.Label>
              <Form.Select name="subjectId" value={timetableData.subjectId} onChange={handleChange}>
                <option value="">Select a subject</option>
                {subjectsList.map((subject) => (
                  <option key={subject._id} value={subject._id}>{subject.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Day</Form.Label>
              <Form.Select name="day" value={timetableData.day} onChange={handleChange}>
                <option value="">Select a day</option>
                {days.map((day) => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Time Slot</Form.Label>
              <Form.Select name="timeSlot" value={timetableData.timeSlot} onChange={handleChange}>
                <option value="">Select a time slot</option>
                {/* 1-hour slots */}
                <optgroup label="1-Hour Slots">
                  {baseTimeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </optgroup>
                {/* 2-hour slots */}
                <optgroup label="2-Hour Slots">
                  {generateTwoHourSlots().map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </optgroup>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={resetForm}>Close</Button>
          <Button variant="primary" onClick={isEditing ? updateTimetable : addTimetable}>
            {isEditing ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add custom CSS */}
      <style jsx>{`
        .timetable-grid {
          table-layout: fixed;
        }
        .time-slot {
          font-weight: bold;
          vertical-align: middle;
        }
        .has-class {
          background-color: #e3f2fd;
          padding: 0;
          position: relative;
        }
        .continuation {
          border-top: 1px dashed #90caf9;
        }
        .continuation .subject-name {
          font-style: italic;
        }
        .class-cell {
          padding: 8px;
        }
        .subject-name {
          font-weight: bold;
          color: #1565c0;
        }
        .section-name {
          font-size: 0.9em;
          color: #546e7a;
        }
        .time-display {
          font-size: 0.8em;
          color: #78909c;
          font-style: italic;
        }
        .actions {
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </div>
  );
};

export default ManageTeacherTimetable;
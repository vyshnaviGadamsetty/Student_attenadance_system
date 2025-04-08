// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import { Table, Button, Modal, Form } from "react-bootstrap";

// const ManageSectionTimetable = () => {
//   const [timetables, setTimetables] = useState([]);
//   const [subjectsList, setSubjectsList] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [viewMode, setViewMode] = useState("grid");

//   const [timetableData, setTimetableData] = useState({
//     section: "",
//     day: "",
//     schedule: []
//   });

//   const baseTimeSlots = [
//     "9:00 - 10:00 AM",
//     "10:00 - 11:00 AM", 
//     "11:00 - 12:00 PM",
//     "12:00 - 1:00 PM",
//     "1:00 - 2:00 PM",
//     "2:00 - 3:00 PM",
//     "3:00 - 4:00 PM"
//   ];

//   const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

//   useEffect(() => {
//     fetchSubjects();
//     fetchTimetables();
//   }, []);

//   const fetchTimetables = async () => {
//     try {
//       const response = await axiosInstance.get("/section-timetable");
//       setTimetables(response.data);
//     } catch (error) {
//       console.error("Error fetching section timetables:", error);
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

//   const handleChange = (e) => {
//     setTimetableData({ ...timetableData, [e.target.name]: e.target.value });
//   };

//   const addScheduleSlot = () => {
//     const newSlot = {
//       subjectId: "",
//       teacherId: "",
//       timeSlot: ""
//     };
//     setTimetableData(prev => ({
//       ...prev,
//       schedule: [...prev.schedule, newSlot]
//     }));
//   };

//   const updateScheduleSlot = (index, field, value) => {
//     const updatedSchedule = [...timetableData.schedule];
//     updatedSchedule[index][field] = value;
//     setTimetableData(prev => ({
//       ...prev,
//       schedule: updatedSchedule
//     }));
//   };

//   const removeScheduleSlot = (index) => {
//     const updatedSchedule = timetableData.schedule.filter((_, i) => i !== index);
//     setTimetableData(prev => ({
//       ...prev,
//       schedule: updatedSchedule
//     }));
//   };

//   const addTimetable = async () => {
//     if (!timetableData.section || !timetableData.day || timetableData.schedule.length === 0) {
//       alert("Section, day, and at least one schedule entry are required.");
//       return;
//     }

//     try {
//       const response = await axiosInstance.post("/section-timetable", timetableData);
//       setTimetables([...timetables, response.data.timetable]);
//       resetForm();
//     } catch (error) {
//       alert("Error adding timetable: " + error.response?.data?.message || error.message);
//       console.error("Error adding timetable:", error);
//     }
//   };

//   const handleEdit = (timetable) => {
//     setIsEditing(true);
//     setTimetableData({
//       section: timetable.section,
//       day: timetable.day,
//       schedule: timetable.schedule
//     });
//     setShowModal(true);
//   };

//   const updateTimetable = async () => {
//     try {
//       const response = await axiosInstance.put(
//         `/section-timetable/${timetableData.section}/${timetableData.day}`, 
//         { schedule: timetableData.schedule }
//       );
//       setTimetables(
//         timetables.map((timetable) =>
//           timetable.section === timetableData.section && timetable.day === timetableData.day 
//             ? response.data.timetable 
//             : timetable
//         )
//       );
//       resetForm();
//     } catch (error) {
//       alert("Error updating timetable: " + error.response?.data?.message || error.message);
//       console.error("Error updating timetable:", error);
//     }
//   };

//   const handleDelete = async (section, day) => {
//     if (window.confirm("Are you sure you want to delete this timetable?")) {
//       try {
//         await axiosInstance.delete(`/section-timetable/${section}/${day}`);
//         setTimetables(timetables.filter((timetable) => 
//           !(timetable.section === section && timetable.day === day)
//         ));
//       } catch (error) {
//         alert("Error deleting timetable: " + error.response?.data?.message || error.message);
//         console.error("Error deleting timetable:", error);
//       }
//     }
//   };

//   const resetForm = () => {
//     setShowModal(false);
//     setIsEditing(false);
//     setTimetableData({
//       section: "",
//       day: "",
//       schedule: []
//     });
//   };

//   const getSubjectName = (subjectId) => {
//     const subject = subjectsList.find(s => s._id === subjectId);
//     return subject ? subject.name : "Unknown";
//   };

//   const filteredTimetables = timetables.filter((timetable) => 
//     timetable.section.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="container mt-4">
//       <h2>Manage Section Timetable</h2>
      
//       <div className="d-flex justify-content-between mb-3">
//         <div className="flex-grow-1 me-2">
//           <Form.Control
//             type="text"
//             placeholder="Search by Section"
//             className="mb-3"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//         <div>
//           <Button onClick={() => setShowModal(true)}>
//             Add Section Timetable
//           </Button>
//         </div>
//       </div>

//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Section</th>
//             <th>Day</th>
//             <th>Schedule</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredTimetables.map((timetable) => (
//             <tr key={`${timetable.section}-${timetable.day}`}>
//               <td>{timetable.section}</td>
//               <td>{timetable.day}</td>
//               <td>
//                 {timetable.schedule.map((slot, index) => (
//                   <div key={index}>
//                     {getSubjectName(slot.subjectId)} - {slot.timeSlot}
//                   </div>
//                 ))}
//               </td>
//               <td>
//                 <Button 
//                   variant="warning" 
//                   className="me-2" 
//                   onClick={() => handleEdit(timetable)}
//                 >
//                   Edit
//                 </Button>
//                 <Button 
//                   variant="danger" 
//                   onClick={() => handleDelete(timetable.section, timetable.day)}
//                 >
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Add/Edit Modal */}
//       <Modal show={showModal} onHide={resetForm} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>{isEditing ? "Edit Section Timetable" : "Add Section Timetable"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-2">
//               <Form.Label>Section</Form.Label>
//               <Form.Control 
//                 type="text" 
//                 name="section" 
//                 value={timetableData.section} 
//                 onChange={handleChange} 
//                 placeholder="Enter section (e.g., 10A, 12B)"
//               />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Label>Day</Form.Label>
//               <Form.Select 
//                 name="day" 
//                 value={timetableData.day} 
//                 onChange={handleChange}
//               >
//                 <option value="">Select a day</option>
//                 {days.map((day) => (
//                   <option key={day} value={day}>{day}</option>
//                 ))}
//               </Form.Select>
//             </Form.Group>

//             <div className="mb-3">
//               <h5>Schedule 
//                 <Button 
//                   variant="outline-primary" 
//                   size="sm" 
//                   className="ms-2"
//                   onClick={addScheduleSlot}
//                 >
//                   Add Slot
//                 </Button>
//               </h5>
//               {timetableData.schedule.map((slot, index) => (
//                 <div key={index} className="d-flex mb-2 align-items-center">
//                   <Form.Select 
//                     className="me-2" 
//                     value={slot.subjectId}
//                     onChange={(e) => updateScheduleSlot(index, 'subjectId', e.target.value)}
//                   >
//                     <option value="">Select Subject</option>
//                     {subjectsList.map((subject) => (
//                       <option key={subject._id} value={subject._id}>
//                         {subject.name}
//                       </option>
//                     ))}
//                   </Form.Select>
//                   <Form.Select 
//                     className="me-2" 
//                     value={slot.timeSlot}
//                     onChange={(e) => updateScheduleSlot(index, 'timeSlot', e.target.value)}
//                   >
//                     <option value="">Select Time Slot</option>
//                     {baseTimeSlots.map((timeSlot) => (
//                       <option key={timeSlot} value={timeSlot}>{timeSlot}</option>
//                     ))}
//                   </Form.Select>
//                   <Button 
//                     variant="danger" 
//                     onClick={() => removeScheduleSlot(index)}
//                   >
//                     Remove
//                   </Button>
//                 </div>
//               ))}
//             </div>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={resetForm}>Close</Button>
//           <Button 
//             variant="primary" 
//             onClick={isEditing ? updateTimetable : addTimetable}
//           >
//             {isEditing ? "Update" : "Save"}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default ManageSectionTimetable;

// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import { Table, Button, Modal, Form } from "react-bootstrap";

// const ManageSectionTimetable = () => {
//   const [timetables, setTimetables] = useState([]);
//   const [subjectsList, setSubjectsList] = useState([]);
//   const [teachersList, setTeachersList] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentTimetableId, setCurrentTimetableId] = useState(null);
//   const [selectedSection, setSelectedSection] = useState("");
//   const [viewMode, setViewMode] = useState("grid");

//   const [timetableData, setTimetableData] = useState({
//     section: "",
//     subjectId: "",
//     teacherId: "",
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

//   // Sections list
//   const sections = ["A", "B", "C", "D", "E"];

//   useEffect(() => {
//     fetchSubjects();
//     fetchTeachers();
//     fetchTimetables();
//   }, []);

//   const fetchTimetables = async () => {
//     try {
//       const response = await axiosInstance.get("/section-timetable");
//       setTimetables(response.data);
//     } catch (error) {
//       console.error("Error fetching section timetables:", error);
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
//     if (!timetableData.section || !timetableData.subjectId || 
//         !timetableData.teacherId || !timetableData.day || !timetableData.timeSlot) {
//       alert("All fields are required.");
//       return;
//     }

//     try {
//       const response = await axiosInstance.post("/section-timetable/add-slot", {
//         section: timetableData.section,
//         day: timetableData.day,
//         schedule: [{
//           timeSlot: timetableData.timeSlot,
//           subject: getSubjectName(timetableData.subjectId),
//           subjectId: timetableData.subjectId,
//           teacherId: timetableData.teacherId
//         }]
//       });
//       setTimetables([...timetables, response.data.timetable]);
//       resetForm();
//     } catch (error) {
//       alert("Error adding timetable: " + error.response?.data?.message || error.message);
//       console.error("Error adding timetable:", error);
//     }
//   };

//   const handleDelete = async (section, day, slotId) => {
//     if (window.confirm("Are you sure you want to delete this timetable slot?")) {
//       try {
//         await axiosInstance.delete(`/section-timetable/${section}/${day}/${slotId}`);
//         // Refetch timetables to get updated data
//         fetchTimetables();
//       } catch (error) {
//         alert("Error deleting timetable slot: " + error.response?.data?.message || error.message);
//         console.error("Error deleting timetable slot:", error);
//       }
//     }
//   };

//   const handleEdit = (timetable, slot) => {
//     setIsEditing(true);
//     setCurrentTimetableId(slot._id);
//     setTimetableData({
//       section: timetable.section,
//       subjectId: slot.subjectId,
//       teacherId: slot.teacherId,
//       day: timetable.day,
//       timeSlot: slot.timeSlot,
//     });
//     setShowModal(true);
//   };

//   const updateTimetable = async () => {
//     try {
//       // Delete the existing slot first
//       await axiosInstance.delete(`/section-timetable/${timetableData.section}/${timetableData.day}/${currentTimetableId}`);
      
//       // Then add the new slot
//       const response = await axiosInstance.post("/section-timetable/add-slot", {
//         section: timetableData.section,
//         day: timetableData.day,
//         schedule: [{
//           timeSlot: timetableData.timeSlot,
//           subject: getSubjectName(timetableData.subjectId),
//           subjectId: timetableData.subjectId,
//           teacherId: timetableData.teacherId
//         }]
//       });
      
//       // Refetch timetables to get the most updated data
//       fetchTimetables();
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
//       section: "",
//       subjectId: "",
//       teacherId: "",
//       day: "",
//       timeSlot: "",
//     });
//   };

//   // Improved helper to find the subject name - handles both object and ID
//   const getSubjectName = (subjectId) => {
//     // If subjectId is already an object with a name property, return that
//     if (subjectId && typeof subjectId === 'object' && subjectId.name) {
//       return subjectId.name;
//     }
//     // Otherwise, find the subject by ID
//     const subject = subjectsList.find(s => s._id === subjectId);
//     return subject ? subject.name : "Unknown";
//   };

//   // Get teacher name by ID
//   const getTeacherName = (teacherId) => {
//     const teacher = teachersList.find(t => t.teacherId === teacherId);
//     return teacher ? teacher.name : "Unknown";
//   };

//   // Filter timetables by section if provided
//   const filteredTimetables = timetables.filter((timetable) => {
//     if (selectedSection) {
//       return timetable.section === selectedSection;
//     }
//     return true;
//   });

//   // Get class details for a specific day and time slot
//   const getClassDetails = (section, day, timeSlot) => {
//     const timetable = filteredTimetables.find(t => t.section === section && t.day === day);
    
//     if (timetable) {
//       const matchingSlot = timetable.schedule.find(slot => 
//         slot.timeSlot === timeSlot
//       );
      
//       return matchingSlot ? {
//         subject: getSubjectName(matchingSlot.subjectId),
//         teacher: getTeacherName(matchingSlot.teacherId),
//         id: matchingSlot._id,
//         timeSlot: matchingSlot.timeSlot
//       } : null;
//     }
    
//     return null;
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Manage Section Timetable</h2>
      
//       <div className="d-flex justify-content-between mb-3">
//         <div className="flex-grow-1 me-2">
//           {viewMode === "grid" ? (
//             <Form.Select 
//               value={selectedSection} 
//               onChange={(e) => setSelectedSection(e.target.value)}
//               className="mb-3"
//             >
//               <option value="">Select Section</option>
//               {sections.map((section) => (
//                 <option key={section} value={section}>
//                   Section {section}
//                 </option>
//               ))}
//             </Form.Select>
//           ) : (
//             <Form.Control
//               type="text"
//               placeholder="Search by Section"
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
//             Add Timetable Slot
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
//                 {sections.map((section) => (
//                   <th key={section} style={{ width: "17.6%" }}>Section {section}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {timeSlots.map((timeSlot) => (
//                 <tr key={timeSlot}>
//                   <td className="time-slot">{timeSlot}</td>
//                   {sections.map((section) => {
//                     // Check each day for the class details
//                     const classDays = days.map(day => ({
//                       day,
//                       details: getClassDetails(section, day, timeSlot)
//                     })).filter(item => item.details);
                    
//                     const classDetails = classDays.length > 0 ? classDays[0].details : null;
//                     const cellClass = classDetails ? "has-class" : "";
                      
//                     return (
//                       <td key={`${section}-${timeSlot}`} className={cellClass}>
//                         {classDetails ? (
//                           <div className="class-cell">
//                             <div className="subject-name">{classDetails.subject}</div>
//                             <div className="teacher-name">{classDetails.teacher}</div>
//                             <div className="time-display">{classDays.map(cd => cd.day).join(", ")}</div>
//                             <div className="actions mt-1">
//                               <Button 
//                                 variant="warning" 
//                                 size="sm" 
//                                 className="me-1 py-0 px-1"
//                                 onClick={() => {
//                                   const timetable = filteredTimetables.find(t => 
//                                     t.section === section && 
//                                     t.schedule.some(s => s._id === classDetails.id)
//                                   );
//                                   handleEdit(timetable, classDetails);
//                                 }}
//                               >
//                                 Edit
//                               </Button>
//                               <Button 
//                                 variant="danger" 
//                                 size="sm" 
//                                 className="py-0 px-1"
//                                 onClick={() => handleDelete(section, classDays[0].day, classDetails.id)}
//                               >
//                                 Delete
//                               </Button>
//                             </div>
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

//       {/* List View */}
//       {viewMode === "list" && (
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Section</th>
//               <th>Day</th>
//               <th>Time Slot</th>
//               <th>Subject</th>
//               <th>Teacher</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredTimetables.flatMap((timetable) => 
//               timetable.schedule.map((slot) => (
//                 <tr key={slot._id}>
//                   <td>{timetable.section}</td>
//                   <td>{timetable.day}</td>
//                   <td>{slot.timeSlot}</td>
//                   <td>{getSubjectName(slot.subjectId)}</td>
//                   <td>{getTeacherName(slot.teacherId)}</td>
//                   <td>
//                     <Button 
//                       variant="warning" 
//                       className="me-2" 
//                       onClick={() => handleEdit(timetable, slot)}
//                     >
//                       Edit
//                     </Button>
//                     <Button 
//                       variant="danger" 
//                       onClick={() => handleDelete(timetable.section, timetable.day, slot._id)}
//                     >
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </Table>
//       )}

//       {/* Add/Edit Modal */}
//       <Modal show={showModal} onHide={resetForm}>
//         <Modal.Header closeButton>
//           <Modal.Title>{isEditing ? "Edit Timetable Slot" : "Add Timetable Slot"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-2">
//               <Form.Label>Section</Form.Label>
//               <Form.Select name="section" value={timetableData.section} onChange={handleChange}>
//                 <option value="">Select a section</option>
//                 {sections.map((section) => (
//                   <option key={section} value={section}>Section {section}</option>
//                 ))}
//               </Form.Select>
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
//               <Form.Label>Teacher</Form.Label>
//               <Form.Select name="teacherId" value={timetableData.teacherId} onChange={handleChange}>
//                 <option value="">Select a teacher</option>
//                 {teachersList.map((teacher) => (
//                   <option key={teacher._id} value={teacher.teacherId}>{teacher.name} ({teacher.teacherId})</option>
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
//         .class-cell {
//           padding: 8px;
//         }
//         .subject-name {
//           font-weight: bold;
//           color: #1565c0;
//         }
//         .teacher-name {
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

// export default ManageSectionTimetable;


// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import { Table, Button, Modal, Form } from "react-bootstrap";

// const ManageSectionTimetable = () => {
//   const [timetables, setTimetables] = useState([]);
//   const [subjectsList, setSubjectsList] = useState([]);
//   const [teachersList, setTeachersList] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentTimetableId, setCurrentTimetableId] = useState(null);
//   const [selectedSection, setSelectedSection] = useState("");
//   const [viewMode, setViewMode] = useState("grid");

//   const [timetableData, setTimetableData] = useState({
//     section: "",
//     subjectId: "",
//     teacherId: "",
//     day: "",
//     timeSlot: "",
//   });

//   // Base one-hour interval time slots
//   const baseTimeSlots = [
//     "9:00 - 10:00 ",
//     "10:00 - 11:00", 
//     "11:00 - 12:00",
//     "12:00 - 1:00",
//     "1:00 - 2:00",
//     "2:00 - 3:00",
//     "3:00 - 4:00"
//   ];

//   // Generate all possible 2-hour combinations
//   const generateTwoHourSlots = () => {
//     const twoHourSlots = [];
//     for (let i = 0; i < baseTimeSlots.length - 1; i++) {
//       const startTime = baseTimeSlots[i].split(" - ")[0];
//       const endTime = baseTimeSlots[i + 1].split(" - ")[1];
//       twoHourSlots.push(`${startTime} - ${endTime}`);
//     }
//     return twoHourSlots;
//   };

//   // Combine 1-hour and 2-hour slots for the dropdown
//   const allTimeSlots = [...baseTimeSlots, ...generateTwoHourSlots()];
  
//   // For the grid view, we'll still use the 1-hour slots as the base
//   const timeSlots = baseTimeSlots;
//   const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

//   // Sections list with more detailed sections
//   const sections = ["CSE-A", "CSE-B", "EEE","ECE","Civil", "Mech"];

//   useEffect(() => {
//     fetchSubjects();
//     fetchTeachers();
//     fetchTimetables();
//   }, []);

//   const fetchTimetables = async () => {
//     try {
//       const response = await axiosInstance.get("/section-timetable");
//       setTimetables(response.data);
//     } catch (error) {
//       console.error("Error fetching section timetables:", error);
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

//   // const addTimetable = async () => {
//   //   if (!timetableData.section || !timetableData.subjectId || 
//   //       !timetableData.teacherId || !timetableData.day || !timetableData.timeSlot) {
//   //     alert("All fields are required.");
//   //     return;
//   //   }

//   //   try {
//   //     const response = await axiosInstance.post("/section-timetable/add-slot", {
//   //       section: timetableData.section,
//   //       day: timetableData.day,
//   //       schedule: [{
//   //         timeSlot: timetableData.timeSlot,
//   //         subject: getSubjectName(timetableData.subjectId),
//   //         subjectId: timetableData.subjectId,
//   //         teacherId: timetableData.teacherId
//   //       }]
//   //     });
//   //     setTimetables([...timetables, response.data.timetable]);
//   //     resetForm();
//   //   } catch (error) {
//   //     alert("Error adding timetable: " + error.response?.data?.message || error.message);
//   //     console.error("Error adding timetable:", error);
//   //   }
//   // };
//   const addTimetable = async () => {
//     if (!timetableData.section || !timetableData.subjectId || 
//         !timetableData.teacherId || !timetableData.day || !timetableData.timeSlot) {
//       alert("All fields are required.");
//       return;
//     }
  
//     try {
//       const response = await axiosInstance.post("/section-timetable/add-slot", {
//         section: timetableData.section,
//         day: timetableData.day,
//         schedule: [{
//           timeSlot: timetableData.timeSlot,
//           subject: getSubjectName(timetableData.subjectId),
//           subjectId: timetableData.subjectId,
//           teacherId: timetableData.teacherId
//         }]
//       });
      
//       // This line might be causing the issue
//       setTimetables([...timetables, response.data.timetable]);
      
//       resetForm();
      
//       // Instead of manually adding, refetch to ensure consistency
//       fetchTimetables();
//     } catch (error) {
//       alert("Error adding timetable: " + error.response?.data?.message || error.message);
//       console.error("Error adding timetable:", error);
//     }
//   };

//   const handleDelete = async (section, day, slotId) => {
//     if (window.confirm("Are you sure you want to delete this timetable slot?")) {
//       try {
//         await axiosInstance.delete(`/section-timetable/${section}/${day}/${slotId}`);
//         // Refetch timetables to get updated data
//         fetchTimetables();
//       } catch (error) {
//         alert("Error deleting timetable slot: " + error.response?.data?.message || error.message);
//         console.error("Error deleting timetable slot:", error);
//       }
//     }
//   };

//   const handleEdit = (timetable, slot) => {
//     setIsEditing(true);
//     setCurrentTimetableId(slot._id);
//     setTimetableData({
//       section: timetable.section,
//       subjectId: slot.subjectId,
//       teacherId: slot.teacherId,
//       day: timetable.day,
//       timeSlot: slot.timeSlot,
//     });
//     setShowModal(true);
//   };

//   // const updateTimetable = async () => {
//   //   try {
//   //     // Delete the existing slot first
//   //     await axiosInstance.delete(`/section-timetable/${timetableData.section}/${timetableData.day}/${currentTimetableId}`);
      
//   //     // Then add the new slot
//   //     const response = await axiosInstance.post("/section-timetable/add-slot", {
//   //       section: timetableData.section,
//   //       day: timetableData.day,
//   //       schedule: [{
//   //         timeSlot: timetableData.timeSlot,
//   //         subject: getSubjectName(timetableData.subjectId),
//   //         subjectId: timetableData.subjectId,
//   //         teacherId: timetableData.teacherId
//   //       }]
//   //     });
      
//   //     // Refetch timetables to get the most updated data
//   //     fetchTimetables();
//   //     resetForm();
//   //   } catch (error) {
//   //     alert("Error updating timetable: " + error.response?.data?.message || error.message);
//   //     console.error("Error updating timetable:", error);
//   //   }
//   // };
//   const updateTimetable = async () => {
//     try {
//       // Delete the existing slot first
//       await axiosInstance.delete(`/section-timetable/${timetableData.section}/${timetableData.day}/${currentTimetableId}`);
      
//       // Then add the new slot
//       const response = await axiosInstance.post("/section-timetable/add-slot", {
//         section: timetableData.section,
//         day: timetableData.day,
//         schedule: [{
//           timeSlot: timetableData.timeSlot,
//           subject: getSubjectName(timetableData.subjectId),
//           subjectId: timetableData.subjectId,
//           teacherId: timetableData.teacherId
//         }]
//       });
      
//       // Refetch timetables to get the most updated data
//       fetchTimetables();
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
//       section: "",
//       subjectId: "",
//       teacherId: "",
//       day: "",
//       timeSlot: "",
//     });
//   };

//   // Improved helper to find the subject name - handles both object and ID
//   const getSubjectName = (subjectId) => {
//     // If subjectId is already an object with a name property, return that
//     if (subjectId && typeof subjectId === 'object' && subjectId.name) {
//       return subjectId.name;
//     }
//     // Otherwise, find the subject by ID
//     const subject = subjectsList.find(s => s._id === subjectId);
//     return subject ? subject.name : "Unknown";
//   };

//   // Get teacher name by ID
//   const getTeacherName = (teacherId) => {
//     // Try finding by MongoDB _id
//     const teacherById = teachersList.find(t => t._id === teacherId);
//     if (teacherById) return teacherById.name;
  
//     // Try finding by teacherId
//     const teacherByTeacherId = teachersList.find(t => t.teacherId === teacherId);
//     if (teacherByTeacherId) return teacherByTeacherId.name;
  
//     return "Unknown";
//   };

//   // Filter timetables by section and search query
//   const filteredTimetables = timetables.filter((timetable) => {
//     // Filter by section first
//     const sectionMatch = selectedSection ? 
//       timetable.section === selectedSection : 
//       true;
    
//     // If search query is present, check for match
//     if (searchQuery) {
//       const normalizedQuery = searchQuery.toLowerCase().trim();
//       const sectionMatch = timetable.section.toLowerCase().includes(normalizedQuery);
//       const scheduleMatch = timetable.schedule.some(slot => 
//         getSubjectName(slot.subjectId).toLowerCase().includes(normalizedQuery) ||
//         getTeacherName(slot.teacherId).toLowerCase().includes(normalizedQuery)
//       );
      
//       return sectionMatch && (selectedSection ? timetable.section === selectedSection : true);
//     }
    
//     return sectionMatch;
//   });

//   // Get class details for a specific day and time slot
//   const getClassDetails = (section, day, timeSlot) => {
//     const timetable = filteredTimetables.find(t => t.section === section && t.day === day);
    
//     if (timetable) {
//       const matchingSlot = timetable.schedule.find(slot => 
//         slot.timeSlot === timeSlot
//       );
      
//       return matchingSlot ? {
//         subject: getSubjectName(matchingSlot.subjectId),
//         teacher: getTeacherName(matchingSlot.teacherId),
//         id: matchingSlot._id,
//         timeSlot: matchingSlot.timeSlot
//       } : null;
//     }
    
//     return null;
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Manage Section Timetable</h2>
      
//       <div className="d-flex justify-content-between mb-3">
//         <div className="flex-grow-1 me-2">
//           {viewMode === "grid" ? (
//             <Form.Select 
//               value={selectedSection} 
//               onChange={(e) => {
//                 setSelectedSection(e.target.value);
//                 setSearchQuery(""); // Reset search query when changing section
//               }}
//               className="mb-3"
//             >
//               <option value="">Select Section</option>
//               {sections.map((section) => (
//                 <option key={section} value={section}>
//                   Section {section}
//                 </option>
//               ))}
//             </Form.Select>
//           ) : (
//             <Form.Control
//               type="text"
//               placeholder="Search by Sections"
//               className="mb-3"
//               value={searchQuery}
//               onChange={(e) => {
//                 setSearchQuery(e.target.value);
//                 setSelectedSection(""); // Reset section when searching
//               }}
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
//             Add Timetable Slot
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
//                 {(selectedSection ? [selectedSection] : sections).map((section) => (
//                   <th key={section} style={{ width: "17.6%" }}>Section {section}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {timeSlots.map((timeSlot) => (
//                 <tr key={timeSlot}>
//                   <td className="time-slot">{timeSlot}</td>
//                   {(selectedSection ? [selectedSection] : sections).map((section) => {
//                     // Check each day for the class details
//                     const classDays = days.map(day => ({
//                       day,
//                       details: getClassDetails(section, day, timeSlot)
//                     })).filter(item => item.details);
                    
//                     const classDetails = classDays.length > 0 ? classDays[0].details : null;
//                     const cellClass = classDetails ? "has-class" : "";
                      
//                     return (
//                       <td key={`${section}-${timeSlot}`} className={cellClass}>
//                         {classDetails ? (
//                           <div className="class-cell">
//                             <div className="subject-name">{classDetails.subject}</div>
//                             <div className="teacher-name">{classDetails.teacher}</div>
//                             <div className="time-display">{classDays.map(cd => cd.day).join(", ")}</div>
//                             <div className="actions mt-1">
//                               <Button 
//                                 variant="warning" 
//                                 size="sm" 
//                                 className="me-1 py-0 px-1"
//                                 onClick={() => {
//                                   const timetable = filteredTimetables.find(t => 
//                                     t.section === section && 
//                                     t.schedule.some(s => s._id === classDetails.id)
//                                   );
//                                   handleEdit(timetable, classDetails);
//                                 }}
//                               >
//                                 Edit
//                               </Button>
//                               <Button 
//                                 variant="danger" 
//                                 size="sm" 
//                                 className="py-0 px-1"
//                                 onClick={() => handleDelete(section, classDays[0].day, classDetails.id)}
//                               >
//                                 Delete
//                               </Button>
//                             </div>
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

//       {/* List View */}
//       {viewMode === "list" && (
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Section</th>
//               <th>Day</th>
//               <th>Time Slot</th>
//               <th>Subject</th>
//               <th>Teacher</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredTimetables.flatMap((timetable) => 
//               timetable.schedule.map((slot) => (
//                 <tr key={slot._id}>
//                   <td>{timetable.section}</td>
//                   <td>{timetable.day}</td>
//                   <td>{slot.timeSlot}</td>
//                   <td>{getSubjectName(slot.subjectId)}</td>
//                   <td>{getTeacherName(slot.teacherId)}</td>
//                   <td>
//                     <Button 
//                       variant="warning" 
//                       className="me-2" 
//                       onClick={() => handleEdit(timetable, slot)}
//                     >
//                       Edit
//                     </Button>
//                     <Button 
//                       variant="danger" 
//                       onClick={() => handleDelete(timetable.section, timetable.day, slot._id)}
//                     >
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </Table>
//       )}

//       {/* The rest of the code remains the same (Modal and Styles) */}
//       <Modal show={showModal} onHide={resetForm}>
//         <Modal.Header closeButton>
//           <Modal.Title>{isEditing ? "Edit Timetable Slot" : "Add Timetable Slot"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-2">
//               <Form.Label>Section</Form.Label>
//               <Form.Select name="section" value={timetableData.section} onChange={handleChange}>
//                 <option value="">Select a section</option>
//                 {sections.map((section) => (
//                   <option key={section} value={section}>Section {section}</option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//             {/* Rest of the Modal remains the same */}
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
//               <Form.Label>Teacher</Form.Label>
//               <Form.Select name="teacherId" value={timetableData.teacherId} onChange={handleChange}>
//                 <option value="">Select a teacher</option>
//                 {teachersList.map((teacher) => (
//                   <option key={teacher._id} value={teacher.teacherId}>{teacher.name} ({teacher.teacherId})</option>
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

//       {/* Inline Styles */}
//       <style type="text/css">{`
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
//         .class-cell {
//           padding: 8px;
//         }
//         .subject-name {
//           font-weight: bold;
//           color: #1565c0;
//         }
//         .teacher-name {
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

// export default ManageSectionTimetable;


// import React, { useEffect, useState, useCallback } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import { Table, Button, Modal, Form, Alert } from "react-bootstrap";

// const ManageSectionTimetable = () => {
//   const [timetables, setTimetables] = useState([]);
//   const [subjectsList, setSubjectsList] = useState([]);
//   const [teachersList, setTeachersList] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentTimetableId, setCurrentTimetableId] = useState(null);
//   const [selectedSection, setSelectedSection] = useState("");
//   const [viewMode, setViewMode] = useState("grid");
//   const [error, setError] = useState(null);

//   const [timetableData, setTimetableData] = useState({
//     section: "",
//     subjectId: "",
//     teacherId: "",
//     day: "",
//     timeSlot: "",
//   });

//   // Base one-hour interval time slots
//   const baseTimeSlots = [
//     "9:00 - 10:00",
//     "10:00 - 11:00", 
//     "11:00 - 12:00",
//     "12:00 - 1:00",
//     "1:00 - 2:00",
//     "2:00 - 3:00",
//     "3:00 - 4:00"
//   ];

//   // Generate all possible 2-hour combinations
//   const generateTwoHourSlots = () => {
//     const twoHourSlots = [];
//     for (let i = 0; i < baseTimeSlots.length - 1; i++) {
//       const startTime = baseTimeSlots[i].split(" - ")[0];
//       const endTime = baseTimeSlots[i + 1].split(" - ")[1];
//       twoHourSlots.push(`${startTime} - ${endTime}`);
//     }
//     return twoHourSlots;
//   };

//   // Combine 1-hour and 2-hour slots for the dropdown
//   const allTimeSlots = [...baseTimeSlots, ...generateTwoHourSlots()];
  
//   // For the grid view, we'll still use the 1-hour slots as the base
//   const timeSlots = baseTimeSlots;
//   const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

//   // Sections list with more detailed sections
//   const sections = ["CSE-A", "CSE-B", "EEE", "ECE", "Civil", "Mech"];

//   // Fetch data with improved error handling
//   const fetchData = useCallback(async () => {
//     try {
//       const [timetablesRes, subjectsRes, teachersRes] = await Promise.all([
//         axiosInstance.get("/section-timetable"),
//         axiosInstance.get("/subjects"),
//         axiosInstance.get("/teachers")
//       ]);

//       setTimetables(timetablesRes.data);
//       setSubjectsList(subjectsRes.data);
//       setTeachersList(teachersRes.data);
//       setError(null);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError("Failed to load timetable data. Please try again.");
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   // Validate before adding/updating timetable
//   const validateTimetableData = () => {
//     const { section, subjectId, teacherId, day, timeSlot } = timetableData;
    
//     // Check for empty fields
//     if (!section || !subjectId || !teacherId || !day || !timeSlot) {
//       setError("All fields are required.");
//       return false;
//     }

//     // Check for duplicate slots
//     const isDuplicate = timetables.some(timetable => 
//       timetable.section === section && 
//       timetable.day === day && 
//       timetable.schedule.some(slot => slot.timeSlot === timeSlot)
//     );

//     if (isDuplicate) {
//       setError("A slot already exists for this section, day, and time.");
//       return false;
//     }

//     return true;
//   };

//   const handleChange = (e) => {
//     setTimetableData({ ...timetableData, [e.target.name]: e.target.value });
//     // Clear any previous errors when user starts editing
//     setError(null);
//   };

//   const addTimetable = async () => {
//     if (!validateTimetableData()) return;

//     try {
//       await axiosInstance.post("/section-timetable/add-slot", {
//         section: timetableData.section,
//         day: timetableData.day,
//         schedule: [{
//           timeSlot: timetableData.timeSlot,
//           subject: getSubjectName(timetableData.subjectId),
//           subjectId: timetableData.subjectId,
//           teacherId: timetableData.teacherId
//         }]
//       });
      
//       fetchData();
//       resetForm();
//     } catch (error) {
//       setError(error.response?.data?.message || "Error adding timetable");
//       console.error("Error adding timetable:", error);
//     }
//   };

//   const updateTimetable = async () => {
//     if (!validateTimetableData()) return;

//     try {
//       // Delete the existing slot first
//       await axiosInstance.delete(`/section-timetable/${timetableData.section}/${timetableData.day}/${currentTimetableId}`);
      
//       // Then add the new slot
//       await axiosInstance.post("/section-timetable/add-slot", {
//         section: timetableData.section,
//         day: timetableData.day,
//         schedule: [{
//           timeSlot: timetableData.timeSlot,
//           subject: getSubjectName(timetableData.subjectId),
//           subjectId: timetableData.subjectId,
//           teacherId: timetableData.teacherId
//         }]
//       });
      
//       fetchData();
//       resetForm();
//     } catch (error) {
//       setError(error.response?.data?.message || "Error updating timetable");
//       console.error("Error updating timetable:", error);
//     }
//   };

//   const handleDelete = async (section, day, slotId) => {
//     if (window.confirm("Are you sure you want to delete this timetable slot?")) {
//       try {
//         await axiosInstance.delete(`/section-timetable/${section}/${day}/${slotId}`);
//         fetchData();
//       } catch (error) {
//         setError(error.response?.data?.message || "Error deleting timetable slot");
//         console.error("Error deleting timetable slot:", error);
//       }
//     }
//   };

//   const handleEdit = (timetable, slot) => {
//     setIsEditing(true);
//     setCurrentTimetableId(slot._id);
//     setTimetableData({
//       section: timetable.section,
//       subjectId: slot.subjectId,
//       teacherId: slot.teacherId,
//       day: timetable.day,
//       timeSlot: slot.timeSlot,
//     });
//     setShowModal(true);
//   };

//   const resetForm = () => {
//     setShowModal(false);
//     setIsEditing(false);
//     setTimetableData({
//       section: "",
//       subjectId: "",
//       teacherId: "",
//       day: "",
//       timeSlot: "",
//     });
//     setError(null);
//   };

//   // Improved helper to find the subject name - handles both object and ID
//   const getSubjectName = (subjectId) => {
//     if (subjectId && typeof subjectId === 'object' && subjectId.name) {
//       return subjectId.name;
//     }
//     const subject = subjectsList.find(s => s._id === subjectId);
//     return subject ? subject.name : "Unknown";
//   };

//   // Get teacher name by ID with improved lookup
//   const getTeacherName = (teacherId) => {
//     const teacherById = teachersList.find(t => t._id === teacherId);
//     if (teacherById) return teacherById.name;
  
//     const teacherByTeacherId = teachersList.find(t => t.teacherId === teacherId);
//     if (teacherByTeacherId) return teacherByTeacherId.name;
  
//     return "Unknown";
//   };

//   // Improved class details finding function
//   // const getClassDetails = (section, day, timeSlot) => {
//   //   const timetables = filteredTimetables.filter(t => t.section === section);
    
//   //   const matchingSlots = timetables.flatMap(timetable => 
//   //     timetable.schedule.filter(slot => {
//   //       // Exact time slot match
//   //       if (slot.timeSlot === timeSlot && timetable.day === day) {
//   //         return true;
//   //       }
        
//   //       // 2-hour slot check
//   //       const twoHourSlots = generateTwoHourSlots();
//   //       const matchingTwoHourSlot = twoHourSlots.find(twoHourSlot => 
//   //         twoHourSlot.includes(timeSlot) && 
//   //         slot.timeSlot === twoHourSlot && 
//   //         timetable.day === day
//   //       );
        
//   //       return !!matchingTwoHourSlot;
//   //     })
//   //   );

//   //   if (matchingSlots.length > 0) {
//   //     const days = timetables
//   //       .filter(timetable => 
//   //         matchingSlots.some(slot => 
//   //           timetable.schedule.includes(slot)
//   //         )
//   //       )
//   //       .map(timetable => timetable.day);

//   //     return {
//   //       subject: getSubjectName(matchingSlots[0].subjectId),
//   //       teacher: getTeacherName(matchingSlots[0].teacherId),
//   //       id: matchingSlots[0]._id,
//   //       timeSlot: matchingSlots[0].timeSlot,
//   //       days: days
//   //     };
//   //   }
    
//   //   return null;
//   // };
//   // const getClassDetails = (section, day, timeSlot) => {
//   //   // Find timetables for the specific section
//   //   const sectionTimetables = timetables.filter(t => t.section === section && t.day === day);
  
//   //   // Find slots that either match or overlap with the current time slot
//   //   const matchingSlots = sectionTimetables.flatMap(timetable => 
//   //     timetable.schedule.filter(slot => {
//   //       // Exact time slot match
//   //       if (slot.timeSlot === timeSlot) {
//   //         return true;
//   //       }
        
//   //       // Check for 2-hour slot overlaps
//   //       const twoHourSlots = generateTwoHourSlots();
//   //       const matchingTwoHourSlot = twoHourSlots.find(twoHourSlot => 
//   //         twoHourSlot.includes(timeSlot) && 
//   //         slot.timeSlot === twoHourSlot
//   //       );
        
//   //       return !!matchingTwoHourSlot;
//   //     })
//   //   );
  
//   //   if (matchingSlots.length > 0) {
//   //     const firstSlot = matchingSlots[0];
//   //     return {
//   //       subject: getSubjectName(firstSlot.subjectId),
//   //       section: section,
//   //       id: firstSlot._id,
//   //       timeSlot: firstSlot.timeSlot,
//   //       isStartingSlot: firstSlot.timeSlot.split(' - ')[0] === timeSlot.split(' - ')[0]
//   //     };
//   //   }
    
//   //   return null;
//   // };
//   const getClassDetails = (section, day, timeSlot) => {
//     // Find timetables for the specific section
//     const sectionTimetables = timetables.filter(t => t.section === section && t.day === day);
  
//     // Generate 2-hour slots for comparison
//     const twoHourSlots = generateTwoHourSlots();
  
//     // Find slots that match or overlap with the current time slot
//     const matchingSlots = sectionTimetables.flatMap(timetable => 
//       timetable.schedule.filter(slot => {
//         // Exact time slot match
//         if (slot.timeSlot === timeSlot) {
//           return true;
//         }
        
//         // Check for 2-hour slot overlaps
//         const matchingTwoHourSlot = twoHourSlots.find(twoHourSlot => {
//           // Check if the current timeSlot is within the 2-hour slot
//           return twoHourSlot.includes(timeSlot) && slot.timeSlot === twoHourSlot;
//         });
        
//         return !!matchingTwoHourSlot;
//       })
//     );
  
//     if (matchingSlots.length > 0) {
//       const firstSlot = matchingSlots[0];
      
//       // Determine if this is the starting slot of the class
//       const isStartingSlot = firstSlot.timeSlot.split(' - ')[0] === timeSlot.split(' - ')[0];
      
//       // Check if it's a 2-hour slot
//       const is2HourSlot = firstSlot.timeSlot.includes('(2 hours)');
      
//       return {
//         subject: getSubjectName(firstSlot.subjectId),
//         section: section,
//         id: firstSlot._id,
//         timeSlot: firstSlot.timeSlot,
//         isStartingSlot: isStartingSlot,
//         is2HourSlot: is2HourSlot
//       };
//     }
    
//     return null;
//   };
//   // Filter timetables by section and search query
//   const filteredTimetables = timetables.filter((timetable) => {
//     const sectionMatch = selectedSection ? 
//       timetable.section === selectedSection : 
//       true;
    
//     if (searchQuery) {
//       const normalizedQuery = searchQuery.toLowerCase().trim();
//       const sectionMatch = timetable.section.toLowerCase().includes(normalizedQuery);
//       const scheduleMatch = timetable.schedule.some(slot => 
//         getSubjectName(slot.subjectId).toLowerCase().includes(normalizedQuery) ||
//         getTeacherName(slot.teacherId).toLowerCase().includes(normalizedQuery)
//       );
      
//       return sectionMatch && (selectedSection ? timetable.section === selectedSection : true);
//     }
    
//     return sectionMatch;
//   });

//   return (
//     <div className="container mt-4">
//       <h2>Manage Section Timetable</h2>
      
//       {error && (
//         <Alert 
//           variant="danger" 
//           onClose={() => setError(null)} 
//           dismissible
//         >
//           {error}
//         </Alert>
//       )}
      
//       <div className="d-flex justify-content-between mb-3">
//         <div className="flex-grow-1 me-2">
//           {viewMode === "grid" ? (
//             <Form.Select 
//               value={selectedSection} 
//               onChange={(e) => {
//                 setSelectedSection(e.target.value);
//                 setSearchQuery(""); // Reset search query when changing section
//               }}
//               className="mb-3"
//             >
//               <option value="">Select Section</option>
//               {sections.map((section) => (
//                 <option key={section} value={section}>
//                   Section {section}
//                 </option>
//               ))}
//             </Form.Select>
//           ) : (
//             <Form.Control
//               type="text"
//               placeholder="Search by Sections"
//               className="mb-3"
//               value={searchQuery}
//               onChange={(e) => {
//                 setSearchQuery(e.target.value);
//                 setSelectedSection(""); // Reset section when searching
//               }}
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
//           <Button onClick={() => {
//             setShowModal(true);
//             setError(null);
//           }}>
//             Add Timetable Slot
//           </Button>
//         </div>
//       </div>

//       {/* Grid/Timetable View */}
// {/* {viewMode === "grid" && (
//   <div className="timetable-container">
//     <Table bordered className="timetable-grid">
//       <thead>
//         <tr>
//           <th style={{ width: "12%" }}>Time Slot</th>
//           {days.map((day) => (
//             <th key={day} style={{ width: "17.6%" }}>{day}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {timeSlots.map((timeSlot) => (
//           <tr key={timeSlot}>
//             <td className="time-slot">{timeSlot}</td>
//             {days.map((day) => {
//               const classDetails = getClassDetails(
//                 selectedSection || sections[0], 
//                 day, 
//                 timeSlot
//               );
              
//               const cellClass = classDetails 
//                 ? `has-class ${!classDetails.isStartingSlot ? 'continuation' : ''}`
//                 : "";
                
//               return (
//                 <td key={`${day}-${timeSlot}`} className={cellClass}>
//                   {classDetails ? (
//                     <div className="class-cell">
//                       <div className="subject-name">{classDetails.subject}</div>
//                       <div className="section-name">{classDetails.section}</div>
//                       <div className="time-display">{classDetails.timeSlot}</div>
//                       {classDetails.isStartingSlot && (
//                         <div className="actions mt-1">
//                           <Button 
//                             variant="warning" 
//                             size="sm" 
//                             className="me-1 py-0 px-1"
//                             onClick={() => {
//                               const timetable = filteredTimetables.find(t => 
//                                 t.section === classDetails.section && 
//                                 t.schedule.some(s => s._id === classDetails.id)
//                               );
//                               handleEdit(timetable, classDetails);
//                             }}
//                           >
//                             Edit
//                           </Button>
//                           <Button 
//                             variant="danger" 
//                             size="sm" 
//                             className="py-0 px-1"
//                             onClick={() => handleDelete(
//                               classDetails.section, 
//                               day, 
//                               classDetails.id
//                             )}
//                           >
//                             Delete
//                           </Button>
//                         </div>
//                       )}
//                     </div>
//                   ) : null}
//                 </td>
//               );
//             })}
//           </tr>
//         ))}
//       </tbody>
//     </Table>
//   </div>
// )} */}
// {viewMode === "grid" && (
//   <div className="timetable-container">
//     <Table bordered className="timetable-grid">
//       <thead>
//         <tr>
//           <th style={{ width: "12%" }}>Time Slot</th>
//           {days.map((day) => (
//             <th key={day} style={{ width: "17.6%" }}>{day}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {timeSlots.map((timeSlot) => (
//           <tr key={timeSlot}>
//             <td className="time-slot">{timeSlot}</td>
//             {days.map((day) => {
//               const classDetails = getClassDetails(
//                 selectedSection || sections[0], 
//                 day, 
//                 timeSlot
//               );
              
//               const cellClass = classDetails 
//                 ? `has-class 
//                    ${!classDetails.isStartingSlot ? 'continuation' : ''}
//                    ${classDetails.is2HourSlot ? 'two-hour-slot' : ''}`
//                 : "";
                
//               return (
//                 <td 
//                   key={`${day}-${timeSlot}`} 
//                   className={cellClass}
//                   rowSpan={classDetails && classDetails.is2HourSlot ? 2 : 1}
//                 >
//                   {classDetails ? (
//                     <div className="class-cell">
//                       <div className="subject-name">{classDetails.subject}</div>
//                       <div className="section-name">{classDetails.section}</div>
//                       <div className="time-display">{classDetails.timeSlot}</div>
//                       {classDetails.isStartingSlot && (
//                         <div className="actions mt-1">
//                           <Button 
//                             variant="warning" 
//                             size="sm" 
//                             className="me-1 py-0 px-1"
//                             onClick={() => {
//                               const timetable = filteredTimetables.find(t => 
//                                 t.section === classDetails.section && 
//                                 t.schedule.some(s => s._id === classDetails.id)
//                               );
//                               handleEdit(timetable, classDetails);
//                             }}
//                           >
//                             Edit
//                           </Button>
//                           <Button 
//                             variant="danger" 
//                             size="sm" 
//                             className="py-0 px-1"
//                             onClick={() => handleDelete(
//                               classDetails.section, 
//                               day, 
//                               classDetails.id
//                             )}
//                           >
//                             Delete
//                           </Button>
//                         </div>
//                       )}
//                     </div>
//                   ) : null}
//                 </td>
//               );
//             })}
//           </tr>
//         ))}
//       </tbody>
//     </Table>
//   </div>
// )}

//       {/* List View */}
//       {viewMode === "list" && (
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Section</th>
//               <th>Day</th>
//               <th>Time Slot</th>
//               <th>Subject</th>
//               <th>Teacher</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredTimetables.flatMap((timetable) => 
//               timetable.schedule.map((slot) => (
//                 <tr key={slot._id}>
//                   <td>{timetable.section}</td>
//                   <td>{timetable.day}</td>
//                   <td>{slot.timeSlot}</td>
//                   <td>{getSubjectName(slot.subjectId)}</td>
//                   <td>{getTeacherName(slot.teacherId)}</td>
//                   <td>
//                     <Button 
//                       variant="warning" 
//                       className="me-2" 
//                       onClick={() => handleEdit(timetable, slot)}
//                     >
//                       Edit
//                     </Button>
//                     <Button 
//                       variant="danger" 
//                       onClick={() => handleDelete(timetable.section, timetable.day, slot._id)}
//                     >
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </Table>
//       )}

//       {/* Modal for Adding/Editing Timetable Slot */}
//       <Modal show={showModal} onHide={resetForm}>
//         <Modal.Header closeButton>
//           <Modal.Title>{isEditing ? "Edit Timetable Slot" : "Add Timetable Slot"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-2">
//               <Form.Label>Section</Form.Label>
//               <Form.Select name="section" value={timetableData.section} onChange={handleChange}>
//                 <option value="">Select a section</option>
//                 {sections.map((section) => (
//                   <option key={section} value={section}>Section {section}</option>
//                 ))}
//               </Form.Select>
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
//               <Form.Label>Teacher</Form.Label>
//               <Form.Select name="teacherId" value={timetableData.teacherId} onChange={handleChange}>
//                 <option value="">Select a teacher</option>
//                 {teachersList.map((teacher) => (
//                   <option key={teacher._id} value={teacher.teacherId}>{teacher.name} ({teacher.teacherId})</option>
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

//       {/* Inline Styles */}
//       <style type="text/css">{`
//         .timetable-grid {
//           table-layout: fixed;
//         }
//           .two-hour-slot {
//   background-color: #e6f2ff !important;
// }

// .continuation {
//   background-color: #f0f0f0;
//   color: #666;
// }
//         .time-slot {
//           font-weight: bold;
//           vertical-align: middle;
//         }
//         .has-class {
//           background-color: #e3f2fd;
//           padding: 0;
//           position: relative;
//         }
//         .class-cell {
//           padding: 8px;
//         }
//         .subject-name {
//           font-weight: bold;
//           color: #1565c0;
//         }
//         .teacher-name {
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

// export default ManageSectionTimetable;

// import React, { useEffect, useState, useCallback } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import { Table, Button, Modal, Form, Alert } from "react-bootstrap";

// const ManageSectionTimetable = () => {
//   const [timetables, setTimetables] = useState([]);
//   const [subjectsList, setSubjectsList] = useState([]);
//   const [teachersList, setTeachersList] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentTimetableId, setCurrentTimetableId] = useState(null);
//   const [selectedSection, setSelectedSection] = useState("");
//   const [viewMode, setViewMode] = useState("grid");
//   const [error, setError] = useState(null);

//   const [timetableData, setTimetableData] = useState({
//     section: "",
//     subjectId: "",
//     teacherId: "",
//     day: "",
//     timeSlot: "",
//   });

//   // Time formats reference for conversion
//   const timeFormats = {
//     "9:00": 9,
//     "10:00": 10,
//     "11:00": 11,
//     "12:00": 12,
//     "1:00": 13,
//     "2:00": 14,
//     "3:00": 15,
//     "4:00": 16
//   };

//   // Base one-hour interval time slots
//   const baseTimeSlots = [
//     "9:00 - 10:00",
//     "10:00 - 11:00", 
//     "11:00 - 12:00",
//     "12:00 - 1:00",
//     "1:00 - 2:00",
//     "2:00 - 3:00",
//     "3:00 - 4:00"
//   ];

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

//   // Sections list with more detailed sections
//   const sections = ["CSE-A", "CSE-B", "EEE", "ECE", "Civil", "Mech"];

//   // Standardize time format (convert to 24-hour format for comparison)
//   const standardizeTime = (timeStr) => {
//     // Remove any extra spaces
//     timeStr = timeStr.trim();
    
//     // Get the numeric hour value
//     if (timeFormats[timeStr.split(' ')[0]]) {
//       return timeFormats[timeStr.split(' ')[0]];
//     }
    
//     return 0;
//   };

//   // Parse a time slot to get start and end times
//   const parseTimeSlot = (timeSlot) => {
//     try {
//       // Remove the "(2 hours)" suffix if present
//       const slotText = timeSlot.replace(" (2 hours)", "");
      
//       // Split into start and end times
//       const [startTimeStr, endTimeStr] = slotText.split(" - ").map(t => t.trim());
      
//       // Convert to standardized time
//       return {
//         start: standardizeTime(startTimeStr),
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

//   // Fetch data with improved error handling
//   const fetchData = useCallback(async () => {
//     try {
//       const [timetablesRes, subjectsRes, teachersRes] = await Promise.all([
//         axiosInstance.get("/section-timetable"),
//         axiosInstance.get("/subjects"),
//         axiosInstance.get("/teachers")
//       ]);

//       setTimetables(timetablesRes.data);
//       setSubjectsList(subjectsRes.data);
//       setTeachersList(teachersRes.data);
//       setError(null);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError("Failed to load timetable data. Please try again.");
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   // Get class details for specific section, day, and time slot
//   const getClassDetails = (section, day, timeSlot) => {
//     // Find timetables for the specific section and day
//     const sectionTimetables = timetables.filter(t => 
//       t.section === section && t.day === day
//     );

//     // Find any class that overlaps with this time slot
//     const matchingTimetable = sectionTimetables.find(timetable => 
//       timetable.schedule.some(slot => timeSlotOverlaps(slot.timeSlot, timeSlot))
//     );

//     if (matchingTimetable) {
//       // Find the specific matching slot
//       const matchingSlot = matchingTimetable.schedule.find(slot => 
//         timeSlotOverlaps(slot.timeSlot, timeSlot)
//       );

//       if (matchingSlot) {
//         // Check if this is the starting time slot of the class
//         const isStarting = isStartingTimeSlot(matchingSlot.timeSlot, timeSlot);
//         const duration = getSlotDuration(matchingSlot.timeSlot);

//         return {
//           subject: getSubjectName(matchingSlot.subjectId),
//           section: matchingTimetable.section,
//           id: matchingSlot._id,
//           timeSlot: matchingSlot.timeSlot,
//           isStartingSlot: isStarting,
//           is2HourSlot: duration === 2
//         };
//       }
//     }
    
//     return null;
//   };

//   // Improved helper to find the subject name - handles both object and ID
//   const getSubjectName = (subjectId) => {
//     if (subjectId && typeof subjectId === 'object' && subjectId.name) {
//       return subjectId.name;
//     }
//     const subject = subjectsList.find(s => s._id === subjectId);
//     return subject ? subject.name : "Unknown";
//   };

//   // Get teacher name by ID with improved lookup
//   const getTeacherName = (teacherId) => {
//     const teacherById = teachersList.find(t => t._id === teacherId);
//     if (teacherById) return teacherById.name;
  
//     const teacherByTeacherId = teachersList.find(t => t.teacherId === teacherId);
//     if (teacherByTeacherId) return teacherByTeacherId.name;
  
//     return "Unknown";
//   };

//   // Validate before adding/updating timetable
//   const validateTimetableData = () => {
//     const { section, subjectId, teacherId, day, timeSlot } = timetableData;
    
//     // Check for empty fields
//     if (!section || !subjectId || !teacherId || !day || !timeSlot) {
//       setError("All fields are required.");
//       return false;
//     }

//     // Check for duplicate slots
//     const isDuplicate = timetables.some(timetable => 
//       timetable.section === section && 
//       timetable.day === day && 
//       timetable.schedule.some(slot => slot.timeSlot === timeSlot)
//     );

//     if (isDuplicate) {
//       setError("A slot already exists for this section, day, and time.");
//       return false;
//     }

//     return true;
//   };

//   const handleChange = (e) => {
//     setTimetableData({ ...timetableData, [e.target.name]: e.target.value });
//     // Clear any previous errors when user starts editing
//     setError(null);
//   };

//   const addTimetable = async () => {
//     if (!validateTimetableData()) return;

//     try {
//       await axiosInstance.post("/section-timetable/add-slot", {
//         section: timetableData.section,
//         day: timetableData.day,
//         schedule: [{
//           timeSlot: timetableData.timeSlot,
//           subject: getSubjectName(timetableData.subjectId),
//           subjectId: timetableData.subjectId,
//           teacherId: timetableData.teacherId
//         }]
//       });
      
//       fetchData();
//       resetForm();
//     } catch (error) {
//       setError(error.response?.data?.message || "Error adding timetable");
//       console.error("Error adding timetable:", error);
//     }
//   };

//   const updateTimetable = async () => {
//     if (!validateTimetableData()) return;

//     try {
//       // Delete the existing slot first
//       await axiosInstance.delete(`/section-timetable/${timetableData.section}/${timetableData.day}/${currentTimetableId}`);
      
//       // Then add the new slot
//       await axiosInstance.post("/section-timetable/add-slot", {
//         section: timetableData.section,
//         day: timetableData.day,
//         schedule: [{
//           timeSlot: timetableData.timeSlot,
//           subject: getSubjectName(timetableData.subjectId),
//           subjectId: timetableData.subjectId,
//           teacherId: timetableData.teacherId
//         }]
//       });
      
//       fetchData();
//       resetForm();
//     } catch (error) {
//       setError(error.response?.data?.message || "Error updating timetable");
//       console.error("Error updating timetable:", error);
//     }
//   };

//   const handleDelete = async (section, day, slotId) => {
//     if (window.confirm("Are you sure you want to delete this timetable slot?")) {
//       try {
//         await axiosInstance.delete(`/section-timetable/${section}/${day}/${slotId}`);
//         fetchData();
//       } catch (error) {
//         setError(error.response?.data?.message || "Error deleting timetable slot");
//         console.error("Error deleting timetable slot:", error);
//       }
//     }
//   };

//   const handleEdit = (timetable, slot) => {
//     setIsEditing(true);
//     setCurrentTimetableId(slot._id);
//     setTimetableData({
//       section: timetable.section,
//       subjectId: slot.subjectId,
//       teacherId: slot.teacherId,
//       day: timetable.day,
//       timeSlot: slot.timeSlot,
//     });
//     setShowModal(true);
//   };

//   const resetForm = () => {
//     setShowModal(false);
//     setIsEditing(false);
//     setTimetableData({
//       section: "",
//       subjectId: "",
//       teacherId: "",
//       day: "",
//       timeSlot: "",
//     });
//     setError(null);
//   };

//   // Filter timetables by section and search query
//   const filteredTimetables = timetables.filter((timetable) => {
//     const sectionMatch = selectedSection ? 
//       timetable.section === selectedSection : 
//       true;
    
//     if (searchQuery) {
//       const normalizedQuery = searchQuery.toLowerCase().trim();
//       const sectionMatch = timetable.section.toLowerCase().includes(normalizedQuery);
//       const scheduleMatch = timetable.schedule.some(slot => 
//         getSubjectName(slot.subjectId).toLowerCase().includes(normalizedQuery) ||
//         getTeacherName(slot.teacherId).toLowerCase().includes(normalizedQuery)
//       );
      
//       return sectionMatch && (selectedSection ? timetable.section === selectedSection : true);
//     }
    
//     return sectionMatch;
//   });

//   return (
//     <div className="container mt-4">
//       <h2>Manage Section Timetable</h2>
      
//       {error && (
//         <Alert 
//           variant="danger" 
//           onClose={() => setError(null)} 
//           dismissible
//         >
//           {error}
//         </Alert>
//       )}
      
//       <div className="d-flex justify-content-between mb-3">
//         <div className="flex-grow-1 me-2">
//           {viewMode === "grid" ? (
//             <Form.Select 
//               value={selectedSection} 
//               onChange={(e) => {
//                 setSelectedSection(e.target.value);
//                 setSearchQuery(""); // Reset search query when changing section
//               }}
//               className="mb-3"
//             >
//               <option value="">Select Section</option>
//               {sections.map((section) => (
//                 <option key={section} value={section}>
//                   Section {section}
//                 </option>
//               ))}
//             </Form.Select>
//           ) : (
//             <Form.Control
//               type="text"
//               placeholder="Search by Sections"
//               className="mb-3"
//               value={searchQuery}
//               onChange={(e) => {
//                 setSearchQuery(e.target.value);
//                 setSelectedSection(""); // Reset section when searching
//               }}
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
//           <Button onClick={() => {
//             setShowModal(true);
//             setError(null);
//           }}>
//             Add Timetable Slot
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
//                     const classDetails = getClassDetails(
//                       selectedSection || sections[0], 
//                       day, 
//                       timeSlot
//                     );
                    
//                     const cellClass = classDetails 
//                       ? `has-class 
//                          ${!classDetails.isStartingSlot ? 'continuation' : ''}
//                          ${classDetails.is2HourSlot ? 'two-hour-slot' : ''}`
//                       : "";
                      
//                     return (
//                       <td 
//                         key={`${day}-${timeSlot}`} 
//                         className={cellClass}
//                         rowSpan={classDetails && classDetails.is2HourSlot ? 2 : 1}
//                       >
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
//                                     const timetable = filteredTimetables.find(t => 
//                                       t.section === classDetails.section && 
//                                       t.schedule.some(s => s._id === classDetails.id)
//                                     );
//                                     handleEdit(timetable, classDetails);
//                                   }}
//                                 >
//                                   Edit
//                                 </Button>
//                                 <Button 
//                                   variant="danger" 
//                                   size="sm" 
//                                   className="py-0 px-1"
//                                   onClick={() => handleDelete(
//                                     classDetails.section, 
//                                     day, 
//                                     classDetails.id
//                                   )}
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

//       {/* List View */}
//       {viewMode === "list" && (
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Section</th>
//               <th>Day</th>
//               <th>Time Slot</th>
//               <th>Subject</th>
//               <th>Teacher</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredTimetables.flatMap((timetable) => 
//               timetable.schedule.map((slot) => (
//                 <tr key={slot._id}>
//                   <td>{timetable.section}</td>
//                   <td>{timetable.day}</td>
//                   <td>{slot.timeSlot}</td>
//                   <td>{getSubjectName(slot.subjectId)}</td>
//                   <td>{getTeacherName(slot.teacherId)}</td>
//                   <td>
//                     <Button 
//                       variant="warning" 
//                       className="me-2" 
//                       onClick={() => handleEdit(timetable, slot)}
//                     >
//                       Edit
//                     </Button>
//                     <Button 
//                       variant="danger" 
//                       onClick={() => handleDelete(timetable.section, timetable.day, slot._id)}
//                     >
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </Table>
//       )}

//       {/* Modal for Adding/Editing Timetable Slot */}
//       <Modal show={showModal} onHide={resetForm}>
//         <Modal.Header closeButton>
//           <Modal.Title>{isEditing ? "Edit Timetable Slot" : "Add Timetable Slot"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-2">
//               <Form.Label>Section</Form.Label>
//               <Form.Select name="section" value={timetableData.section} onChange={handleChange}>
//                 <option value="">Select a section</option>
//                 {sections.map((section) => (
//                   <option key={section} value={section}>Section {section}</option>
//                 ))}
//               </Form.Select>
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
//               <Form.Label>Teacher</Form.Label>
//               <Form.Select name="teacherId" value={timetableData.teacherId} onChange={handleChange}>
//                 <option value="">Select a teacher</option>
//                 {teachersList.map((teacher) => (
//                   <option key={teacher._id} value={teacher.teacherId}>{teacher.name} ({teacher.teacherId})</option>
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

//       {/* Inline Styles */}
//       <style type="text/css">{`
//         .timetable-grid {
//           table-layout: fixed;
//         }
//         .two-hour-slot {
//           background-color: #e6f2ff !important;
//         }
//         .continuation {
//           background-color: #f0f0f0;
//           color: #666;
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
//         .class-cell {
//           padding: 8px;
//         }
//         .subject-name {
//           font-weight: bold;
//           color: #1565c0;
//         }
//         .teacher-name {
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

// export default ManageSectionTimetable;

import React, { useEffect, useState, useCallback } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Table, Button, Modal, Form, Alert } from "react-bootstrap";
import "../../styles/AdminShared.css";

const ManageSectionTimetable = () => {
  const [timetables, setTimetables] = useState([]);
  const [subjectsList, setSubjectsList] = useState([]);
  const [teachersList, setTeachersList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTimetableId, setCurrentTimetableId] = useState(null);
  const [selectedSection, setSelectedSection] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [error, setError] = useState(null);

  const [timetableData, setTimetableData] = useState({
    section: "",
    subjectId: "",
    teacherId: "",
    day: "",
    timeSlot: "",
  });

  // Time formats and slots
  const timeFormats = {
    "9:00": 9, "10:00": 10, "11:00": 11, "12:00": 12,
    "1:00": 13, "2:00": 14, "3:00": 15, "4:00": 16
  };

  const baseTimeSlots = [
    "9:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", 
    "12:00 - 1:00", "1:00 - 2:00", "2:00 - 3:00", "3:00 - 4:00"
  ];

  const generateTwoHourSlots = () => {
    const twoHourSlots = [];
    for (let i = 0; i < baseTimeSlots.length - 1; i++) {
      const startTime = baseTimeSlots[i].split(" - ")[0];
      const endTime = baseTimeSlots[i + 1].split(" - ")[1];
      twoHourSlots.push(`${startTime} - ${endTime}`);
    }
    return twoHourSlots;
  };

  // Sections and days
  const sections = ["CSE-A", "CSE-B", "EEE", "ECE", "Civil", "Mech"];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Standardize and parse time slots
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

  // Expand time slots for consistency
  const expandTimeSlots = (schedule) => {
    const expandedSchedule = [];
    
    schedule.forEach(slot => {
      const parsedSlot = parseTimeSlot(slot.timeSlot);
      
      // If it's a two-hour slot, create individual hour slots
      if (parsedSlot.end - parsedSlot.start > 1) {
        for (let i = parsedSlot.start; i < parsedSlot.end; i++) {
          const hourSlot = `${Object.keys(timeFormats).find(k => timeFormats[k] === i)} - ${Object.keys(timeFormats).find(k => timeFormats[k] === i + 1)}`;
          
          expandedSchedule.push({
            ...slot,
            timeSlot: hourSlot,
            isStartingSlot: i === parsedSlot.start
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

    return expandedSchedule;
  };

  // Fetch and process data
  const fetchData = useCallback(async () => {
    try {
      const [timetablesRes, subjectsRes, teachersRes] = await Promise.all([
        axiosInstance.get("/section-timetable"),
        axiosInstance.get("/subjects"),
        axiosInstance.get("/teachers")
      ]);

      // Expand time slots for each timetable
      const processedTimetables = timetablesRes.data.map(timetable => ({
        ...timetable,
        schedule: expandTimeSlots(timetable.schedule)
      }));

      setTimetables(processedTimetables);
      setSubjectsList(subjectsRes.data);
      setTeachersList(teachersRes.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load timetable data. Please try again.");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Helper functions for subject and teacher names
  const getSubjectName = (subjectId) => {
    const subject = subjectsList.find(s => s._id === subjectId);
    return subject ? subject.name : "Unknown";
  };

  const getTeacherName = (teacherId) => {
    const teacher = teachersList.find(t => t._id === teacherId || t.teacherId === teacherId);
    return teacher ? teacher.name : "Unknown";
  };

  // Get class details for a specific slot
  const getClassDetails = (section, day, timeSlot) => {
    const sectionTimetables = timetables.filter(t => 
      t.section === section && t.day === day
    );

    const matchingSlot = sectionTimetables
      .flatMap(t => t.schedule)
      .find(slot => slot.timeSlot === timeSlot);

    return matchingSlot ? {
      subject: getSubjectName(matchingSlot.subjectId),
      section: section,
      timeSlot: matchingSlot.timeSlot,
      isStartingSlot: matchingSlot.isStartingSlot,
      slotId: matchingSlot._id,
      subjectId: matchingSlot.subjectId,
      teacherId: matchingSlot.teacherId
    } : null;
  };

  // Validate timetable data
  const validateTimetableData = () => {
    const { section, subjectId, teacherId, day, timeSlot } = timetableData;
    
    if (!section || !subjectId || !teacherId || !day || !timeSlot) {
      setError("All fields are required.");
      return false;
    }

    const isDuplicate = timetables.some(timetable => 
      timetable.section === section && 
      timetable.day === day && 
      timetable.schedule.some(slot => slot.timeSlot === timeSlot)
    );

    if (isDuplicate) {
      setError("A slot already exists for this section, day, and time.");
      return false;
    }

    return true;
  };

  // Handle form changes
  const handleChange = (e) => {
    setTimetableData({ ...timetableData, [e.target.name]: e.target.value });
    setError(null);
  };

  // Add timetable slot
  const addTimetable = async () => {
    if (!validateTimetableData()) return;

    try {
      await axiosInstance.post("/section-timetable/add-slot", {
        section: timetableData.section,
        day: timetableData.day,
        schedule: [{
          timeSlot: timetableData.timeSlot,
          subject: getSubjectName(timetableData.subjectId),
          subjectId: timetableData.subjectId,
          teacherId: timetableData.teacherId
        }]
      });
      
      fetchData();
      resetForm();
    } catch (error) {
      setError(error.response?.data?.message || "Error adding timetable");
      console.error("Error adding timetable:", error);
    }
  };

  // Update timetable slot
  const updateTimetable = async () => {
    if (!validateTimetableData()) return;

    try {
      // Delete the existing slot first
      await axiosInstance.delete(`/section-timetable/${timetableData.section}/${timetableData.day}/${currentTimetableId}`);
      
      // Then add the new slot
      await axiosInstance.post("/section-timetable/add-slot", {
        section: timetableData.section,
        day: timetableData.day,
        schedule: [{
          timeSlot: timetableData.timeSlot,
          subject: getSubjectName(timetableData.subjectId),
          subjectId: timetableData.subjectId,
          teacherId: timetableData.teacherId
        }]
      });
      
      fetchData();
      resetForm();
    } catch (error) {
      setError(error.response?.data?.message || "Error updating timetable");
      console.error("Error updating timetable:", error);
    }
  };

  // Handle delete
  const handleDelete = async (section, day, slotId) => {
    if (window.confirm("Are you sure you want to delete this timetable slot?")) {
      try {
        await axiosInstance.delete(`/section-timetable/${section}/${day}/${slotId}`);
        fetchData();
      } catch (error) {
        setError(error.response?.data?.message || "Error deleting timetable slot");
        console.error("Error deleting timetable slot:", error);
      }
    }
  };

  // Handle edit
  const handleEdit = (timetable, slot) => {
    setIsEditing(true);
    setCurrentTimetableId(slot.slotId);
    setTimetableData({
      section: timetable.section,
      subjectId: slot.subjectId,
      teacherId: slot.teacherId,
      day: timetable.day,
      timeSlot: slot.timeSlot,
    });
    setShowModal(true);
  };

  // Reset form
  const resetForm = () => {
    setShowModal(false);
    setIsEditing(false);
    setTimetableData({
      section: "",
      subjectId: "",
      teacherId: "",
      day: "",
      timeSlot: "",
    });
    setError(null);
  };

  // Filter timetables
  const filteredTimetables = timetables.filter((timetable) => {
    const sectionMatch = selectedSection ? 
      timetable.section === selectedSection : 
      true;
    
    if (searchQuery) {
      const normalizedQuery = searchQuery.toLowerCase().trim();
      const sectionMatch = timetable.section.toLowerCase().includes(normalizedQuery);
      const scheduleMatch = timetable.schedule.some(slot => 
        getSubjectName(slot.subjectId).toLowerCase().includes(normalizedQuery) ||
        getTeacherName(slot.teacherId).toLowerCase().includes(normalizedQuery)
      );
      
      return sectionMatch && (selectedSection ? timetable.section === selectedSection : true);
    }
    
    return sectionMatch;
  });

  return (
    <div className="container mt-4">
      <h2>Manage Section Timetable</h2>
      
      {error && (
        <Alert 
          variant="danger" 
          onClose={() => setError(null)} 
          dismissible
        >
          {error}
        </Alert>
      )}
      
      <div className="d-flex justify-content-between mb-3">
        <div className="flex-grow-1 me-2">
          {viewMode === "grid" ? (
            <Form.Select 
              value={selectedSection} 
              onChange={(e) => {
                setSelectedSection(e.target.value);
                setSearchQuery(""); // Reset search query when changing section
              }}
              className="mb-3"
            >
              <option value="">Select Section</option>
              {sections.map((section) => (
                <option key={section} value={section}>
                  Section {section}
                </option>
              ))}
            </Form.Select>
          ) : (
            <Form.Control
              type="text"
              placeholder="Search by Sections"
              className="mb-3"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedSection(""); // Reset section when searching
              }}
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
          <Button onClick={() => {
            setShowModal(true);
            setError(null);
          }}>
            Add Timetable Slot
          </Button>
        </div>
      </div>

      {/* Grid View */}
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
              {baseTimeSlots.map((timeSlot) => (
                <tr key={timeSlot}>
                  <td className="time-slot">{timeSlot}</td>
                  {days.map((day) => {
                    const classDetails = getClassDetails(
                      selectedSection || sections[0], 
                      day, 
                      timeSlot
                    );
                    
                    return (
                      <td 
                        key={`${day}-${timeSlot}`} 
                        className={classDetails ? "has-class" : ""}
                      >
                        {classDetails ? (
                          <div className="class-cell">
                            <div className="subject-name">{classDetails.subject}</div>
                            <div className="section-name">{classDetails.section}</div>
                            {classDetails.isStartingSlot && (
                              <div className="actions mt-1">
                                <Button 
                                  variant="warning" 
                                  size="sm" 
                                  className="me-1 py-0 px-1"
                                  onClick={() => {
                                    const timetable = timetables.find(t => 
                                      t.section === classDetails.section && 
                                      t.day === day
                                    );
                                    handleEdit(timetable, classDetails);
                                  }}
                                >
                                  Edit
                                </Button>
                                <Button 
                                  variant="danger" 
                                  size="sm" 
                                  className="py-0 px-1"
                                  onClick={() => handleDelete(
                                    classDetails.section, 
                                    day, 
                                    classDetails.slotId
                                  )}
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

      {/* List View */}
      {viewMode === "list" && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Section</th>
              <th>Day</th>
              <th>Time Slot</th>
              <th>Subject</th>
              <th>Teacher</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTimetables.flatMap((timetable) => 
              timetable.schedule.map((slot) => (
                <tr key={slot._id}>
                  <td>{timetable.section}</td>
                  <td>{timetable.day}</td>
                  <td>{slot.timeSlot}</td>
                  <td>{getSubjectName(slot.subjectId)}</td>
                  <td>{getTeacherName(slot.teacherId)}</td>
                  <td>
                    <Button 
                      variant="warning" 
                      className="me-2" 
                      onClick={() => handleEdit(timetable, {
                        slotId: slot._id,
                        subjectId: slot.subjectId,
                        teacherId: slot.teacherId,
                        timeSlot: slot.timeSlot
                      })}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="danger" 
                      onClick={() => handleDelete(timetable.section, timetable.day, slot._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      {/* Modal for Adding/Editing Timetable Slot */}
      <Modal show={showModal} onHide={resetForm}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Timetable Slot" : "Add Timetable Slot"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Section</Form.Label>
              <Form.Select name="section" value={timetableData.section} onChange={handleChange}>
                <option value="">Select a section</option>
                {sections.map((section) => (
                  <option key={section} value={section}>Section {section}</option>
                ))}
              </Form.Select>
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
              <Form.Label>Teacher</Form.Label>
              <Form.Select name="teacherId" value={timetableData.teacherId} onChange={handleChange}>
                <option value="">Select a teacher</option>
                {teachersList.map((teacher) => (
                  <option key={teacher._id} value={teacher.teacherId}>{teacher.name} ({teacher.teacherId})</option>
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

      {/* Inline Styles */}
      <style type="text/css">{`
        .timetable-grid {
          table-layout: fixed;
        }
        .time-slot {
          font-weight: bold;
          vertical-align: middle;
        }
        .has-class {
          padding: 0;
          position: relative;
        }
        .class-cell {
          padding: 8px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .subject-name {
          font-weight: bold;
          color: #1565c0;
          margin-bottom: 4px;
        }
        .section-name {
          font-size: 0.9em;
          color: #546e7a;
          margin-bottom: 4px;
        }
        .actions {
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </div>
  );
};

export default ManageSectionTimetable;
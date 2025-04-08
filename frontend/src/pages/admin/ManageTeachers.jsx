
// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import { Table, Button, Modal, Form } from "react-bootstrap";

// const ManageTeachers = () => {
//   const [teachers, setTeachers] = useState([]);
//   const [subjectsList, setSubjectsList] = useState([]);
//   const [sections] = useState(["CSE-A", "CSE-B", "Mech", "Civil", "ECE", "EEE"]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentTeacherId, setCurrentTeacherId] = useState(null);

//   const [teacherData, setTeacherData] = useState({
//     teacherId: "",
//     name: "",
//     dob: "",
//     sections: [],
//     subjects: [],
//   });

//   useEffect(() => {
//     fetchSubjects();
//     fetchTeachers();
//   }, []);

//   const fetchTeachers = async () => {
//     try {
//       const response = await axiosInstance.get("/teachers");
//       setTeachers(response.data);
//     } catch (error) {
//       console.error("Error fetching teachers:", error);
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
//     setTeacherData({ ...teacherData, [e.target.name]: e.target.value });
//   };

//   const handleCheckboxChange = (type, value) => {
//     setTeacherData((prevData) => {
//       const updatedList = prevData[type].includes(value)
//         ? prevData[type].filter((item) => item !== value)
//         : [...prevData[type], value];
//       return { ...prevData, [type]: updatedList };
//     });
//   };

//   const addTeacher = async () => {
//     // Validate required fields before sending request
//     if (!teacherData.teacherId || !teacherData.name || !teacherData.dob || teacherData.sections.length === 0 || teacherData.subjects.length === 0) {
//       alert("All fields are required.");
//       return;
//     }
  
//     console.log("Sending data:", teacherData); // Debugging
  
//     try {
//       const response = await axiosInstance.post("/teachers", teacherData);
//       setTeachers([...teachers, response.data]); // Update state with new teacher
//       resetForm(); // Clear form after success
//     } catch (error) {
//       console.error("Error adding teacher:", error.response?.data || error);
//       alert("Failed to add teacher. Please check the input data.");
//     }
//   };
  

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this teacher?")) {
//       try {
//         await axiosInstance.delete(`/teachers/${id}`);
//         setTeachers(teachers.filter((teacher) => teacher._id !== id));
//       } catch (error) {
//         console.error("Error deleting teacher:", error);
//       }
//     }
//   };

//   const handleEdit = (teacher) => {
//     setIsEditing(true);
//     setCurrentTeacherId(teacher._id);
//     setTeacherData({
//       teacherId: teacher.teacherId,
//       name: teacher.name,
//       dob: teacher.dob,
//       sections: teacher.sections || [],
//       subjects: teacher.subjects || [],
//     });
//     setShowModal(true);
//   };

//   const updateTeacher = async () => {
//     try {
//       const response = await axiosInstance.put(`/teachers/${currentTeacherId}`, teacherData);
//       setTeachers(
//         teachers.map((teacher) =>
//           teacher._id === currentTeacherId ? { ...teacher, ...response.data } : teacher
//         )
//       );
//       resetForm();
//     } catch (error) {
//       console.error("Error updating teacher:", error);
//     }
//   };

//   const resetForm = () => {
//     setShowModal(false);
//     setIsEditing(false);
//     setTeacherData({
//       teacherId: "",
//       name: "",
//       dob: "",
//       sections: [],
//       subjects: [],
//     });
//   };

//   const filteredTeachers = teachers.filter((teacher) =>
//     teacher.teacherId?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="container mt-4">
//       <h2>Manage Teachers</h2>

//       <Form.Control
//         type="text"
//         placeholder="Search by Teacher ID"
//         className="mb-3"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//       />

//       <Button onClick={() => setShowModal(true)} className="mb-3">
//         Add Teacher
//       </Button>

//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>DOB</th>
//             <th>Sections</th>
//             <th>Subjects</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredTeachers.map((teacher) => (
//             <tr key={teacher._id}>
//               <td>{teacher.teacherId}</td>
//               <td>{teacher.name}</td>
//               <td>{teacher.dob}</td>
//               <td>{Array.isArray(teacher.sections) ? teacher.sections.join(", ") : "N/A"}</td>
//               <td>{Array.isArray(teacher.subjects) ? teacher.subjects.join(", ") : "N/A"}</td>
//               <td>
//                 <Button variant="warning" className="me-2" onClick={() => handleEdit(teacher)}>
//                   Edit
//                 </Button>
//                 <Button variant="danger" onClick={() => handleDelete(teacher._id)}>
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       <Modal show={showModal} onHide={resetForm}>
//         <Modal.Header closeButton>
//           <Modal.Title>{isEditing ? "Edit Teacher" : "Add Teacher"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-2">
//               <Form.Label>Teacher ID</Form.Label>
//               <Form.Control type="text" name="teacherId" value={teacherData.teacherId} onChange={handleChange} />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Label>Name</Form.Label>
//               <Form.Control type="text" name="name" value={teacherData.name} onChange={handleChange} />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Label>Date of Birth</Form.Label>
//               <Form.Control type="date" name="dob" value={teacherData.dob} onChange={handleChange} />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Label>Subjects</Form.Label>
//               {subjectsList.map((subject) => (
//                 <Form.Check
//                   key={subject.name}
//                   type="checkbox"
//                   label={subject.name}
//                   checked={teacherData.subjects.includes(subject.name)}
//                   onChange={() => handleCheckboxChange("subjects", subject.name)}
//                 />
//               ))}
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Label>Sections</Form.Label>
//               {sections.map((section) => (
//                 <Form.Check
//                   key={section}
//                   type="checkbox"
//                   label={section}
//                   checked={teacherData.sections.includes(section)}
//                   onChange={() => handleCheckboxChange("sections", section)}
//                 />
//               ))}
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={resetForm}>Close</Button>
//           <Button variant="primary" onClick={isEditing ? updateTeacher : addTeacher}>{isEditing ? "Update" : "Save"}</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default ManageTeachers;


import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Table, Button, Modal, Form } from "react-bootstrap";
import "../../styles/AdminShared.css";
const ManageTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [subjectsList, setSubjectsList] = useState([]);
  const [sections] = useState(["CSE-A", "CSE-B", "Mech", "Civil", "ECE", "EEE"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTeacherId, setCurrentTeacherId] = useState(null);

  const [teacherData, setTeacherData] = useState({
    teacherId: "",
    name: "",
    dob: "",
    sections: [],
    subjects: [],
  });

  useEffect(() => {
    fetchSubjects();
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axiosInstance.get("/teachers");
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
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

  const handleChange = (e) => {
    setTeacherData({ ...teacherData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (type, value) => {
    setTeacherData((prevData) => {
      const updatedList = prevData[type].includes(value)
        ? prevData[type].filter((item) => item !== value)
        : [...prevData[type], value];
      return { ...prevData, [type]: updatedList };
    });
  };

  const addTeacher = async () => {
    // Validate required fields before sending request
    if (!teacherData.teacherId || !teacherData.name || !teacherData.dob || teacherData.sections.length === 0 || teacherData.subjects.length === 0) {
      alert("All fields are required.");
      return;
    }
  
    try {
      const response = await axiosInstance.post("/teachers", teacherData);
      // Update the teachers list
      fetchTeachers();
      resetForm(); // Clear form after success
    } catch (error) {
      console.error("Error adding teacher:", error.response?.data || error);
      alert("Failed to add teacher. Please check the input data.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      try {
        await axiosInstance.delete(`/teachers/${id}`);
        setTeachers(teachers.filter((teacher) => teacher._id !== id));
      } catch (error) {
        console.error("Error deleting teacher:", error);
      }
    }
  };

  const handleEdit = (teacher) => {
    setIsEditing(true);
    setCurrentTeacherId(teacher._id);
    setTeacherData({
      teacherId: teacher.teacherId,
      name: teacher.name,
      dob: teacher.dob,
      sections: teacher.sections || [],
      subjects: teacher.subjects || [],
    });
    setShowModal(true);
  };

  const updateTeacher = async () => {
    try {
      await axiosInstance.put(`/teachers/${currentTeacherId}`, teacherData);
      // Refresh the list to get updated data
      fetchTeachers();
      resetForm();
    } catch (error) {
      console.error("Error updating teacher:", error);
    }
  };

  const resetForm = () => {
    setShowModal(false);
    setIsEditing(false);
    setTeacherData({
      teacherId: "",
      name: "",
      dob: "",
      sections: [],
      subjects: [],
    });
  };

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.teacherId?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2>Manage Teachers</h2>

      <Form.Control
        type="text"
        placeholder="Search by Teacher ID"
        className="mb-3"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Button onClick={() => setShowModal(true)} className="mb-3">
        Add Teacher
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Sections</th>
            <th>Subjects</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTeachers.map((teacher) => (
            <tr key={teacher._id}>
              <td>{teacher.teacherId}</td>
              <td>{teacher.name}</td>
              <td>{teacher.dob}</td>
              <td>{Array.isArray(teacher.sections) ? teacher.sections.join(", ") : "N/A"}</td>
              <td>{Array.isArray(teacher.subjects) ? teacher.subjects.join(", ") : "N/A"}</td>
              <td>
                <Button variant="warning" className="me-2" onClick={() => handleEdit(teacher)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(teacher._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={resetForm}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Teacher" : "Add Teacher"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Teacher ID</Form.Label>
              <Form.Control 
                type="text" 
                name="teacherId" 
                value={teacherData.teacherId} 
                onChange={handleChange} 
                disabled={isEditing} // Disable ID field when editing
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={teacherData.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control 
                type="date" 
                name="dob" 
                value={teacherData.dob} 
                onChange={handleChange} 
                disabled={isEditing} // Disable DOB field when editing
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Subjects</Form.Label>
              {subjectsList.map((subject) => (
                <Form.Check
                  key={subject._id}
                  type="checkbox"
                  label={subject.name}
                  checked={teacherData.subjects.includes(subject.name)}
                  onChange={() => handleCheckboxChange("subjects", subject.name)}
                />
              ))}
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Sections</Form.Label>
              {sections.map((section) => (
                <Form.Check
                  key={section}
                  type="checkbox"
                  label={section}
                  checked={teacherData.sections.includes(section)}
                  onChange={() => handleCheckboxChange("sections", section)}
                />
              ))}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={resetForm}>Close</Button>
          <Button variant="primary" onClick={isEditing ? updateTeacher : addTeacher}>{isEditing ? "Update" : "Save"}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageTeachers;
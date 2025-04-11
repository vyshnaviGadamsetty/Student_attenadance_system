
// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import { Table, Button, Modal, Form } from "react-bootstrap";


// const ManageStudents = () => {
//   const [students, setStudents] = useState([]);
//   const [subjectsList, setSubjectsList] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentStudentId, setCurrentStudentId] = useState(null);

//   const [studentData, setStudentData] = useState({
//     studentId: "",
//     name: "",
//     dob: "",
//     department: "",
//     section: "",
//     subjects: [],
//   });

//   useEffect(() => {
//     fetchSubjects();
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const response = await axiosInstance.get("/students");
//       setStudents(response.data);
//     } catch (error) {
//       console.error("Error fetching students:", error);
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
//     setStudentData({ ...studentData, [e.target.name]: e.target.value });
//   };

//   const handleSubjectsChange = (e) => {
//     if (isEditing) {
//       const selectedSubjects = Array.from(e.target.selectedOptions, (option) => option.value);
//       setStudentData({ ...studentData, subjects: selectedSubjects });
//     }
//   };

//   // const addStudent = async () => {
//   //   if (!studentData.studentId || !studentData.name || !studentData.dob || !studentData.department || !studentData.section) {
//   //     alert("All fields are required.");
//   //     return;
//   //   }

//   //   const departmentSubjects = subjectsList.map((subject) => subject._id);
//   //   const newStudentData = { ...studentData, subjects: departmentSubjects };

//   //   try {
//   //     const response = await axiosInstance.post("/students", newStudentData);
//   //     setStudents([...students, response.data]); // Update UI immediately
//   //     resetForm();
//   //   } catch (error) {
//   //     console.error("Error adding student:", error);
//   //   }
//   // };
//   const addStudent = async (e) => {
//     e?.preventDefault(); // <-- Prevent page reload if form was submitted
//     if (!studentData.studentId || !studentData.name || !studentData.dob || !studentData.department || !studentData.section) {
//       alert("All fields are required.");
//       return;
//     }
  
//     const departmentSubjects = subjectsList.map((subject) => subject._id);
//     const newStudentData = { ...studentData, subjects: departmentSubjects };
  
//     try {
//       const response = await axiosInstance.post("/students", newStudentData);
//       setStudents([...students, response.data]);
//       resetForm();
//     } catch (error) {
//       console.error("Error adding student:", error);
//     }
//   };
  
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this student?")) {
//       try {
//         await axiosInstance.delete(`/students/${id}`);
//         setStudents(students.filter((student) => student._id !== id)); // Update UI immediately
//       } catch (error) {
//         console.error("Error deleting student:", error);
//       }
//     }
//   };

//   const handleEdit = (student) => {
//     setIsEditing(true);
//     setCurrentStudentId(student._id);
//     setStudentData({
//       studentId: student.studentId,
//       name: student.name,
//       dob: student.dob,
//       department: student.department,
//       section: student.section,
//       subjects: student.subjects || [],
//     });
//     setShowModal(true);
//   };

//   const updateStudent = async () => {
//     try {
//       const response = await axiosInstance.put(`/students/${currentStudentId}`, studentData);

//       setStudents(
//         students.map((student) =>
//           student._id === currentStudentId ? { ...student, ...response.data } : student
//         )
//       ); // Update UI immediately

//       resetForm();
//     } catch (error) {
//       console.error("Error updating student:", error);
//     }
//   };

//   const resetForm = () => {
//     setShowModal(false);
//     setIsEditing(false);
//     setStudentData({
//       studentId: "",
//       name: "",
//       dob: "",
//       department: "",
//       section: "",
//       subjects: [],
//     });
//   };

//   const filteredStudents = students.filter((student) =>
//     student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="container mt-4">
//       <h2>Manage Students</h2>

//       <Form.Control
//         type="text"
//         placeholder="Search by Student ID"
//         className="mb-3"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//       />

//       <Button onClick={() => setShowModal(true)} className="mb-3">
//         Add Student
//       </Button>

//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>DOB</th>
//             <th>Department</th>
//             <th>Section</th>
//             <th>Subjects</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredStudents.map((student) => (
//             <tr key={student._id}>
//               <td>{student.studentId}</td>
//               <td>{student.name}</td>
//               <td>{student.dob}</td>
//               <td>{student.department}</td>
//               <td>{student.section}</td>
//               <td>
//                 {student.subjects.map((subjectId) => {
//                   const subject = subjectsList.find((sub) => sub._id === subjectId);
//                   return subject ? subject.subjectId : "Unknown";
//                 }).join(", ")}
//               </td>
//               <td>
//                 <Button variant="warning" className="me-2" onClick={() => handleEdit(student)}>
//                   Edit
//                 </Button>
//                 <Button variant="danger" onClick={() => handleDelete(student._id)}>
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Add/Edit Student Modal */}
//       <Modal show={showModal} onHide={resetForm}>
//         <Modal.Header closeButton>
//           <Modal.Title>{isEditing ? "Edit Student" : "Add Student"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-2">
//               <Form.Label>Student ID</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="studentId"
//                 value={studentData.studentId}
//                 onChange={handleChange}
//                 disabled={isEditing}
//               />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Label>Name</Form.Label>
//               <Form.Control type="text" name="name" value={studentData.name} onChange={handleChange} />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Label>Date of Birth</Form.Label>
//               <Form.Control type="date" name="dob" value={studentData.dob} onChange={handleChange} />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Label>Department</Form.Label>
//               <Form.Control type="text" name="department" value={studentData.department} onChange={handleChange} />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Label>Section</Form.Label>
//               <Form.Control type="text" name="section" value={studentData.section} onChange={handleChange} />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Label>Subjects</Form.Label>
//               <Form.Select multiple disabled={!isEditing} onChange={handleSubjectsChange}>
//                 {subjectsList.map((subject) => (
//                   <option key={subject._id} value={subject._id} selected={studentData.subjects.includes(subject._id)}>
//                     {subject.subjectId}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={resetForm}>Close</Button>
//           <Button variant="primary" onClick={isEditing ? updateStudent : addStudent}>
//             {isEditing ? "Update" : "Save"}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default ManageStudents;




// export default ManageStudents;
import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Table, Button, Modal, Form, Alert } from "react-bootstrap";
import "../../styles/AdminShared.css";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [subjectsList, setSubjectsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState(null);
  const [showAlert, setShowAlert] = useState({ show: false, message: "", variant: "success" });

  const [studentData, setStudentData] = useState({
    studentId: "",
    name: "",
    dob: "",
    department: "",
    section: "",
    subjects: [],
  });

  useEffect(() => {
    fetchSubjects();
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axiosInstance.get("/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
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
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleSubjectsChange = (e) => {
    if (isEditing) {
      const selectedSubjects = Array.from(e.target.selectedOptions, (option) => option.value);
      setStudentData({ ...studentData, subjects: selectedSubjects });
    }
  };

  const addStudent = async () => {
    if (!studentData.studentId || !studentData.name || !studentData.dob || !studentData.department || !studentData.section) {
      alert("All fields are required.");
      return;
    }

    const departmentSubjects = subjectsList.map((subject) => subject._id);
    const newStudentData = { ...studentData, subjects: departmentSubjects };

    try {
      const response = await axiosInstance.post("/students", newStudentData);
      setStudents([...students, response.data.student]);
      showToast("Student added successfully!", "success");
      resetForm();
    } catch (error) {
      console.error("Error adding student:", error);
      showToast("Failed to add student.", "danger");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axiosInstance.delete(`/students/${id}`);
        setStudents(students.filter((student) => student._id !== id));
        showToast("Student deleted successfully!", "success");
      } catch (error) {
        console.error("Error deleting student:", error);
        showToast("Failed to delete student.", "danger");
      }
    }
  };

  const handleEdit = (student) => {
    setIsEditing(true);
    setCurrentStudentId(student._id);
    setStudentData({
      studentId: student.studentId,
      name: student.name,
      dob: student.dob,
      department: student.department,
      section: student.section,
      subjects: student.subjects || [],
    });
    setShowModal(true);
  };

  const updateStudent = async () => {
    try {
      const response = await axiosInstance.put(`/students/${currentStudentId}`, studentData);
      const updated = response.data.student || response.data;
      setStudents(
        students.map((student) =>
          student._id === currentStudentId ? { ...student, ...updated } : student
        )
      );
      showToast("Student updated successfully!", "success");
      resetForm();
    } catch (error) {
      console.error("Error updating student:", error);
      showToast("Failed to update student.", "danger");
    }
  };

  const resetForm = () => {
    setShowModal(false);
    setIsEditing(false);
    setStudentData({
      studentId: "",
      name: "",
      dob: "",
      department: "",
      section: "",
      subjects: [],
    });
  };

  const showToast = (message, variant = "success") => {
    setShowAlert({ show: true, message, variant });
    setTimeout(() => {
      setShowAlert({ show: false, message: "", variant: "success" });
    }, 3000);
  };

  const filteredStudents = students.filter((student) =>
    student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <h2 className="header">Manage Students</h2>

      {showAlert.show && (
        <Alert variant={showAlert.variant} onClose={() => setShowAlert({ ...showAlert, show: false })} dismissible>
          {showAlert.message}
        </Alert>
      )}

      <div className="box">
        <div className="action-row">
          <Form.Control
            type="text"
            placeholder="Search by Student ID"
            className="form-control"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <Button className="btn-primary" onClick={() => setShowModal(true)}>
            Add Student
          </Button>
        </div>

        <Table striped bordered hover className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>DOB</th>
              <th>Department</th>
              <th>Section</th>
              <th>Subjects</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student._id}>
                <td>{student.studentId}</td>
                <td>{student.name}</td>
                <td>{student.dob}</td>
                <td>{student.department}</td>
                <td>{student.section}</td>
                <td>
                  {student.subjects.map((subjectId) => {
                    const subject = subjectsList.find((sub) => sub._id === subjectId);
                    return subject ? subject.subjectId : "Unknown";
                  }).join(", ")}
                </td>
                <td>
                  <Button variant="warning" className="admin-btn-warning" onClick={() => handleEdit(student)}>
                    Edit
                  </Button>
                  <Button variant="danger" className="admin-btn-danger" onClick={() => handleDelete(student._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal */}
      <Modal className="student-modal" show={showModal} onHide={resetForm}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Student" : "Add Student"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Student ID</Form.Label>
              <Form.Control
                type="text"
                name="studentId"
                value={studentData.studentId}
                onChange={handleChange}
                className="admin-form-control"
                disabled={isEditing}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={studentData.name}
                onChange={handleChange}
                className="admin-form-control"
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={studentData.dob}
                onChange={handleChange}
                className="admin-form-control"
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                name="department"
                value={studentData.department}
                onChange={handleChange}
                className="admin-form-control"
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Section</Form.Label>
              <Form.Control
                type="text"
                name="section"
                value={studentData.section}
                onChange={handleChange}
                className="admin-form-control"
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Subjects</Form.Label>
              <Form.Select multiple disabled={!isEditing} onChange={handleSubjectsChange} className="admin-form-select">
                {subjectsList.map((subject) => (
                  <option
                    key={subject._id}
                    value={subject._id}
                    selected={studentData.subjects.includes(subject._id)}
                  >
                    {subject.subjectId}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={resetForm}>
            Close
          </Button>
          <Button className="admin-btn-primary" onClick={isEditing ? updateStudent : addStudent}>
            {isEditing ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageStudents;

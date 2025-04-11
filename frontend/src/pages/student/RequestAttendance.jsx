
import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Form, 
  Button, 
  Card, 
  Alert, 
  Spinner,
  Nav, 
  Badge
} from "react-bootstrap";

const RequestAttendance = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const studentId = storedUser?.id || "";

  const initialFormState = {
    studentId: studentId,
    teacherId: "",
    subject: "",
    date: "",
    reason: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "danger"
  const [isLoading, setIsLoading] = useState(false);
  const [showRequestStatus, setShowRequestStatus] = useState(false);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [requestHistory, setRequestHistory] = useState([]);
  const [statusLoading, setStatusLoading] = useState(false);

  // Fetch teachers and subjects for dropdowns
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [teacherRes, subjectRes] = await Promise.all([
          axios.get("http://localhost:5001/api/teachers", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5001/api/subjects", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setTeachers(teacherRes.data);
        setSubjects(subjectRes.data);
      } catch (error) {
        console.error("Error fetching teachers/subjects:", error);
      }
    };
    fetchDropdownData();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Ensure correct student ID before sending
    const requestData = {
      ...formData,
      studentId: studentId, // Force correct student ID
    };

    try {
      const res = await axios.post(
        "http://localhost:5001/api/attendance-request/request-attendance",
        requestData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(res.data.message);
      setMessageType("success");
      
      // Clear form after successful submission
      setFormData(initialFormState);
      
      // Refresh request data if we're on the status tab
      if (showRequestStatus) {
        fetchRequestData();
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Error submitting request");
      setMessageType("danger");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch student's requests
  const fetchRequestData = async () => {
    setStatusLoading(true);
    try {
      // Get pending requests
      const pendingRes = await axios.get(
        `http://localhost:5001/api/attendance-request/requests/student/${studentId}/pending`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPendingRequests(pendingRes.data);
      
      // Get request history (accepted/rejected)
      const historyRes = await axios.get(
        `http://localhost:5001/api/attendance-request/requests/student/${studentId}/history`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRequestHistory(historyRes.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
      setMessage("Error fetching your requests. Please try again.");
      setMessageType("danger");
    } finally {
      setStatusLoading(false);
    }
  };

  // Fetch data when tab changes
  useEffect(() => {
    if (showRequestStatus) {
      fetchRequestData();
    }
  }, [showRequestStatus]);

  return (
    <div className="w-100 p-4" style={{ backgroundColor: "#fff6ea", minHeight: "100vh" }}>
      <div className="d-flex flex-column align-items-center justify-content-center w-100 mb-5">
        <div className="text-center">
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center mb-3 mx-auto"
            style={{ backgroundColor: "#5c3d2e", width: "80px", height: "80px" }}
          >
            <i className="bi bi-calendar-check text-white" style={{ fontSize: "36px" }}></i>
          </div>
          <h1 className="fw-bold mb-4" style={{ color: "#5c3d2e" }}>Request Attendance</h1>
        </div>
        
        {/* Navigation tabs */}
        <div className="w-100 mb-4" style={{ maxWidth: "800px" }}>
          <Nav 
            variant="tabs" 
            className="mb-3 border-0"
            style={{ 
              backgroundColor: "transparent",
              borderRadius: "8px",
              overflow: "hidden"
            }}
          >
            <Nav.Item style={{ flex: 1 }}>
              <Nav.Link 
                active={!showRequestStatus}
                onClick={() => setShowRequestStatus(false)}
                className="text-center py-3 fw-medium"
                style={{ 
                  backgroundColor: !showRequestStatus ? "#5c3d2e" : "#ecd8c2",
                  color: !showRequestStatus ? "#fff" : "#5c3d2e",
                  border: "none",
                  borderRadius: "8px 0 0 8px"
                }}
              >
                <i className="bi bi-file-earmark-plus me-2"></i>
                New Request
              </Nav.Link>
            </Nav.Item>
            <Nav.Item style={{ flex: 1 }}>
              <Nav.Link 
                active={showRequestStatus}
                onClick={() => setShowRequestStatus(true)}
                className="text-center py-3 fw-medium"
                style={{ 
                  backgroundColor: showRequestStatus ? "#5c3d2e" : "#ecd8c2",
                  color: showRequestStatus ? "#fff" : "#5c3d2e",
                  border: "none",
                  borderRadius: "0 8px 8px 0"
                }}
              >
                <i className="bi bi-list-check me-2"></i>
                View Status
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        
        <div className="w-100" style={{ maxWidth: "800px" }}>
          {!showRequestStatus ? (
            <Card className="border-0 shadow-sm" style={{ borderRadius: "8px", backgroundColor: "#fff0dd" }}>
              <Card.Body className="p-5">
                <Form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <Form.Group>
                        <Form.Label className="fw-medium fs-5">
                          <i className="bi bi-person me-2"></i>Student ID
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={studentId}
                          disabled
                          className="bg-light py-2"
                          style={{ fontSize: "1.1rem" }}
                        />
                      </Form.Group>
                    </div>
                    
                    <div className="col-md-6 mb-4">
                      <Form.Group>
                        <Form.Label className="fw-medium fs-5">
                          <i className="bi bi-person-badge me-2"></i>Teacher
                        </Form.Label>
                        <Form.Select
                          name="teacherId"
                          value={formData.teacherId}
                          onChange={handleChange}
                          required
                          className="py-2"
                          style={{ fontSize: "1.1rem" }}
                        >
                          <option value="">Choose a teacher</option>
                          {teachers.map((t) => (
                            <option key={t.teacherId} value={t.teacherId}>
                              {t.name} ({t.teacherId})
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <Form.Group>
                        <Form.Label className="fw-medium fs-5">
                          <i className="bi bi-book me-2"></i>Subject
                        </Form.Label>
                        <Form.Select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="py-2"
                          style={{ fontSize: "1.1rem" }}
                        >
                          <option value="">Choose a subject</option>
                          {subjects.map((s) => (
                            <option key={s.subjectId} value={s.subjectId}>
                              {s.name} ({s.subjectId})
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </div>
                    
                    <div className="col-md-6 mb-4">
                      <Form.Group>
                        <Form.Label className="fw-medium fs-5">
                          <i className="bi bi-calendar me-2"></i>Date
                        </Form.Label>
                        <Form.Control
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          required
                          className="py-2"
                          style={{ fontSize: "1.1rem" }}
                        />
                      </Form.Group>
                    </div>
                  </div>
                  
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-medium fs-5">
                      <i className="bi bi-file-text me-2"></i>Reason
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      placeholder="Please explain your reason for the attendance request..."
                      style={{ minHeight: "150px", fontSize: "1.1rem" }}
                      required
                    />
                  </Form.Group>
                  
                  <div className="d-grid mt-4">
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      style={{ 
                        backgroundColor: "#5c3d2e", 
                        borderColor: "#5c3d2e",
                        padding: "12px 20px",
                        fontSize: "1.1rem"
                      }}
                      className="fw-medium"
                    >
                      {isLoading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
                          Processing...
                        </>
                      ) : (
                        <>
                          Submit Request <i className="bi bi-send ms-2"></i>
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          ) : (
            <Card className="border-0 shadow-sm" style={{ borderRadius: "8px", backgroundColor: "#fff0dd" }}>
              <Card.Body className="p-5">
                {statusLoading ? (
                  <div className="text-center my-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3">Loading your requests...</p>
                  </div>
                ) : (
                  <>
                    {/* Pending Requests Section */}
                    <div className="mb-5">
                      <h3 className="fw-bold mb-4" style={{ color: "#5c3d2e" }}>
                        <i className="bi bi-hourglass-split me-2"></i>
                        Pending Requests
                        <Badge bg="warning" className="ms-2">{pendingRequests.length}</Badge>
                      </h3>
                      
                      {pendingRequests.length === 0 ? (
                        <div className="alert alert-info">
                          You don't have any pending requests.
                        </div>
                      ) : (
                        pendingRequests.map((req) => (
                          <Card key={req._id} className="mb-3 shadow-sm">
                            <Card.Body>
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="fw-bold mb-0">{req.subject}</h5>
                                <Badge bg="warning">Pending</Badge>
                              </div>
                              <div className="row mb-2">
                                <div className="col-md-6">
                                  <p className="mb-1">
                                    <i className="bi bi-person-badge me-2"></i>
                                    <strong>Teacher:</strong> {req.teacherId}
                                  </p>
                                </div>
                                <div className="col-md-6">
                                  <p className="mb-1">
                                    <i className="bi bi-calendar me-2"></i>
                                    <strong>Date:</strong> {new Date(req.date).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <p className="mb-0">
                                <i className="bi bi-chat-quote me-2"></i>
                                <strong>Reason:</strong> {req.reason}
                              </p>
                            </Card.Body>
                          </Card>
                        ))
                      )}
                    </div>
                    
                    {/* Request History Section */}
                    <div>
                      <h3 className="fw-bold mb-4" style={{ color: "#5c3d2e" }}>
                        <i className="bi bi-clock-history me-2"></i>
                        Request History
                        <Badge bg="secondary" className="ms-2">{requestHistory.length}</Badge>
                      </h3>
                      
                      {requestHistory.length === 0 ? (
                        <div className="alert alert-info">
                          You don't have any request history.
                        </div>
                      ) : (
                        requestHistory.map((req) => (
                          <Card key={req._id} className="mb-3 shadow-sm">
                            <Card.Body>
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="fw-bold mb-0">{req.subject}</h5>
                                <Badge bg={req.status === "Accepted" ? "success" : "danger"}>
                                  {req.status}
                                </Badge>
                              </div>
                              <div className="row mb-2">
                                <div className="col-md-6">
                                  <p className="mb-1">
                                    <i className="bi bi-person-badge me-2"></i>
                                    <strong>Teacher:</strong> {req.teacherId}
                                  </p>
                                </div>
                                <div className="col-md-6">
                                  <p className="mb-1">
                                    <i className="bi bi-calendar me-2"></i>
                                    <strong>Date:</strong> {new Date(req.date).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <p className="mb-0">
                                <i className="bi bi-chat-quote me-2"></i>
                                <strong>Reason:</strong> {req.reason}
                              </p>
                            </Card.Body>
                          </Card>
                        ))
                      )}
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
          )}
          
          {message && (
            <Alert 
              variant={messageType} 
              className="mt-4"
              style={{
                borderRadius: "8px",
                padding: "12px 16px"
              }}
            >
              <i className={`bi ${messageType === "success" ? "bi-check-circle" : "bi-exclamation-circle"} me-2`}></i>
              {message}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestAttendance;
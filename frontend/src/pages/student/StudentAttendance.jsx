
import { useState, useEffect } from 'react';
import { FaBook, FaCalendarCheck, FaPercentage, FaClock } from 'react-icons/fa';

const StudentAttendance = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [attendanceCode, setAttendanceCode] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [studentName, setStudentName] = useState('');
  const [attendanceRecord, setAttendanceRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [codeStatus, setCodeStatus] = useState(null);
  const [attendanceUpdated, setAttendanceUpdated] = useState(false);

  useEffect(() => {
    fetchStudentData();
  }, [attendanceUpdated]);

  const fetchStudentData = async () => {
    const token = localStorage.getItem('token');
    const studentId = localStorage.getItem('studentId');

    if (!token || !studentId) {
      setMessage('Authentication error. Please login again.');
      setMessageType('error');
      setLoading(false);
      return;
    }

    try {
      const [studentRes, subjectRes] = await Promise.all([
        fetch(`http://localhost:5001/api/students/${studentId}`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch('http://localhost:5001/api/subjects', {
          headers: { Authorization: `Bearer ${token}` }
        }),
      ]);

      if (!studentRes.ok || !subjectRes.ok) throw new Error("Failed to fetch data");

      const studentData = await studentRes.json();
      const subjectList = await subjectRes.json();
      setStudentName(studentData.name);

      const allSubjects = [];

      studentData.attendance?.forEach((entry) => {
        const subject = subjectList.find((s) => s._id === entry.subject);
        if (subject) {
          allSubjects.push({
            _id: subject._id,
            subjectId: subject.subjectId,
            name: subject.name,
            attendedClasses: entry.attendedClasses || 0,
            totalClasses: entry.totalClasses || 0,
            percentage: entry.percentage || 0,
            lastMarked: entry.lastMarked || null,
          });
        }
      });

      setSubjects(allSubjects);
    } catch (err) {
      console.error(err);
      setMessage('Failed to fetch student or subject data');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const checkCodeStatus = async (subjectMongoId) => {
    if (!subjectMongoId) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5001/api/attendance/code-status/${subjectMongoId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) return setCodeStatus(null);
      const data = await res.json();
      setCodeStatus(data);
    } catch (err) {
      console.error("Error checking code status:", err);
      setCodeStatus(null);
    }
  };

  const handleSubjectChange = (e) => {
    const mongoId = e.target.value;
    setSelectedSubject(mongoId);
    setAttendanceRecord(null);
    setMessage('');
    setMessageType('');
    checkCodeStatus(mongoId);
  };

  const handleSubmitCode = async () => {
    if (!selectedSubject || !attendanceCode.trim()) {
      setMessage("Please select a subject and enter the code.");
      setMessageType("error");
      return;
    }

    setSubmitting(true);
    const token = localStorage.getItem('token');
    const studentId = localStorage.getItem('studentId');

    try {
      const res = await fetch("http://localhost:5001/api/attendance/submit-random-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          studentId,
          subjectId: selectedSubject,
          code: attendanceCode.trim()
        })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "Attendance marked successfully!");
        setMessageType("success");
        setAttendanceRecord(data.attendance);
        setAttendanceUpdated(prev => !prev);
        setAttendanceCode('');
      } else {
        setMessage(data.message || "Invalid or expired code.");
        setMessageType("error");
      }
    } catch (err) {
      console.error("Error submitting attendance:", err);
      setMessage("Something went wrong. Try again.");
      setMessageType("error");
    } finally {
      setSubmitting(false);
    }
  };

  const selectedStats = subjects.find((s) => s._id === selectedSubject);

  if (loading) {
    return (
      <div className="dashboard-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <div className="loading">Loading student data...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Student Attendance</h1>
        <p className="subtitle">Welcome, {studentName}!</p>
      </div>

      <div className="dashboard-content-grid">
        <div className="quick-actions">
          <h2>Mark Attendance</h2>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#5c3d2e', marginBottom: '0.5rem', fontWeight: 'bold' }}>Select Subject:</label>
            <select 
              value={selectedSubject} 
              onChange={handleSubjectChange}
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '8px',
                border: '1px solid #e0d1c1',
                backgroundColor: '#fff6ea',
                color: '#5c3d2e',
                fontSize: '1rem'
              }}
            >
              <option value="">Choose a subject</option>
              {subjects.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.subjectId} - {sub.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#5c3d2e', marginBottom: '0.5rem', fontWeight: 'bold' }}>Enter Attendance Code:</label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <input
                type="text"
                value={attendanceCode}
                onChange={(e) => setAttendanceCode(e.target.value)}
                placeholder="Enter code"
                disabled={submitting}
                style={{
                  flex: '1',
                  padding: '0.8rem',
                  borderRadius: '8px',
                  border: '1px solid #e0d1c1',
                  backgroundColor: '#fff6ea',
                  color: '#5c3d2e',
                  fontSize: '1rem'
                }}
              />
              <button 
                onClick={handleSubmitCode} 
                disabled={submitting}
                style={{
                  padding: '0.8rem 1.5rem',
                  backgroundColor: '#8b5e3b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'background-color 0.3s',
                  fontSize: '1rem'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#6a412a'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#8b5e3b'}
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>

          {message && (
            <div 
              style={{
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1.5rem',
                backgroundColor: messageType === 'success' ? '#e8f5e9' : '#ffebee',
                color: messageType === 'success' ? '#2e7d32' : '#c62828',
                border: `1px solid ${messageType === 'success' ? '#a5d6a7' : '#ef9a9a'}`
              }}
            >
              {message}
            </div>
          )}

          {codeStatus && (
            <div 
              style={{
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1.5rem',
                backgroundColor: '#fff3e0',
                color: '#e65100',
                border: '1px solid #ffe0b2'
              }}
            >
              {codeStatus.active ? 
                `Active code available! Valid until ${new Date(codeStatus.expiresAt).toLocaleTimeString()}` : 
                'No active attendance code for this subject.'}
            </div>
          )}
        </div>

        {selectedStats && (
          <div className="recent-activity">
            <h2>Subject Statistics</h2>
            <div className="dashboard-cards" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="stat-card">
                <div className="card-icon" style={{ color: '#8b5e3b' }}>
                  <FaCalendarCheck />
                </div>
                <div className="card-info">
                  <h2>{selectedStats.attendedClasses}</h2>
                  <p>Classes Attended</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="card-icon" style={{ color: '#5c3d2e' }}>
                  <FaBook />
                </div>
                <div className="card-info">
                  <h2>{selectedStats.totalClasses}</h2>
                  <p>Total Classes</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="card-icon" style={{ color: selectedStats.percentage >= 75 ? '#4caf50' : '#ff9800' }}>
                  <FaPercentage />
                </div>
                <div className="card-info">
                  <h2>{selectedStats.percentage.toFixed(2)}%</h2>
                  <p>Attendance Rate</p>
                </div>
              </div>
              
              {selectedStats.lastMarked && (
                <div className="stat-card">
                  <div className="card-icon" style={{ color: '#8b5e3b' }}>
                    <FaClock />
                  </div>
                  <div className="card-info">
                    <h2 style={{ fontSize: '1.2rem' }}>{new Date(selectedStats.lastMarked).toLocaleDateString()}</h2>
                    <p>Last Attendance</p>
                  </div>
                </div>
              )}
            </div>
            
            <div style={{ marginTop: '1.5rem' }}>
              <h3 style={{ color: '#5c3d2e', fontSize: '1.1rem', marginBottom: '0.8rem' }}>
                {selectedStats.subjectId} - {selectedStats.name}
              </h3>
              <div 
                style={{ 
                  width: '100%', 
                  height: '12px', 
                  backgroundColor: '#f0e0d0', 
                  borderRadius: '6px',
                  overflow: 'hidden'
                }}
              >
                <div 
                  style={{
                    width: `${Math.min(selectedStats.percentage, 100)}%`,
                    height: '100%',
                    backgroundColor: selectedStats.percentage >= 75 ? '#4caf50' : 
                                     selectedStats.percentage >= 60 ? '#ff9800' : '#f44336',
                    borderRadius: '6px',
                    transition: 'width 0.5s ease'
                  }}
                ></div>
              </div>
              <div style={{ 
                marginTop: '0.5rem', 
                display: 'flex', 
                justifyContent: 'space-between',
                fontSize: '0.9rem',
                color: '#8b5e3b' 
              }}>
                <span>0%</span>
                <span>Minimum Required: 75%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {!selectedStats && subjects.length > 0 && (
        <div className="upcoming-classes">
          <h2>Your Subjects Overview</h2>
          <div className="class-cards">
            {subjects.map(subject => (
              <div 
                key={subject._id}
                className="class-card"
                onClick={() => setSelectedSubject(subject._id)}
                style={{ cursor: 'pointer' }}
              >
                <h3>{subject.name}</h3>
                <p className="section">{subject.subjectId}</p>
                <p className="time">Attendance: {subject.percentage.toFixed(2)}%</p>
                <div 
                  style={{ 
                    width: '100%', 
                    height: '6px', 
                    backgroundColor: '#f0e0d0', 
                    borderRadius: '3px',
                    marginTop: '0.6rem',
                    overflow: 'hidden'
                  }}
                >
                  <div 
                    style={{
                      width: `${Math.min(subject.percentage, 100)}%`,
                      height: '100%',
                      backgroundColor: subject.percentage >= 75 ? '#4caf50' : 
                                       subject.percentage >= 60 ? '#ff9800' : '#f44336',
                      borderRadius: '3px'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAttendance;
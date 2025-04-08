// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const TeacherSummaries = () => {
//     const [summaries, setSummaries] = useState([]);
//     const [section, setSection] = useState("");
//     const [content, setContent] = useState("");
//     const token = localStorage.getItem("token"); // Get token from local storage

//     // Fetch summaries for a section (last 48 hours)
//     const fetchSummaries = async () => {
//         if (!section) return;
//         try {
//             const res = await axios.get(`http://localhost:5001/api/summaries/${section}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setSummaries(res.data);
//         } catch (error) {
//             console.error("Error fetching summaries:", error.response?.data || error.message);
//         }
//     };

//     // Post a new summary
//     const handlePostSummary = async (e) => {
//         e.preventDefault();
//         if (!section || !content) return alert("Section and Content are required");

//         try {
//             await axios.post(
//                 "http://localhost:5001/api/summaries",
//                 { section, content },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             setContent(""); // Clear input field
//             fetchSummaries(); // Refresh list
//         } catch (error) {
//             console.error("Error posting summary:", error.response?.data || error.message);
//         }
//     };

//     // Delete a summary (only by the teacher who posted it)
//     const handleDeleteSummary = async (id) => {
//         if (!window.confirm("Are you sure you want to delete this summary?")) return;
//         try {
//             await axios.delete(`http://localhost:5001/api/summaries/${id}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             fetchSummaries(); // Refresh list
//         } catch (error) {
//             console.error("Error deleting summary:", error.response?.data || error.message);
//         }
//     };

//     useEffect(() => {
//         if (section) fetchSummaries();
//     }, [section]);

//     return (
//         <div className="container mt-4">
//             <h2>Teacher Summaries</h2>

//             {/* Select Section */}
//             <select className="form-control mb-3" value={section} onChange={(e) => setSection(e.target.value)}>
//                 <option value="">Select Section</option>
//                 <option value="CSE-A">CSE-A</option>
//                 <option value="CSE-B">CSE-B</option>
//                 <option value="ECE">ECE</option>
//                 <option value="EEE">EEE</option>
//                 <option value="Civil">Civil</option>
//                 <option value="Mech">Mech</option>
//             </select>

//             {/* Post Summary Form */}
//             <form onSubmit={handlePostSummary} className="mb-3">
//                 <textarea
//                     className="form-control"
//                     rows="3"
//                     placeholder="Write your summary..."
//                     value={content}
//                     onChange={(e) => setContent(e.target.value)}
//                 ></textarea>
//                 <button type="submit" className="btn btn-primary mt-2">Post Summary</button>
//             </form>

//             {/* Display Summaries */}
//             <h4>Recent Summaries</h4>
//             <ul className="list-group">
//                 {summaries.length > 0 ? (
//                     summaries.map((summary) => (
//                         <li key={summary._id} className="list-group-item d-flex justify-content-between">
//                             <div>
//                                 <strong>Section: {summary.section}</strong>
//                                 <p>{summary.content}</p>
//                                 <small>{new Date(summary.createdAt).toLocaleString()}</small>
//                             </div>
//                             <button className="btn btn-danger btn-sm" onClick={() => handleDeleteSummary(summary._id)}>
//                                 Delete
//                             </button>
//                         </li>
//                     ))
//                 ) : (
//                     <p>No summaries found for the last 48 hours.</p>
//                 )}
//             </ul>
//         </div>
//     );
// };

// export default TeacherSummaries;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaChalkboardTeacher, FaTrash, FaPaperPlane, FaBook } from "react-icons/fa";

const TeacherSummaries = () => {
    const [summaries, setSummaries] = useState([]);
    const [section, setSection] = useState("");
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem("token");

    // Fetch summaries for a section (last 48 hours)
    const fetchSummaries = async () => {
        if (!section) return;
        setIsLoading(true);
        try {
            const res = await axios.get(`http://localhost:5001/api/summaries/${section}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSummaries(res.data);
        } catch (error) {
            console.error("Error fetching summaries:", error.response?.data || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Post a new summary
    const handlePostSummary = async (e) => {
        e.preventDefault();
        if (!section || !content) {
            return alert("Section and Content are required");
        }

        setIsLoading(true);
        try {
            await axios.post(
                "http://localhost:5001/api/summaries",
                { section, content },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setContent("");
            fetchSummaries();
        } catch (error) {
            console.error("Error posting summary:", error.response?.data || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Delete a summary (only by the teacher who posted it)
    const handleDeleteSummary = async (id) => {
        if (!window.confirm("Are you sure you want to delete this summary?")) return;
        setIsLoading(true);
        try {
            await axios.delete(`http://localhost:5001/api/summaries/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchSummaries();
        } catch (error) {
            console.error("Error deleting summary:", error.response?.data || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (section) fetchSummaries();
    }, [section]);

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1><FaChalkboardTeacher /> Teacher Summaries</h1>
                <p className="subtitle">Share and view class summaries from the last 48 hours</p>
            </div>

            <div className="dashboard-content-grid">
                <div className="quick-actions">
                    <h2>Post New Summary</h2>
                    <form onSubmit={handlePostSummary}>
                        <div className="form-group mb-3">
                            <label className="form-label" style={{ color: '#5c3d2e', marginBottom: '0.5rem', display: 'block' }}>
                                Select Section
                            </label>
                            <select 
                                className="form-control" 
                                value={section} 
                                onChange={(e) => setSection(e.target.value)}
                                style={{ 
                                    width: '100%', 
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    backgroundColor: '#fff6ea',
                                    color: '#5c3d2e'
                                }}
                            >
                                <option value="">Select Section</option>
                                <option value="CSE-A">CSE-A</option>
                                <option value="CSE-B">CSE-B</option>
                                <option value="ECE">ECE</option>
                                <option value="EEE">EEE</option>
                                <option value="Civil">Civil</option>
                                <option value="Mech">Mech</option>
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label" style={{ color: '#5c3d2e', marginBottom: '0.5rem', display: 'block' }}>
                                Summary Content
                            </label>
                            <textarea
                                style={{ 
                                    width: '100%', 
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    backgroundColor: '#fff6ea',
                                    color: '#5c3d2e',
                                    minHeight: '120px',
                                    resize: 'vertical'
                                }}
                                placeholder="Write your summary..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            ></textarea>
                        </div>
                        <button 
                            type="submit" 
                            className="action-btn" 
                            style={{ 
                                width: '100%', 
                                marginTop: '1rem',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                            disabled={isLoading}
                        >
                            <FaPaperPlane /> {isLoading ? "Posting..." : "Post Summary"}
                        </button>
                    </form>
                </div>

                <div className="recent-activity">
                    <h2>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span><FaBook /> Recent Summaries</span>
                            {section && (
                                <span style={{ 
                                    fontSize: '1rem', 
                                    backgroundColor: '#5c3d2e', 
                                    color: 'white',
                                    padding: '0.3rem 0.7rem',
                                    borderRadius: '20px'
                                }}>
                                    {section}
                                </span>
                            )}
                        </div>
                    </h2>
                    
                    {isLoading ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#8b5e3b' }}>
                            Loading summaries...
                        </div>
                    ) : summaries.length > 0 ? (
                        <div className="activity-list">
                            {summaries.map((summary) => (
                                <div key={summary._id} className="activity-item" style={{ display: 'block', padding: '1rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <p className="activity-time">
                                            {new Date(summary.createdAt).toLocaleString()}
                                        </p>
                                        <button 
                                            onClick={() => handleDeleteSummary(summary._id)}
                                            style={{ 
                                                background: 'none',
                                                border: 'none',
                                                color: '#5c3d2e',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                    <p className="activity-text" style={{ 
                                        whiteSpace: 'pre-wrap',
                                        margin: '0.5rem 0',
                                        lineHeight: '1.5'
                                    }}>
                                        {summary.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ 
                            padding: '2rem', 
                            textAlign: 'center', 
                            color: '#8b5e3b',
                            backgroundColor: '#fff6ea',
                            borderRadius: '8px'
                        }}>
                            {section ? "No summaries found for the last 48 hours." : "Please select a section to view summaries."}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeacherSummaries;
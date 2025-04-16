// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const StudentSummaries = () => {
//     const [summaries, setSummaries] = useState([]);
    
//     const user = JSON.parse(localStorage.getItem("user")); // Get user object
//     const studentSection = user?.section; // Get correct section from user object
//     const token = localStorage.getItem("token");

//     useEffect(() => {
//         console.log("Logged in User:", user);
//         console.log("Section from User Object:", studentSection);
//         console.log("Stored Token:", token);

//         if (!studentSection) {
//             console.warn("Student section is missing!");
//             return;
//         }

//         const fetchSummaries = async () => {
//             try {
//                 const res = await axios.get(`http://localhost:5001/api/summaries/${studentSection}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 console.log("Fetched Summaries:", res.data);
//                 setSummaries(res.data);
//             } catch (error) {
//                 console.error("Error fetching summaries:", error.response?.data || error.message);
//             }
//         };

//         fetchSummaries();
//     }, [studentSection]);

//     return (
//         <div className="container mt-4">
//             <h2>Class Summaries</h2>
//             <h5>Section: {studentSection || "Not Available"}</h5>

//             <ul className="list-group">
//                 {summaries.length > 0 ? (
//                     summaries.map((summary) => (
//                         <li key={summary._id} className="list-group-item">
//                             <strong>Section: {summary.section}</strong>
//                             <p><b>Summary:</b> {summary.content}</p>
//                             <small>Posted on: {new Date(summary.createdAt).toLocaleString()}</small>
//                         </li>
//                     ))
//                 ) : (
//                     <p>No summaries available.</p>
//                 )}
//             </ul>
//         </div>
//     );
// };

// export default StudentSummaries;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBookReader, FaChalkboard, FaCalendarAlt } from "react-icons/fa";

const StudentSummaries = () => {
    const [summaries, setSummaries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const user = JSON.parse(localStorage.getItem("user"));
    const studentSection = user?.section;
    const token = localStorage.getItem("token");
    
    useEffect(() => {
        console.log("Logged in User:", user);
        console.log("Section from User Object:", studentSection);
        console.log("Stored Token:", token);
        
        if (!studentSection) {
            console.warn("Student section is missing!");
            setIsLoading(false);
            return;
        }
        
        const fetchSummaries = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/api/summaries/${studentSection}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                
                console.log("Fetched Summaries:", res.data);
                setSummaries(res.data);
            } catch (error) {
                console.error("Error fetching summaries:", error.response?.data || error.message);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchSummaries();
    }, [studentSection]);
    
    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1><FaBookReader /> Class Summaries</h1>
                <p className="subtitle">
                    View your class summaries and updates from the last 48 hours
                </p>
            </div>
            
            <div className="stat-card" style={{ marginBottom: '2rem' }}>
                <div className="card-icon" style={{ color: '#5c3d2e' }}>
                    <FaChalkboard />
                </div>
                <div className="card-info">
                    <h2>Your Section</h2>
                    <p>{studentSection || "Not Available"}</p>
                </div>
            </div>
            
            <div className="recent-activity" style={{ marginBottom: '2rem' }}>
                <h2>Recent Class Updates</h2>
                
                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: '#8b5e3b' }}>
                        Loading class summaries...
                    </div>
                ) : summaries.length > 0 ? (
                    <div className="activity-list">
                        {summaries.map((summary) => (
                            <div key={summary._id} className="activity-item" style={{ 
                                display: 'block', 
                                padding: '1.2rem',
                                marginBottom: '1rem',
                                backgroundColor: '#fff6ea',
                                borderRadius: '8px',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                                transition: 'transform 0.3s'
                            }}>
                                <div style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    marginBottom: '0.5rem' 
                                }}>
                                    <h3 style={{ 
                                        color: '#5c3d2e', 
                                        margin: 0, 
                                        fontSize: '1.1rem',
                                        fontWeight: '600' 
                                    }}>
                                        Section: {summary.section}
                                    </h3>
                                    <div style={{ 
                                        display: 'flex', 
                                        alignItems: 'center',
                                        color: '#8b5e3b',
                                        fontSize: '0.9rem'
                                    }}>
                                        <FaCalendarAlt style={{ marginRight: '0.5rem' }} />
                                        {new Date(summary.createdAt).toLocaleString()}
                                    </div>
                                </div>
                                <div style={{ 
                                    padding: '0.8rem',
                                    backgroundColor: 'white',
                                    borderRadius: '6px',
                                    marginTop: '0.8rem',
                                    marginBottom: '0.5rem',
                                    lineHeight: '1.5',
                                    color: '#5c3d2e',
                                    whiteSpace: 'pre-wrap'
                                }}>
                                    {summary.content}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ 
                        padding: '2rem', 
                        textAlign: 'center', 
                        color: '#8b5e3b',
                        backgroundColor: '#fff6ea',
                        borderRadius: '8px',
                        marginTop: '1rem'
                    }}>
                        {studentSection ? 
                            "No summaries available for your section in the last 48 hours." : 
                            "Your section information is not available. Please contact your administrator."}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentSummaries;
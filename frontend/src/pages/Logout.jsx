import { useEffect, useState } from "react";
// Note: You'll need to install react-icons: npm install react-icons
import { FiLogOut } from "react-icons/fi";

const Logout = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Clear authentication data
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    
    // Clear any session cookies
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
    
    // Create progress animation before redirecting
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          window.location.href = "/";
          return 100;
        }
        return prev + 4;
      });
    }, 40);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center" 
         style={{ background: 'linear-gradient(to bottom, #fff6ea, #ffecd3)' }}>
      <div className="card shadow" style={{ maxWidth: '400px', border: '1px solid rgba(92, 61, 46, 0.2)' }}>
        <div className="card-body p-5 text-center">
          <div className="mb-4 d-flex justify-content-center">
            <div className="rounded-circle p-3 mb-3" 
                 style={{ 
                   backgroundColor: '#d9534f', 
                   color: 'white',
                   animation: 'pulse 1.5s infinite',
                   width: '80px',
                   height: '80px',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center'
                 }}>
              <FiLogOut size={40} />
            </div>
          </div>
          
          <h2 className="mb-4" style={{ color: '#5c3d2e' }}>Logging Out</h2>
          
          <div className="progress mb-4" style={{ height: '10px' }}>
            <div 
              className="progress-bar progress-bar-striped progress-bar-animated" 
              role="progressbar"
              style={{ 
                width: `${progress}%`, 
                backgroundColor: '#d9534f',
                transition: 'width 0.4s ease-in-out'
              }} 
              aria-valuenow={progress} 
              aria-valuemin="0" 
              aria-valuemax="100">
            </div>
          </div>
          
          <p className="text-muted" style={{ color: '#8b5e3b' }}>
            Please wait while we securely log you out...
          </p>
        </div>
      </div>
      
      {/* Add keyframe animation for pulse effect */}
      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.05);
              opacity: 0.8;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Logout;
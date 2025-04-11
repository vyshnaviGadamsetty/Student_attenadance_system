
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import authService from "../services/authService";
// import "../styles/Login.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

// import img from "../assets/login_page1.jpeg";
// import img2 from "../assets/logo.jpeg";

// const Login = () => {
//   const [credentials, setCredentials] = useState({ id: "", password: "" });
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const data = await authService.login(credentials.id, credentials.password);

//       if (!data || !data.token || !data.user) {
//         setError("Invalid response from server. Please try again.");
//         return;
//       }

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("role", data.role);
//       localStorage.setItem("user", JSON.stringify(data.user));

//       // Redirect based on role
//       if (data.role === "admin") {
//         localStorage.setItem("adminId", credentials.id);
//         navigate("/admin/dashboard");
//       } else if (data.role === "teacher") {
//         localStorage.setItem("teacherId", credentials.id);
//         navigate("/teacher/dashboard");
//       } else if (data.role === "student") {
//         localStorage.setItem("studentId", credentials.id);
//         navigate("/student/dashboard");
//       } else {
//         setError("Invalid user role.");
//       }
//     } catch (err) {
//       setError("Invalid ID or Password");
//     }
//   };

//   return (
//     <div className="login-container">
//       {/* Left Side Image */}
//       <div className="image-section">
//         <img src={img} alt="Student" className="curved-image" />
//       </div>

//       {/* Right Side Form */}
//       <div className="login-section">
//         <div className="logo-container">
//           <img src={img2} alt="University Logo" className="logo" />
//         </div>

//         <h1 className="welcome-text">Welcome back!</h1>

//         <form className="login-form" onSubmit={handleSubmit}>
//           <label>REGISTRATION NUMBER:</label>
//           <div className="input-wrapper">
//             <input
//               type="text"
//               className="input-box"
//               name="id"
//               value={credentials.id}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <label>PASSWORD:</label>
//           <div className="input-wrapper">
//             <input
//               type={showPassword ? "text" : "password"}
//               className="input-box"
//               name="password"
//               value={credentials.password}
//               onChange={handleChange}
//               required
//             />
//             <button
//               type="button"
//               className="eye-btn"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <BsEyeFill /> : <BsEyeSlashFill />}
//             </button>
//           </div>

//           {error && <p className="error-text">{error}</p>}

//           <div className="login-footer">
//             <a href="#" className="forgot-password">FORGOT PASSWORD?</a>
//             <button type="submit" className="login-button">LOGIN</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import "../styles/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

import img from "../assets/login_page1.jpeg";
import img2 from "../assets/logo.jpeg";

const Login = () => {
  const [credentials, setCredentials] = useState({ id: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await authService.login(credentials.id, credentials.password);

      if (!data || !data.token || !data.user) {
        setError("Invalid response from server. Please try again.");
        return;
      }

      // ✅ Clear previous login info
      localStorage.clear();
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // Common user info
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.role === "admin") {
        localStorage.setItem("adminId", credentials.id);
        navigate("/admin/dashboard");
      } else if (data.role === "teacher") {
        localStorage.setItem("teacherId", credentials.id);
        localStorage.setItem("teacherUser", JSON.stringify(data.user));
        navigate("/teacher/dashboard");
      } else if (data.role === "student") {
        localStorage.setItem("studentId", credentials.id);
        localStorage.setItem("section", data.user?.section || ""); // ✅ Fix: ensure section is stored
        localStorage.setItem("studentUser", JSON.stringify(data.user));
        navigate("/student/dashboard");
      } else {
        setError("Invalid user role.");
      }
    } catch (err) {
      setError("Invalid ID or Password");
    }
  };

  return (
    <div className="login-container">
      {/* Left Side Image */}
      <div className="image-section">
        <img src={img} alt="Student" className="curved-image" />
      </div>

      {/* Right Side Form */}
      <div className="login-section">
        <div className="logo-container">
          <img src={img2} alt="University Logo" className="logo" />
        </div>

        <h1 className="welcome-text">Welcome back!</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>REGISTRATION NUMBER:</label>
          <div className="input-wrapper">
            <input
              type="text"
              className="input-box"
              name="id"
              value={credentials.id}
              onChange={handleChange}
              required
            />
          </div>

          <label>PASSWORD:</label>
          <div className="input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              className="input-box"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <BsEyeFill /> : <BsEyeSlashFill />}
            </button>
          </div>

          {error && <p className="error-text">{error}</p>}

          <div className="login-footer">
          {/*<a href="#" className="forgot-password">FORGOT PASSWORD?</a>*/}
            <button type="submit" className="login-button">LOGIN</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  // Get auth data from localStorage based on your existing implementation
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  
  const isAuthenticated = !!token && !!user;

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If role is required and user doesn't have the required role
  if (allowedRoles && !allowedRoles.includes(role)) {
    // Redirect to appropriate dashboard based on role
    if (role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (role === "teacher") {
      return <Navigate to="/teacher/dashboard" replace />;
    } else if (role === "student") {
      return <Navigate to="/student/dashboard" replace />;
    } else {
      // Fallback to login if role is unknown
      return <Navigate to="/" replace />;
    }
  }

  // If authenticated and has the right role, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
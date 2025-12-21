import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children, requiredRole }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setRedirectPath("/login");
      setLoading(false);
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setIsAuthenticated(true);
      setUserRole(payload.role || "user");

      if (requiredRole && payload.role !== requiredRole) {
        setRedirectPath("/");
      }
    } catch (err) {
      localStorage.removeItem("token");
      setRedirectPath("/login");
    }

    setLoading(false);
  }, [requiredRole]);

  // 🔔 Toasts must be inside useEffect-style logic
  useEffect(() => {
    if (redirectPath === "/login") {
      toast.error("Please login to access this page");
    }
    if (redirectPath === "/") {
      toast.error("Access denied. Admin only.");
    }
  }, [redirectPath]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-green-600" />
      </div>
    );
  }

  if (redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;

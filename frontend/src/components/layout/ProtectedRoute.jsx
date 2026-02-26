import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate auth check delay (prevents flicker on refresh)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-400">
        Checking authentication...
      </div>
    );
  }

  // Not Logged In
  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // Role-Based Access Control (Optional)
  if (requiredRole && user?.user?.role !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-red-400">
        Access Denied
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
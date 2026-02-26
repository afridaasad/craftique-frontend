import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { loading, isAuthenticated, isBuyer, isArtisan, isAdmin } =
    useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length === 0) {
    return children;
  }

  const roleCheck = {
    buyer: isBuyer,
    artisan: isArtisan,
    admin: isAdmin,
  };

  const hasAccess = allowedRoles.some((role) => roleCheck[role]);

  if (!hasAccess) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
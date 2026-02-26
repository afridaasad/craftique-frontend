import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { loading, isAuthenticated, isBuyer, isArtisan, isAdmin } =
    useContext(AuthContext);

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const roleCheck = {
    buyer: isBuyer,
    artisan: isArtisan,
    admin: isAdmin,
  };

  const hasAccess = allowedRoles.some((role) => roleCheck[role]);

  if (!hasAccess) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
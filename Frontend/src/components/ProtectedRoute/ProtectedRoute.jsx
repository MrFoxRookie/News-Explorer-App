import { Navigate } from "react-router-dom";

function ProtectedRoute({ currentUser, isAuthLoading, children }) {
  if (isAuthLoading) {
    return;
  }

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;

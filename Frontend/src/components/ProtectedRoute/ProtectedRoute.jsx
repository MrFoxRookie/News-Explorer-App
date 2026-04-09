import { Navigate } from "react-router-dom";

function ProtectedRoute({ currentUser, children }) {
  console.log("ProtectedRoute ejecutándose");

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;

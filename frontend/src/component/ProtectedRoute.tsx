import { Navigate } from "react-router-dom";
import { useLoginContext } from "../contexts/loginContext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useLoginContext();

  if (!token) {
    return <Navigate to="/" />; // Redirect to login if not authenticated
  }

  return children; // Return the protected route if authenticated
};

export default ProtectedRoute;

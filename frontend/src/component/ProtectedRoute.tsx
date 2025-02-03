import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../contexts/loginContext";
import { LoginContextType } from "../interfaces/contextInterface";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const loginContext = useContext(LoginContext);
  const { token } = loginContext as LoginContextType;

  if (!token) {
    return <Navigate to="/" />; // Redirect to login if not authenticated
  }

  return children; // Return the protected route if authenticated
};

export default ProtectedRoute;

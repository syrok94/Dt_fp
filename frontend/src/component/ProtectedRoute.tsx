import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../contexts/loginContext";
import { LoginContextType } from "../interfaces/contextInterface";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const loginContext = useContext(LoginContext);
  const { token } = loginContext as LoginContextType;

  if (!token) {
    return <Navigate to="/" />; 
  }

  return children; 
};

export default ProtectedRoute;

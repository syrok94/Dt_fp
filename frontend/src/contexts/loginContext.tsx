import React, { createContext, useState, useEffect, ReactNode, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface LoginContextType {
  token: string | null;
  setToken: (value: string | null) => void;
}

export const LoginContext = createContext<LoginContextType | undefined>(undefined);

interface LoginContextProviderProps {
  children: ReactNode;
}

const LoginContextProvider: React.FC<LoginContextProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  const isTokenExpired = useCallback((token: string | null): boolean => {
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split(".")[1])); 
      const expiry = payload.exp * 1000; 
      return Date.now() >= expiry;
    } catch (error) {
      console.error("Invalid token format:", error);
      return true;
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
  
    if (isTokenExpired(token)) {
      setToken(null);
      navigate("/");
    }

 
    const interval = setInterval(() => {
      if (isTokenExpired(token)) {
        setToken(null);
        navigate("/");
      }
    }, 60000); 

    return () => clearInterval(interval);
  }, [token, isTokenExpired, navigate]);

  return (
    <LoginContext.Provider value={{ token, setToken }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;

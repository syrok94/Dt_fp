import React, { createContext, useState, useEffect, ReactNode } from "react";

interface LoginContextType {
  token: string | null;
  setToken: (value: string | null) => void;
}

export const LoginContext = createContext<LoginContextType | undefined>(undefined);

interface LoginContextProviderProps {
  children: ReactNode;
}

const LoginContextProvider: React.FC<LoginContextProviderProps> = ({ children }) => {

  const initialState = localStorage.getItem("token") || null;

  const [token, setToken] = useState<string | null>(initialState);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <LoginContext.Provider value={{ token, setToken }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;

import React, { createContext, useState, useEffect, ReactNode } from "react";

interface LoginContextType {
  token: string | null;
  setToken: (value: string | null) => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

interface LoginContextProviderProps {
  children: ReactNode;
}

export const LoginContextProvider: React.FC<LoginContextProviderProps> = ({
  children,
}) => {
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

export const useLoginContext = () => {
  const context = React.useContext(LoginContext);
  if (!context) {
    throw new Error(
      "useLoginContext must be used within a LoginContextProvider"
    );
  }
  return context;
};

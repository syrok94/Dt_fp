import React, { createContext, useState, ReactNode } from "react";

interface LoginContextType {
  token: string;
  setToken: (value: string) => void;
}

export const LoginContext = createContext<LoginContextType | undefined>(
  undefined
);

interface LoginContextProviderProps {
  children: ReactNode;
}

const LoginContextProvider: React.FC<LoginContextProviderProps> = ({
  children,
}) => {
  const [token, setToken] = useState<string>("");
  return (
    <LoginContext.Provider
      value={{token, setToken}}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;

import React, { createContext, useState, ReactNode } from "react";

interface LoginContextType {
  name: string;
  token: string;
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
  setName: (value: string) => void;
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
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [token, setToken] = useState<string>("");
  return (
    <LoginContext.Provider
      value={{ name, setName, token, setToken, isAdmin, setIsAdmin }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;

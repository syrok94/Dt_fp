import React, { createContext, useState, ReactNode } from "react";

interface UserContextType {
    
}

export const userContext = createContext<UserContextType | undefined>(
  undefined
);

interface UserContextProviderProps {
  children: ReactNode;
}

const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const [user , setUser] = useState<UserContextType>([]);
  return (
    <userContext.Provider
      value={{user, setUser}}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;

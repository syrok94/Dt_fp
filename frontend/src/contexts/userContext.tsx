import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface UserContextType {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface UserContextProviderType {
  user: UserContextType;
  setUser: Dispatch<SetStateAction<UserContextType>>;
}

export const UserContext = createContext<UserContextProviderType | undefined>(undefined);

interface UserContextProviderProps {
  children: ReactNode;
}

const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserContextType>({
    id: "",
    email: "",
    name: "",
    role: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

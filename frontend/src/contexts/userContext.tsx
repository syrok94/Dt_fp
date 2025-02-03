import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

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

const UserContext = createContext<UserContextProviderType | undefined>(
  undefined
);

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  // Get user from localStorage or use default values
  const storedUser = localStorage.getItem("user");
  const initialState: UserContextType = storedUser
    ? JSON.parse(storedUser)
    : { id: "", email: "", name: "", role: "" };

  const [user, setUser] = useState<UserContextType>(initialState);

  // Persist user changes in `localStorage`
  useEffect(() => {
    if (user.id) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};

import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { User } from "../interfaces/contextInterface";
import { baseURL } from "../config/Config.json";

export interface AllDeveloperContextType {
  developers: User[];
}

const AllDeveloperContext = createContext<AllDeveloperContextType | undefined>(undefined);

interface AllDeveloperProviderProps {
  children: ReactNode;
}

export const AllDeveloperProvider = ({ children }: AllDeveloperProviderProps) => {
  const [developers, setDevelopers] = useState<User[]>([]);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token")); // Track token state

  useEffect(() => {
    setToken(localStorage.getItem("token")); // Ensure token is fetched after component mounts
  }, []);

  const getDevelopers = async () => {
    if (!token) {
      console.error("No token found");
      return [];
    }

    try {
      const res = await fetch(`${baseURL}/auth/getAllDeveloper`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setDevelopers(data); // Update state inside fetch, ensuring re-render
      } else {
        console.error("Error fetching users:", res.status);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    if (token) {
      getDevelopers();
    }
  }, [token]); // Ensure useEffect runs when the token is available

  return (
    <AllDeveloperContext.Provider value={{ developers }}>
      {children}
    </AllDeveloperContext.Provider>
  );
};

export const useDevelopers = (): AllDeveloperContextType => {
  const context = useContext(AllDeveloperContext);
  if (!context) {
    throw new Error("useDevelopers must be used within AllDeveloperProvider");
  }
  return context;
};

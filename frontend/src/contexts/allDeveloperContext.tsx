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

const token = localStorage.getItem("token");

export const AllDeveloperProvider = ({ children }: AllDeveloperProviderProps) => {
  const [developers, setDevelopers] = useState<User[]>([]);

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
        return await res.json();
      } else {
        console.error("Error fetching users:", res.status);
        return [];
      }
    } catch (error) {
      console.error("Fetch error:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUsers = await getDevelopers();
      setDevelopers(fetchedUsers);
    };
    fetchData();
  }, []);

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

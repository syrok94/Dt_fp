import { createContext, useState, useContext, useEffect } from "react";

const AllDeveloperContext = createContext();

const token = localStorage.getItem("token");

export const AllDeveloperProvider = ({ children }) => {
    const [developers, setDevelopers] = useState([]);

    const getUsers = async () => {
        if (!token) {
            console.error("No token found");
            return [];
        }
        try {
            const res = await fetch('http://localhost:8082/auth/getAllDeveloper', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
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
            const fetchedUsers = await getUsers();
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

// Custom hook to access the context
export const useDevelopers = () => useContext(AllDeveloperContext);

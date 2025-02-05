import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

const token = localStorage.getItem("token");

export const AllUserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

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
            setUsers(fetchedUsers);
        };
        fetchData();
    }, []);

    return (
        <UserContext.Provider value={{ users }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to access the context
export const useUsers = () => useContext(UserContext);

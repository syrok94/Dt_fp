import { baseURL } from "../config/Config.json";

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user") || "{}");


export const fetchAllBoards = async () => {
  if (!token) {
    console.error("Token is missing. User is not authenticated.");
    return null;
  }

  if (!user.id) {
    console.error("User ID is missing in localStorage.");
    return null;
  }

  try {
    const res = await fetch(`${baseURL}/board/getAllBoard/${user.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      console.warn(`Failed to fetch boards. Status: ${res.status}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching boards:", error);
    return null;
  }
};

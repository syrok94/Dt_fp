import { baseURL } from "../config/Config.json";
import { Task } from "../interfaces/contextInterface";

const token = localStorage.getItem("token");

export const updateTaskStatus = async (taskId: string, payload: Task) => {
  if (!token) {
    console.error("No auth token found!");
    throw new Error("Authentication required");
  }

  try {
    const response = await fetch(`${baseURL}/task/updateTask/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to update task: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error;
  }
};

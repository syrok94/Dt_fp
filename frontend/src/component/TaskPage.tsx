import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { baseURL } from "../config/Config.json";

interface Task {
  task_id: string;
  title: string;
  description: string;
  status: "TO_DO" | "IN_PROGRESS" | "DONE";
  storyPoint: "ONE" | "TWO" | "THREE" | "FIVE" | "TEN";
  assignedToId: string;
  boardId: string;
  assignorId: string;
}

const TaskPage: React.FC = () => {
  const location = useLocation();
  const { taskId } = location.state || {}; 

  const [task, setTask] = useState<Task | null>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTask = async () => {
      if (taskId) {
        console.log("Fetching task with ID:", taskId);
        try {
          const res = await fetch(`${baseURL}/task/getTask/${taskId}`,{
            method:"GET",
            headers:{
              Authorization:`Bearer ${token}`
            }
          });
          console.log("res:" , res);
          if (res.ok) {
            const data = await res.json();
            console.log("data:" , data);
            setTask(data); 
          } else {
            console.error("Failed to fetch task details");
          }
        } catch (error) {
          console.error("Error fetching task:", error);
        }
      }
    };

    fetchTask(); // Call the async function
  }, [taskId]); // Re-run when taskId changes

  if (!task) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold">{task.title}</h2>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Story Points: {task.storyPoint}</p>
      <p>Assigned to: {task.assignedToId}</p>
      <p>Assigned by: {task.assignorId}</p>

      {/* Add more details as needed */}
    </div>
  );
};

export default TaskPage;

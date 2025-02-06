import React, { useEffect, useState, useContext } from "react";
import { baseURL } from "../config/Config.json";
import { UserContext } from "../contexts/userContext";
import { UserContextType } from "../interfaces/ContextInterface";

interface AdminTask {
  id: number;
  title: string;
  assignedToId?: string;
  status: string;
}

interface AdminTasksTableProps {
  onEdit: (taskId: number) => void;
  tasks: AdminTask[];
}

const AdminTasksTable: React.FC<AdminTasksTableProps> = ({ onEdit }) => {
  const { user } = useContext(UserContext) as UserContextType;
  const [tasks, setTasks] = useState<AdminTask[]>([]);
  const [userInfos, setUserInfos] = useState<{ [key: string]: any }>({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`${baseURL}/task/getAllTask/${user.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const fetchedTasks = await response.json();
        setTasks(fetchedTasks);
        fetchedTasks.forEach((task: AdminTask) => {
          if (task.assignedToId) {
            fetchUserInfo(task.assignedToId);
          }
        });
      } else {
        console.error("Failed to fetch tasks");
      }
    };

    const fetchUserInfo = async (userId: string) => {
      const response = await fetch(`${baseURL}/auth/getUserById/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const userInfo = await response.json();
        setUserInfos((prevUserInfos) => ({ ...prevUserInfos, [userId]: userInfo }));
      } else {
        console.error("Failed to fetch user info");
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-4">Tasks</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Title</th>
            <th className="border p-2">Assigned To</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
  {tasks.length > 0 ? (
    tasks.map((task) => (
      <tr key={task.id} className="text-center border-b">
        <td className="border p-2">{task.title}</td>
        <td className="border p-2">
          {task.assignedToId ? userInfos[task.assignedToId]?.name || "Loading..." : "Unassigned"}
        </td>
        <td className="border p-2">{task.status}</td>
        <td className="border p-2">
          <button
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
            onClick={() => onEdit(task.id)}
          >
            Remove
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={4} className="border p-4 text-center">
        No tasks available
      </td>
    </tr>
  )}
</tbody>

      </table>
    </div>
  );
};

export default AdminTasksTable;

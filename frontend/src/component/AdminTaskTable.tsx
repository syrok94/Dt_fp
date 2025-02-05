import React, { useEffect, useState,useContext } from "react";
import { baseURL } from "../config/Config.json";
import { UserContext } from "../contexts/userContext";
import { UserContextType } from "../interfaces/ContextInterface";


interface AdminTask {
  id: number;
  title: string;
  assignedToId?: string;
  status:string;

}

interface AdminTasksTableProps {
  onEdit: (taskId: number) => void;
  tasks: AdminTask[];
}

const AdminTasksTable: React.FC<AdminTasksTableProps> = ({ onEdit }) => {


  const { user } = useContext(UserContext) as UserContextType;

  const [tasks, setTasks] = useState<AdminTask[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${baseURL}/task/getAllTask/${user.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const fetchedTasks = await response.json();
        setTasks(fetchedTasks);
        console.log(tasks)
      } else {
        console.error("Failed to fetch tasks");
      }
    };
    fetchData();
  }, [token]);

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
                <td className="border p-2">{task.assignedToId || "Unassigned"}</td>
                <td className="border p-2">{task.status }</td>

                <td className="border p-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button> 
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="border p-4 text-center">
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

import React, { useEffect, useState, useContext } from "react";
import { baseURL } from "../config/Config.json";
import { UserContext } from "../contexts/userContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Task, UserContextType } from "../interfaces/ContextInterface";




const AdminTasksTable = () => {
  const { user } = useContext(UserContext) as UserContextType;
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userInfos, setUserInfos] = useState<{ [key: string]: any }>({});
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

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
        fetchedTasks.forEach((task: Task) => {
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
        setUserInfos((prevUserInfos) => ({
          ...prevUserInfos,
          [userId]: userInfo,
        }));
      } else {
        console.error("Failed to fetch user info");
      }
    };

    fetchTasks();
  }, []);

  // Close dropdown when clicking outside

  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const toggleDropdown = (taskId: string) => {
    setDropdownOpen(dropdownOpen === taskId ? null : taskId);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".dropdown-container")) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleEditTask = (taskId: any) => {
    console.log(taskId);
    navigate(`/editTask/${taskId}`);
  };

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
              <tr key={task.task_id} className="text-center border-b">
                <td className="border p-2">{task.title}</td>
                <td className="border p-2">
                  {task.assignedToId
                    ? userInfos[task.assignedToId]?.name || "Loading..."
                    : "Unassigned"}
                </td>
                <td className="border p-2">
                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold 
                    ${
                      task.status === "TO_DO"
                        ? "bg-yellow-200 text-yellow-800"
                        : task.status === "IN_PROGRESS"
                        ? "bg-blue-200 text-blue-800"
                        : task.status === "DONE"
                        ? "bg-green-200 text-green-800"
                        : "bg-purple-200 text-purple-800"
                    }`}
                  >
                    {task.status === "TO_DO"
                      ? "To Do"
                      : task.status === "IN_PROGRESS"
                      ? "In Progress"
                      : task.status === "DONE"
                      ? "Done"
                      : "bg-purple-200 text-purple-800"}
                  </span>
                </td>
                <td className="relative border p-2">
                  <button
                    className="px-3 py-1 rounded-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown(task.task_id);
                    }}
                  >
                    <svg
                      fill="#000000"
                      height="20px"
                      width="20px"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 54 54"
                      xmlSpace="preserve"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <g>
                          {" "}
                          <path d="M51.22,21h-5.052c-0.812,0-1.481-0.447-1.792-1.197s-0.153-1.54,0.42-2.114l3.572-3.571 c0.525-0.525,0.814-1.224,0.814-1.966c0-0.743-0.289-1.441-0.814-1.967l-4.553-4.553c-1.05-1.05-2.881-1.052-3.933,0l-3.571,3.571 c-0.574,0.573-1.366,0.733-2.114,0.421C33.447,9.313,33,8.644,33,7.832V2.78C33,1.247,31.753,0,30.22,0H23.78 C22.247,0,21,1.247,21,2.78v5.052c0,0.812-0.447,1.481-1.197,1.792c-0.748,0.313-1.54,0.152-2.114-0.421l-3.571-3.571 c-1.052-1.052-2.883-1.05-3.933,0l-4.553,4.553c-0.525,0.525-0.814,1.224-0.814,1.967c0,0.742,0.289,1.44,0.814,1.966l3.572,3.571 c0.573,0.574,0.73,1.364,0.42,2.114S8.644,21,7.832,21H2.78C1.247,21,0,22.247,0,23.78v6.439C0,31.753,1.247,33,2.78,33h5.052 c0.812,0,1.481,0.447,1.792,1.197s0.153,1.54-0.42,2.114l-3.572,3.571c-0.525,0.525-0.814,1.224-0.814,1.966 c0,0.743,0.289,1.441,0.814,1.967l4.553,4.553c1.051,1.051,2.881,1.053,3.933,0l3.571-3.572c0.574-0.573,1.363-0.731,2.114-0.42 c0.75,0.311,1.197,0.98,1.197,1.792v5.052c0,1.533,1.247,2.78,2.78,2.78h6.439c1.533,0,2.78-1.247,2.78-2.78v-5.052 c0-0.812,0.447-1.481,1.197-1.792c0.751-0.312,1.54-0.153,2.114,0.42l3.571,3.572c1.052,1.052,2.883,1.05,3.933,0l4.553-4.553 c0.525-0.525,0.814-1.224,0.814-1.967c0-0.742-0.289-1.44-0.814-1.966l-3.572-3.571c-0.573-0.574-0.73-1.364-0.42-2.114 S45.356,33,46.168,33h5.052c1.533,0,2.78-1.247,2.78-2.78V23.78C54,22.247,52.753,21,51.22,21z M52,30.22 C52,30.65,51.65,31,51.22,31h-5.052c-1.624,0-3.019,0.932-3.64,2.432c-0.622,1.5-0.295,3.146,0.854,4.294l3.572,3.571 c0.305,0.305,0.305,0.8,0,1.104l-4.553,4.553c-0.304,0.304-0.799,0.306-1.104,0l-3.571-3.572c-1.149-1.149-2.794-1.474-4.294-0.854 c-1.5,0.621-2.432,2.016-2.432,3.64v5.052C31,51.65,30.65,52,30.22,52H23.78C23.35,52,23,51.65,23,51.22v-5.052 c0-1.624-0.932-3.019-2.432-3.64c-0.503-0.209-1.021-0.311-1.533-0.311c-1.014,0-1.997,0.4-2.761,1.164l-3.571,3.572 c-0.306,0.306-0.801,0.304-1.104,0l-4.553-4.553c-0.305-0.305-0.305-0.8,0-1.104l3.572-3.571c1.148-1.148,1.476-2.794,0.854-4.294 C10.851,31.932,9.456,31,7.832,31H2.78C2.35,31,2,30.65,2,30.22V23.78C2,23.35,2.35,23,2.78,23h5.052 c1.624,0,3.019-0.932,3.64-2.432c0.622-1.5,0.295-3.146-0.854-4.294l-3.572-3.571c-0.305-0.305-0.305-0.8,0-1.104l4.553-4.553 c0.304-0.305,0.799-0.305,1.104,0l3.571,3.571c1.147,1.147,2.792,1.476,4.294,0.854C22.068,10.851,23,9.456,23,7.832V2.78 C23,2.35,23.35,2,23.78,2h6.439C30.65,2,31,2.35,31,2.78v5.052c0,1.624,0.932,3.019,2.432,3.64 c1.502,0.622,3.146,0.294,4.294-0.854l3.571-3.571c0.306-0.305,0.801-0.305,1.104,0l4.553,4.553c0.305,0.305,0.305,0.8,0,1.104 l-3.572,3.571c-1.148,1.148-1.476,2.794-0.854,4.294c0.621,1.5,2.016,2.432,3.64,2.432h5.052C51.65,23,52,23.35,52,23.78V30.22z"></path>{" "}
                          <path d="M27,18c-4.963,0-9,4.037-9,9s4.037,9,9,9s9-4.037,9-9S31.963,18,27,18z M27,34c-3.859,0-7-3.141-7-7s3.141-7,7-7 s7,3.141,7,7S30.859,34,27,34z"></path>{" "}
                        </g>{" "}
                      </g>
                    </svg>
                  </button>

                  {dropdownOpen === task.task_id && (
                    <div className="absolute right-0 top-full mt-1 w-40 bg-white shadow-lg border rounded-md z-50 dropdown-container">
                      <ul className="py-2">
                        <li>
                          <button
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                            onClick={() => {
                              handleEditTask(task.task_id);
                            }}
                          >
                            Edit Task
                          </button>
                        </li>

                        <li>
                          <button className="block w-full text-left px-4 py-2 text-sm hover:bg-red-200 text-red-600">
                            Delete Task
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
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

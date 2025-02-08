import React, { useEffect, useState, useContext } from "react";
import { baseURL } from "../config/Config.json";
import { UserContext } from "../contexts/userContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Task, UserContextType } from "../interfaces/ContextInterface";

interface AdminTasksTableProps {
  tasks: Task[];
}

const AdminTasksTable: React.FC<AdminTasksTableProps> = ({}) => {
  const { user } = useContext(UserContext) as UserContextType;
  const [userInfos, setUserInfos] = useState<{ [key: string]: any }>({});

  const [taskList, setTaskList] = useState<Task[]>([]);
  const [filteredTaskList, setFilteredTaskList] = useState<Task[]>([]);
  const [dropdownTaskId, setDropdownTaskId] = useState<string | null>(null);

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
        setTaskList(fetchedTasks);
        fetchedTasks.forEach((task: Task) => {
          if (task.assignedToId) {
            fetchUserInfo(task.assignedToId);
          }
        });
        setFilteredTaskList(fetchedTasks);

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

  //filter function for filter tasks base on status
  const taskFilter = (status: string) => {
    if (status === "All") {
      setFilteredTaskList(taskList);
    } else {
      setFilteredTaskList(taskList.filter((task) => task.status === status));
    }
  };

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

  const changeStatus = async (taskId: string, newStatus: string) => {
    if (!token) {
      console.error("Token is missing.");
      return;
    }

    // Find the task object from the current state
    const taskToUpdate = taskList.find((task) => task.task_id === taskId);

    if (!taskToUpdate) {
      console.error("Task not found.");
      return;
    }

    // Update the task status
    const updatedTask = { ...taskToUpdate, status: newStatus };

    try {
      const response = await fetch(`${baseURL}/task/updateTask/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error(`Failed to update status: ${response.status}`);
      }

      setTaskList((prevTasks) =>
        prevTasks.map((task) =>
          task.task_id === taskId ? { ...task, status: newStatus } : task
        )
      );

      setFilteredTaskList((prevTasks) =>
        prevTasks.map((task) =>
          task.task_id === taskId ? { ...task, status: newStatus } : task
        )
      );

      // Hide dropdown after selection
      setDropdownTaskId(null);
      console.log(taskId, newStatus);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div className="w-full max-w-5xl  bg-white shadow-lg rounded-lg p-4 mt-4">
      <h2 className="text-3xl font-bold text-center mb-4">Tasks</h2>

      <div className="w-full  max-w-5xl  bg-white shadow-lg rounded-lg p-4 mt-4">
        {/* Filter Buttons */}
        <div className="flex flex-row gap-2 mb-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => taskFilter("All")}
          >
            All Tasks
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => taskFilter("TO_DO")}
          >
            To Do
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => taskFilter("IN_PROGRESS")}
          >
            In Progress
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => taskFilter("DONE")}
          >
            Done
          </button>
        </div>
        <div className="max-h-100 overflow-y-auto">
          <div className="max-h-80 overflow-y-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Title</th>
                  <th className="border p-2">Assigned To</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTaskList.length > 0 ? (
                  filteredTaskList.map((task) => (
                    <tr key={task.task_id} className="text-center border-b">
                      <td className="border p-2">{task.title}</td>
                      <td className="border p-2">
                        {task.assignedToId
                          ? userInfos[task.assignedToId]?.name || "Loading..."
                          : "Unassigned"}
                      </td>
                      <td className="px-6 py-3 min-w-[150px] text-center relative">
                        <button
                          className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap 
                            ${
                              task.status === "TO_DO"
                                ? "bg-yellow-200 text-yellow-800"
                                : task.status === "IN_PROGRESS"
                                ? "bg-blue-200 text-blue-800"
                                : task.status === "DONE"
                                ? "bg-green-200 text-green-800"
                                : "bg-gray-200 text-gray-800"
                            }`}
                          onClick={() =>
                            setDropdownTaskId(
                              dropdownTaskId === task.task_id
                                ? null
                                : task.task_id
                            )
                          }
                        >
                          {task.status === "TO_DO"
                            ? "To Do"
                            : task.status === "IN_PROGRESS"
                            ? "In Progress"
                            : task.status === "DONE"
                            ? "Done"
                            : "Unknown"}
                        </button>

                        {dropdownTaskId === task.task_id && (
                          <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white border shadow-md rounded-lg w-32 z-50 dropdown-container">
                            <button
                              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                              onClick={() =>
                                changeStatus(task.task_id, "TO_DO")
                              }
                            >
                              To Do
                            </button>
                            <button
                              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                              onClick={() =>
                                changeStatus(task.task_id, "IN_PROGRESS")
                              }
                            >
                              In Progress
                            </button>
                            <button
                              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                              onClick={() => changeStatus(task.task_id, "DONE")}
                            >
                              Done
                            </button>
                          </div>
                        )}
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
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinejoin="round"
                            ></g>
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
                                <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200">
                                  Edit Task
                                </button>
                              </li>
                              <li>
                                <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200">
                                  Assign User
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
        </div>
      </div>
    </div>
  );
};

export default AdminTasksTable;

import React, { useState, useEffect } from "react";
import TaskCarousel from "../component/TaskCarousel";
import { baseURL } from "../config/Config.json";
import { Task, User } from "../interfaces/ContextInterface";

const UserDashboard: React.FC = () => {
  const user: User = JSON.parse(localStorage.getItem("user") || "{}");
  const token: string | null = localStorage.getItem("token");

  const [taskList, setTaskList] = useState<Task[]>([]);
  const [filteredTaskList, setFilteredTaskList] = useState<Task[]>([]);
  const [dropdownTaskId, setDropdownTaskId] = useState<string | null>(null);

  const taskData = async (): Promise<void> => {
    if (!user.id || !token) {
      console.error("User ID or Token is missing.");
      return;
    }

    try {
      const response = await fetch(
        `${baseURL}/task/getAllTaskGlobal`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch tasks: ${response.status}`);
      }

      const data: Task[] = await response.json();
      setTaskList(data);
      setFilteredTaskList(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const taskFilter = (status: string) => {
    if (status === "All") {
      setFilteredTaskList(taskList);
    } else {
      setFilteredTaskList(taskList.filter((task) => task.status === status));
    }
  };

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

  useEffect(() => {
    taskData();
  }, []);

  return (
    <div className="h-screen flex flex-col items-center bg-gray-100 p-4">
      <TaskCarousel taskList={taskList} />

      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-4 mt-4">
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

        {/* Task Table */}
        <div className="w-full overflow-hidden border border-gray-200 rounded-lg">
          <div className="max-h-80 overflow-y-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
                <tr>
                  <th className="px-4 py-3 min-w-[180px]">Title</th>
                  <th className="px-6 py-3 min-w-[250px] max-w-[300px] truncate">
                    Description
                  </th>
                  <th className="px-6 py-3 min-w-[150px] text-center">
                    Status
                  </th>
                  <th className="px-6 py-3 min-w-[100px] text-center">
                    Story Point
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTaskList.length > 0 ? (
                  filteredTaskList.map((task) => (
                    <tr
                      key={task.task_id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 min-w-[180px] font-medium text-gray-900">
                        {task.title}
                      </td>
                      <td className="px-6 py-3 min-w-[250px] max-w-[300px] truncate">
                        {task.description}
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
                          <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white border shadow-md rounded-lg w-32 z-50 ">
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
                      <td className="px-6 py-3 min-w-[100px] text-center">
                        {task.storyPoint === "ONE"
                          ? "1"
                          : task.storyPoint === "TWO"
                          ? "2"
                          : task.storyPoint === "THREE"
                          ? "3"
                          : task.storyPoint === "FIVE"
                          ? "5"
                          : task.storyPoint === "TEN"
                          ? "10"
                          : "0"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="border p-4 text-center text-gray-500"
                    >
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

export default UserDashboard;

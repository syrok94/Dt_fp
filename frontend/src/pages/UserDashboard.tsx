import React, { useState, useEffect } from "react";
import TaskCarousel from "../component/TaskCarousel";
import { baseURL } from "../config/Config.json";
import { Task, User } from "../interfaces/ContextInterface";

const UserDashboard: React.FC = () => {
  const user: User = JSON.parse(localStorage.getItem("user") || "{}");
  const token: string | null = localStorage.getItem("token");

  const [taskList, setTaskList] = useState<Task[]>([]);

  const[filteredTaskList,setFilteredTaskList] = useState<Task[]>([]);

  const[activeFilter,setActiveFiler] = useState<string>("All");



  const taskData = async (): Promise<void> => {
    if (!user.id || !token) {
      console.error("User ID or Token is missing.");
      return;
    }

    try {
      const response = await fetch(
        `${baseURL}/task/getAssignedTask/${user.id}`,
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

  //filter functions

  const taskFilter = (status:string)=>{

    if(status==="All"){
      setFilteredTaskList(taskList);
    }
    else{
      console.log(status);
      setActiveFiler(status);
      setFilteredTaskList((taskList).filter((task) => status === "ALL" || task.status === activeFilter));
      
    }

  }

  useEffect(() => {
    taskData();
  }, []);

  return (
    <div className="h-screen flex flex-col items-center bg-gray-100 p-4">
      <TaskCarousel taskList={taskList} />

      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-4 mt-4">
        <div className="flex flex-row gap-2 mb-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onClick={()=>taskFilter("All")}>
            All Tasks
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onClick={()=>taskFilter("TO_DO")}>
            To Do
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onClick={()=>taskFilter("IN_PROGRESS")}>
            In Progress
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onClick={()=>taskFilter("DONE")}>
            Done
          </button>
        </div>

        <div className="w-full overflow-hidden border border-gray-200 rounded-lg">
          <div className="max-h-80 overflow-y-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
                <tr>
                  <th scope="col" className="px-4 py-3 min-w-[180px]">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 min-w-[250px] max-w-[300px] truncate">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 min-w-[150px] text-center">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 min-w-[100px] text-center">
                    Story Point
                  </th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {filteredTaskList.length > 0 ? (
                  filteredTaskList.map((task) => (
                    <tr key={task.task_id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3 min-w-[180px] font-medium text-gray-900">
                        {task.title}
                      </td>

                      <td className="px-6 py-3 min-w-[250px] max-w-[300px] truncate">
                        {task.description}
                      </td>

                      <td className="px-6 py-3 min-w-[150px] text-center">
                        <span
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
                        >
                          {task.status === "TO_DO"
                            ? "To Do"
                            : task.status === "IN_PROGRESS"
                            ? "In Progress"
                            : task.status === "DONE"
                            ? "Done"
                            : "Unknown"}
                        </span>
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
                    <td colSpan={4} className="border p-4 text-center text-gray-500">
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

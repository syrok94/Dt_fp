import React, { useEffect, useState } from "react";
import { baseURL } from "../config/Config.json";
import { Task, User } from "../interfaces/ContextInterface";

const TaskCarousel: React.FC = () => {
  const token = localStorage.getItem("token");
  const user: User = JSON.parse(localStorage.getItem("user") || "{}");

  const [currentIndex, setCurrentIndex] = useState(0);
  const tasksPerView = 3;
  const [taskList, setTaskList] = useState<Task[]>([]);

  const taskData = async () => {
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
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();
      setTaskList(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    taskData();
  }, []);

  const nextSlide = () => {
    if (currentIndex < taskList.length - tasksPerView) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="w-full flex items-center justify-center space-x-4">
      {/* Left Button */}
      <button
        onClick={prevSlide}
        disabled={currentIndex === 0}
        className="bg-gray-700 text-white px-3 py-2 rounded-full disabled:opacity-50"
      >
        &#10094;
      </button>

      <div className="overflow-hidden w-full max-w-5xl my-8">
        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-300"
            style={{
              transform: `translateX(-${currentIndex * (100 / tasksPerView)}%)`,
            }}
          >
            {taskList.length > 0 ? (
              taskList.map((task) => (
                <div
                  key={task.task_id}
                  className="w-1/2 sm:w-1/4 bg-white p-4 rounded-lg shadow-md flex-shrink-0 border border-gray-200 mx-2"
                >
                  <div className="flex gap-1">
                    <span>Title: </span>
                    <h3 className="text-lg font-medium">{task.title}</h3>
                  </div>
                  <div className="flex gap-1">
                    <span>Story Point: </span>
                    <h3 className="text-lg ">
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
                    </h3>
                  </div>
                  {/* <p className="text-gray-600">{task.description}</p> */}
                  <div className="flex gap-1 items-center">
                    <span>Status: </span>
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
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center w-full">
                No tasks assigned.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        disabled={currentIndex >= taskList.length - tasksPerView}
        className="bg-gray-700 text-white px-3 py-2 rounded-full disabled:opacity-50"
      >
        &#10095;
      </button>
    </div>
  );
};

export default TaskCarousel;

import React, { useEffect, useState } from "react";
import { baseURL } from "../config/Config.json";
import { Task, User } from "../interfaces/ContextInterface";
import { useNavigate } from "react-router-dom";

const TaskCarousel: React.FC = () => {
  const token = localStorage.getItem("token");
  const user: User = JSON.parse(localStorage.getItem("user") || "{}");

  const [currentIndex, setCurrentIndex] = useState(0);
  const tasksPerView = 3;
  const [taskList, setTaskList] = useState<Task[]>([]);

  const navigate = useNavigate();

  const taskData = async () => {
    try {
      const response = await fetch(`${baseURL}/task/getAssignedTask/${user.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

      {/* Carousel Container */}
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
                  className="w-1/3 md:w-1/4 bg-white p-4 rounded-lg shadow-md flex-shrink-0 border border-gray-200 mx-2 h-full flex flex-col justify-between"
                  onClick={() =>
                    navigate(`/task/${task.task_id}`, {
                      state: { taskId: task.task_id }, 
                    })
                  }
                >
                  <div className="flex gap-2 items-baseline">
                    <span className="font-medium">Title:</span>
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                  </div>

                  <div className="flex gap-2 items-baseline">
                    <span className="font-medium">Story Point:</span>
                    <h3 className="text-lg">{task.storyPoint}</h3>
                  </div>

                  <div className="flex gap-2 items-baseline">
                    <span className="font-medium">Status:</span>
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
                      {task.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center w-full">No tasks assigned.</p>
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

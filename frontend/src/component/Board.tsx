import React, { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

interface Task {
  id: string;
  title: string;
  status: "To_Do" | "In_Progress" | "Done";
}

const Board: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    // Load saved tasks from localStorage
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [
      { id: "1", title: "Task 1", status: "To_Do" },
      { id: "2", title: "Task 2", status: "In_Progress" },
      { id: "3", title: "Task 3", status: "Done" },
    ];
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskDrag = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(source.index, 1);
    movedTask.status = destination.droppableId as Task["status"]; // Update status
    reorderedTasks.splice(destination.index, 0, movedTask);

    setTasks(reorderedTasks);
  };

  const addTask = () => {
    const newTask: Task = {
      id: (tasks.length + 1).toString(),
      title: `Task ${tasks.length + 1}`,
      status: "To_Do",
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="p-6 w-full bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Admin Dashboard
      </h1>

      <div className="bg-white p-4 shadow-md rounded-lg mb-6">
        {/* Title & Add Task Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Task Board</h2>
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Add Task
          </button>
        </div>

        <DragDropContext onDragEnd={handleTaskDrag}>
          <div className="flex space-x-4">
            {["To_Do", "In_Progress", "Done"].map((status) => (
              <Droppable droppableId={status} key={status}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="w-full md:w-1/3 p-2 bg-gray-50 rounded-lg shadow-md"
                  >
                    <h3 className="font-semibold text-lg text-gray-700 mb-2">
                      {status}
                    </h3>
                    {tasks
                      .filter((task) => task.status === status)
                      .map((task, index) => (
                        <Draggable
                          draggableId={task.id}
                          index={index}
                          key={task.id}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="p-3 bg-blue-100 mb-3 rounded-md shadow-sm"
                            >
                              {task.title}
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Board;

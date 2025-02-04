import React, { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import AddTask from "./AddTask";

interface Task {
  id: string;
  title: string;
  desc: string;
  status: "To_Do" | "In_Progress" | "Done";
  storyPoint: "ONE" | "TWO" | "THREE" | "FIVE" | "TEN";
  assignedTo: string;
}

interface Developer {
  id: string;
  name: string;
}

const developers: Developer[] = [
  { id: "dev1", name: "Alice" },
  { id: "dev2", name: "Bob" },
  { id: "dev3", name: "Charlie" },
];

const Board: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks
      ? JSON.parse(savedTasks)
      : [
          { id: "1", title: "Task 1", desc: "Description", status: "To_Do", storyPoint: "ONE", assignedTo: "dev1" },
          { id: "2", title: "Task 2", desc: "Description", status: "In_Progress", storyPoint: "TWO", assignedTo: "dev2" },
          { id: "3", title: "Task 3", desc: "Description", status: "Done", storyPoint: "FIVE", assignedTo: "dev3" },
        ];
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskDrag = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const reorderedTasks = [...tasks];
    const [movedTask] = reorderedTasks.splice(source.index, 1);
    movedTask.status = destination.droppableId as Task["status"];
    reorderedTasks.splice(destination.index, 0, movedTask);

    setTasks(reorderedTasks);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSave = (newTaskData: Omit<Task, "id">) => {
    const newTask: Task = {
      id: (tasks.length + 1).toString(),
      ...newTaskData,
    };
    setTasks([...tasks, newTask]);
    setShowModal(false);
  };

  return (
    <div className="p-6 w-full bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Dashboard</h1>

      <div className="bg-white p-4 shadow-md rounded-lg mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Task Board</h2>
          <button
            onClick={() => setShowModal(true)}
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
                    <h3 className="font-semibold text-lg text-gray-700 mb-2">{status}</h3>
                    {tasks
                      .filter((task) => task.status === status)
                      .map((task, index) => (
                        <Draggable draggableId={task.id} index={index} key={task.id}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="p-3 bg-blue-100 mb-3 rounded-md shadow-sm"
                            >
                              <h4 className="font-bold">{task.title}</h4>
                              <p className="text-sm text-gray-700">{task.desc}</p>
                              <p className="text-xs text-gray-500">Story Point: {task.storyPoint}</p>
                              <p className="text-xs text-gray-500">
                                Assigned to: {developers.find((d) => d.id === task.assignedTo)?.name || "Unassigned"}
                              </p>
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

      {showModal && <AddTask onClose={handleClose} onSave={handleSave} developers={developers} />}
    </div>
  );
};

export default Board;

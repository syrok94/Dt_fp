import React, { useState, useEffect, useContext } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import AddTask from "./AddTask";
import { BoardContext } from "../contexts/BoardContext";
import { BoardContextType } from "../interfaces/contextInterface";

interface Task {
  taskId:string;
  title: string;
  description: string;
  status: "TO_DO" | "IN_PROGRESS" | "DONE";
  storyPoint: "ONE" | "TWO" | "THREE" | "FIVE" | "TEN";
  assignedToId: string;
  boardId: string;
}

interface Developer {
  id: string;
  name: string;
}

const developers: Developer[] = [
  { id: "e16aa3c1-a66f-4bc8-8d36-2b68fe3d1eb2", name: "test" },
  { id: "e16aa3c1-a66f-4343-8d36-2b68fe3d1eb2", name: "Bob" },
  { id: "e16aa3c1-4343-4bc8-8d36-2b68fe3d1eb2", name: "Charlie" },
];

const Board: React.FC = () => {
  const boardContext = useContext(BoardContext);
  const { board } = boardContext as unknown as BoardContextType;

  // Get the boardId from context or local storage
  const storedBoardId = localStorage.getItem("boardId");
  const boardId = board?.boardId || storedBoardId;

  const [tasks, setTasks] = useState<Task[]>(board?.tasks || []);
  const [showModal, setShowModal] = useState(false);

  // Store boardId in local storage if not already stored
  useEffect(() => {
    if (board?.boardId) {
      localStorage.setItem("boardId", board.boardId);
    }
  }, [board]);

  useEffect(() => {
    console.log("Updated tasks:", tasks);
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

  const handleSave = async (newTaskData: Task) => {
    if (!boardId) {
      console.error("Board ID is missing!");
      return;
    }

    // Generate a unique task ID (temporary client-side until backend assigns one)
    const newTask: Task = {
      ...newTaskData,
      boardId, // Ensure boardId is assigned to new tasks
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setShowModal(false);
  };

  return (
    <div className="p-6 w-full bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Admin Dashboard
      </h1>

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
            {["TO_DO", "IN_PROGRESS", "DONE"].map((status) => (
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
                      .map((task, index) =>
                        task.taskId ? (
                          <Draggable
                            draggableId={task.taskId.toString()}
                            index={index}
                            key={task.taskId}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="p-3 bg-blue-100 mb-3 rounded-md shadow-sm"
                              >
                                <h4 className="font-bold">{task.title}</h4>
                                <p className="text-sm text-gray-700">
                                  {task.description}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Story Point: {task.storyPoint}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Assigned to:{" "}
                                  {developers.find(
                                    (d) => d.id === task.assignedToId
                                  )?.name || "Unassigned"}
                                </p>
                              </div>
                            )}
                          </Draggable>
                        ) : null
                      )}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>

      {showModal && (
        <AddTask
          onClose={handleClose}
          onSave={handleSave}
          developers={developers}
          boardId={boardId}
        />
      )}
    </div>
  );
};

export default Board;

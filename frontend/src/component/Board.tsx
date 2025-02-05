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
import { useDevelopers } from "../contexts/allDeveloperContext";
import { updateTaskStatus } from "../services/TaskApiService";
import { useNavigate } from "react-router-dom";
import TaskPage from "./TaskPage";

interface Task {
  task_id:string;
  title: string;
  description: string;
  status: "TO_DO" | "IN_PROGRESS" | "DONE";
  storyPoint: "ONE" | "TWO" | "THREE" | "FIVE" | "TEN";
  assignedToId: string;
  boardId: string;
  assignorId:string;
}

const Board: React.FC = () => {
  const boardContext = useContext(BoardContext);
  const { board } = boardContext as unknown as BoardContextType;

  const storedBoardId = localStorage.getItem("boardId");
  const boardId = board?.boardId || storedBoardId;

  const [tasks, setTasks] = useState<Task[]>(board?.tasks || []);
  const [showModal, setShowModal] = useState(false);

  const {developers } = useDevelopers();

  const navigate = useNavigate();

  useEffect(() => {
    if (board?.boardId) {
      localStorage.setItem("boardId", board.boardId);
    }
  }, [board]);

  useEffect(() => {
    console.log("Updated tasks:", tasks);
  }, [tasks]);

  const handleTaskDrag = async (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
  
    const reorderedTasks = [...tasks];
    const [movedTask] = reorderedTasks.splice(source.index, 1);
    const newStatus = destination.droppableId as Task["status"];
    const updatedTask = { ...movedTask, status: newStatus };
    
    try {
      
      await updateTaskStatus(movedTask.task_id, updatedTask);
      movedTask.status = newStatus;
      reorderedTasks.splice(destination.index, 0, movedTask);
      setTasks(reorderedTasks);
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };
  

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSave = async (newTaskData: Task) => {
    if (!boardId) {
      console.error("Board ID is missing!");
      return;
    }

  
    const newTask: Task = {
      ...newTaskData,
      boardId, 
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
                        task.task_id ? (
                          <Draggable
                            draggableId={task.task_id.toString()}
                            index={index}
                            key={task.task_id}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="p-3 bg-blue-100 mb-3 rounded-md shadow-sm"
                                onClick={() =>
                                  navigate(`/task/${task.task_id}`, {
                                    state: { taskId: task.task_id }, // Pass taskId as part of state
                                  })
                                }
                                
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
                                    (d) => d.id === task.assignorId
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
          boardId={boardId}
        />
      )}
    </div>
  );
};

export default Board;

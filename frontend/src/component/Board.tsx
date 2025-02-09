import React, { useState, useEffect, useContext } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import AddTask from "./AddTask";
import { BoardContext } from "../contexts/BoardContext";
import { BoardContextType, Task } from "../interfaces/contextInterface";
import { useDevelopers } from "../contexts/allDeveloperContext";
import { updateTaskStatus } from "../services/TaskApiService";
import { useNavigate } from "react-router-dom";

const Board: React.FC = () => {
  
  const boardContext = useContext(BoardContext);

  const { board ,boards , setBoards} = boardContext as unknown as BoardContextType;

  const storedBoardId = localStorage.getItem("boardId");
  const boardId = board?.boardId || storedBoardId;

  const [tasks, setTasks] = useState<Task[]>(board?.tasks || []);
  const [showModal, setShowModal] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null); // Now a string

  const { developers } = useDevelopers();
  const navigate = useNavigate();
   
  useEffect(() => {

    if (board?.boardId) {
      localStorage.setItem("boardId", board.boardId);
    }
  }, [board]);

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
      comments: newTaskData.comments || [],
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setShowModal(false);
  };

  const toggleTaskMenu = (taskId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation on `...` click
    setActiveMenuId(activeMenuId === taskId ? null : taskId);
  };

  const handleEditTask = (taskId: any) => {
    console.log(taskId);
    navigate(`/editTask/${taskId}`);
  };

  const handleTaskAction = (taskId: string, action: string) => {
    if (action === "remove") {
      setTasks(tasks.filter((task) => task.task_id.toString() !== taskId));
    }
    if (action ==="edit"){
      handleEditTask(taskId);
    }
    setActiveMenuId(null); // Close menu after action
  };

  return (
    <div className="p-6 w-full bg-gray-100">
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
                                className="relative p-3 bg-blue-100 mb-3 rounded-md shadow-sm cursor-pointer"
                                onClick={() =>
                                  navigate(`/task/${task.task_id}`, {
                                    state: { taskId: task.task_id },
                                  })
                                }
                              >
                                {/* Task Options Button */}
                                <button
                                  className="absolute top-2 right-2 text-gray-700 font-bold"
                                  onClick={(e) =>
                                    toggleTaskMenu(task.task_id.toString(), e)
                                  }
                                >
                                  ...
                                </button>

                                {/* Dropdown Menu */}
                                {activeMenuId === task.task_id.toString() && (
                                  <div
                                    className="absolute top-8 right-2 z-50 bg-white shadow-lg rounded-md p-2 w-40 text-sm border"
                                    onClick={(e) => e.stopPropagation()} // Prevent closing on menu click
                                  >
                                    {/* <button
                                      className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                                      onClick={() =>
                                        handleTaskAction(
                                          task.task_id.toString(),
                                          "status"
                                        )
                                      }
                                    >
                                      Change Status
                                    </button> */}
                                    <button
                                      className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                                      onClick={() =>
                                        handleTaskAction(
                                          task.task_id.toString(),
                                          "edit"
                                        )
                                      }
                                    >
                                      Edit Task
                                    </button>
                                    <button
                                      className="block w-full text-left px-3 py-2 text-red-600 hover:bg-gray-100"
                                      onClick={() =>
                                        handleTaskAction(
                                          task.task_id.toString(),
                                          "remove"
                                        )
                                      }
                                    >
                                      Remove Task
                                    </button>
                                  </div>
                                )}

                                {/* Task Content */}
                                <h4 className="font-bold">
                                  {task.title.length <= 20
                                    ? task.title
                                    : `${task.title.substring(0, 20)}...`}
                                </h4>
                                <p className="text-xs text-gray-500">
                                  Story Point: {task.storyPoint}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Assigned to:{" "}
                                  {developers.find((d) => d.id === task.assignorId)
                                    ?.name || "Unassigned"}
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

      {showModal && <AddTask onClose={handleClose} onSave={handleSave} boardId={boardId} />}
    </div>
  );
};

export default Board;

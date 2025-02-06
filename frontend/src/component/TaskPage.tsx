import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { baseURL } from "../config/Config.json";
import { FaLocationArrow } from "react-icons/fa";
import { Comment, User } from "../interfaces/ContextInterface";
import { FaTrash } from "react-icons/fa";

interface Task {
  task_id: string;
  title: string;
  description: string;
  status: "TO_DO" | "IN_PROGRESS" | "DONE";
  storyPoint: "ONE" | "TWO" | "THREE" | "FIVE" | "TEN";
  assignedToId: string;
  boardId: string;
  assignorId: string;
}


const TaskPage: React.FC = () => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const user: User = JSON.parse(localStorage.getItem("user") ?? "{}");

  const [task, setTask] = useState<Task | null>(null);
  const [listComments, setListComments] = useState<Comment[]>([]);
  const [taskComment, setTaskComment] = useState<string>("");

  const handleComment = () => {
    if (taskComment.trim() === "") return;

    const newComment: Comment = {
      commentId: Date.now().toString(),
      task_id: task?.task_id || "",
      user: user,
      content: taskComment,
      createdAt: new Date().toISOString(),
    };

    setListComments([...listComments, newComment]);
    setTaskComment("");
  };

  const handleDeleteComment = (commentId: string) => {
    setListComments(listComments.filter((comment) => comment.commentId !== commentId));
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTask = async () => {
      if (taskId) {
        try {
          const res = await fetch(`${baseURL}/task/getTask/${taskId}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) {
            const data = await res.json();
            setTask(data);
          } else {
            console.error("Failed to fetch task details");
          }
        } catch (error) {
          console.error("Error fetching task:", error);
        }
      }
    };

    fetchTask();
  }, [taskId]);

  if (!task) return <p>Loading...</p>;

  return (
    <div className="p-6 rounded-lg flex flex-col">
      <div className="p-6 rounded-lg flex flex-row justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{task.title}</h2>
          <p>{task.description}</p>
        </div>
        <div>
          <p>Status: {task.status}</p>
          <p>Story Points: {task.storyPoint}</p>
          <p>Assigned to: {task.assignedToId}</p>
          <p>Assigned by: {task.assignorId}</p>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-lg">Comments:</h3>

        <div className="mt-4">
          {listComments.length > 0 ? (
            listComments.map((cmt) => (
              <div key={cmt.commentId} className="border p-3 rounded-md mt-2 flex justify-between items-center">
                <div>
                  <p className="text-sm font-semibold">{cmt.user.name}</p>
                  <p className="text-gray-800">{cmt.content}</p>
                  <p className="text-xs text-gray-500">{new Date(cmt.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteComment(cmt.commentId)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </div>

        <div className="p-4 flex items-center justify-center gap-2 mt-4">
          <input
            type="text"
            className="p-4 w-2/3 border rounded-md"
            placeholder="Write a comment..."
            value={taskComment}
            onChange={(e) => setTaskComment(e.target.value)}
          />
          <button
            className="flex items-center justify-center bg-blue-500 text-white px-4 py-4 rounded-md hover:bg-blue-600"
            onClick={handleComment}
          >
            <span className="mr-2">Send</span>
            <FaLocationArrow className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;

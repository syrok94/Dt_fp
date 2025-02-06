import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { baseURL } from "../config/Config.json";
import { FaLocationArrow } from "react-icons/fa";
import { Comment, Task, User } from "../interfaces/ContextInterface";
import { FaTrash } from "react-icons/fa";

const TaskPage: React.FC = () => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const user: User = JSON.parse(localStorage.getItem("user") ?? "{}");

  const [task, setTask] = useState<Task | null>(null);
  const [listComments, setListComments] = useState<Comment[]>([]);
  const [taskComment, setTaskComment] = useState<string>("");

  const handleComment = async () => {
    if (taskComment.trim() === "") return;

    const payload = {
      task_id: task?.task_id || "",
      user: user,
      content: taskComment,
    };

    const res = await fetch(`${baseURL}/comment/addComment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const newComment = await res.json();
      setListComments([...listComments, newComment]);
    } else {
      console.error("Failed to add comment");
    }

    setTaskComment("");
  };

  const handleDeleteComment = async(commentId: string) => {

    const res = await fetch(`${baseURL}/comment/removeComment/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    if (res.ok) {
     setListComments(
      listComments.filter((comment) => comment.commentId !== commentId)
    );
    } else {
      console.error("Failed to remove comment");
    }

   
  };

  const token = localStorage.getItem("token");

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

  const fetchAllComments = async () => {
    if (taskId) {
      try {
        const res = await fetch(`${baseURL}/comment/getAllComment/${taskId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setListComments(data);
        } else {
          console.error("Failed to fetch All comments!!");
        }
      } catch (error) {
        console.error("Error fetching Comments:", error);
      }
    }
  };

  useEffect(() => {
    fetchTask();
    fetchAllComments();
  }, [taskId]);

  if (!task) return <p>Loading...</p>;

  return (
    <div className="p-6 rounded-lg flex flex-col">
      <div className="p-6 rounded-lg flex flex-row justify-between">
        <div>
          <h2 className="text-3xl font-semibold">{task.title}</h2>
          <p>{task.description}</p>
        </div>
        <div >
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
          <p>
            <span className="font-medium">Story Points:</span> {task.storyPoint}
          </p>
          <p>
            {" "}
            <span className="font-medium">Assigned to: </span>
            {task.assignedToId}
          </p>
          <p>
            <span className="font-medium">Assigned by: </span>
            {task.assignorId}
          </p>
        </div>
      </div>

      <div className="mt-4 overflow-y-auto">
        <h3 className="font-semibold text-lg">Comments:</h3>

        <div className="mt-4">
          {listComments.length > 0 ? (
            listComments.map((cmt) => (
              <div
                key={cmt.commentId}
                className="border p-3 rounded-md mt-2 flex justify-between items-center"
              >
                <div>
                  <p className="text-sm font-semibold">{cmt.user.name}</p>
                  <p className="text-gray-800">{cmt.content}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(cmt.createdAt).toLocaleString()}
                  </p>
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

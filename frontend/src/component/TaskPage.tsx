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
  const [assignedToName, setAssignedToName] = useState<string | null>(null);
  const [assignorName, setAssignorName] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  // Function to fetch user details by ID
  const fetchUserName = async (userId: string) => {
    try {
      const res = await fetch(`${baseURL}/auth/getUserById/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const userData = await res.json();
        return userData.name; // Assuming the response contains a 'name' field
      } else {
        console.error("Failed to fetch user details");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };

  // Fetch task details, comments, and user names (assignedTo and assignor)
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

          // Fetch Assigned To and Assigned By names
          const assignedToName = await fetchUserName(data.assignedToId);
          const assignorName = await fetchUserName(data.assignorId);

          setAssignedToName(assignedToName);
          setAssignorName(assignorName);
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

  const handleDeleteComment = async (commentId: string) => {
    const res = await fetch(`${baseURL}/comment/removeComment/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setListComments(listComments.filter((comment) => comment.commentId !== commentId));
    } else {
      console.error("Failed to remove comment");
    }
  };

  if (!task) return <p>Loading...</p>;

  return (
    <div className="p-8 flex flex-col min-h-screen bg-gray-100 items-center">
      {/* Task Details Card */}
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-4xl font-bold text-gray-900">{task.title}</h2>

        {/* Task Status & Assignment */}
        <div className="mt-4 flex flex-wrap gap-6">
          <div>
            <span className="font-medium text-gray-700">Status:</span>
            <span
              className={`ml-2 inline-block px-4 py-1 rounded-full text-sm font-semibold 
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
          <p className="text-gray-700">
            <span className="font-medium">Story Points:</span> {task.storyPoint}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Assigned to:</span> {assignedToName || "Loading..."}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Assigned by:</span> {assignorName || "Loading..."}
          </p>
        </div>
      </div>

      {/* Task Description Card */}
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg p-6 mt-6">
        <h3 className="font-semibold text-xl text-gray-900">Description</h3>
        <p className="mt-2 text-gray-700 text-lg">{task.description}</p>
      </div>

      {/* Comments Section */}
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg p-6 mt-6 flex-grow">
        <h3 className="font-semibold text-xl text-gray-900">Comments</h3>
        <div className="mt-4 max-h-[500px] overflow-y-auto">
          {listComments.length > 0 ? (
            listComments.map((cmt) => (
              <div
                key={cmt.commentId}
                className="border p-4 rounded-md mt-3 flex justify-between items-center bg-gray-50"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900">{cmt.user.name}</p>
                  <p className="text-gray-800">{cmt.content}</p>
                  <p className="text-xs text-gray-500">{new Date(cmt.createdAt).toLocaleString()}</p>
                </div>
                <button
                  className="text-red-500 hover:text-red-700 transition"
                  onClick={() => handleDeleteComment(cmt.commentId)}
                >
                  <FaTrash />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </div>
      </div>

      {/* Comment Input Section */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-white p-5 flex items-center justify-center gap-3 shadow-lg"
      >
        <input
          type="text"
          className="p-4 w-3/4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          placeholder="Write a comment..."
          value={taskComment}
          onChange={(e) => setTaskComment(e.target.value)}
        />
        <button
          className="flex items-center justify-center bg-blue-500 text-white px-6 py-4 text-lg rounded-md hover:bg-blue-600 transition"
          onClick={handleComment}
        >
          <span className="mr-2">Send</span>
          <FaLocationArrow className="text-xl" />
        </button>
      </div>
    </div>

  );
};

export default TaskPage;

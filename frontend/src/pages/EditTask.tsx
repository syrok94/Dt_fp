import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Task } from "../interfaces/ContextInterface";
import { baseURL } from "../config/Config.json";
import { useDevelopers } from "../contexts/allDeveloperContext";

const EditTask: React.FC = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { developers } = useDevelopers();
  const token = localStorage.getItem("token");

  const fetchTask = async () => {
    if (!taskId) return;

    try {
      setLoading(true);
      const res = await fetch(`${baseURL}/task/getTask/${taskId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch task details");

      const data: Task = await res.json();
      setTask(data);
    } catch (err) {
      setError("Error fetching task details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (task) {
      setTask({ ...task, [e.target.name]: e.target.value });
    }
  };

  const updateTask = async () => {
    if (!task || !taskId) return;

    try {
      setLoading(true);
      const res = await fetch(`${baseURL}/task/updateTask/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
      });

      if (!res.ok) throw new Error("Failed to update task");

      navigate("/adminTasksTable");
    } catch (err) {
      setError("Error updating task");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
      {task && (
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Status</label>
            <select
              name="status"
              value={task.status}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="TO_DO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Story Point</label>
            <select
              name="storyPoint"
              value={task.storyPoint}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="ONE">1</option>
              <option value="TWO">2</option>
              <option value="THREE">3</option>
              <option value="FIVE">5</option>
              <option value="TEN">10</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Assign Developer</label>
            <select
              name="assignedToId"
              value={task.assignedToId} 
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              {developers.map((developer) => (
                <option key={developer.id} value={developer.id}>
                  {developer.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={updateTask}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
};

export default EditTask;

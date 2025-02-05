import React, { useState } from "react";
import {baseURL} from "../config/Config.json";
const AddTask = ({ onClose, onSave, developers, boardId }) => {
  const storyPointsMap = {
    "1": "ONE",
    "2": "TWO",
    "3": "THREE",
    "5": "FIVE",
    "10": "TEN",
  };

  const token = localStorage.getItem("token");

  

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("TO_DO");
  const [storyPoint, setStoryPoint] = useState("1"); 
  const [assignedTo, setAssignedTo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,  
      description: desc, 
      status,
      storyPoint: storyPointsMap[storyPoint], 
      assignedToId: assignedTo, 
      boardId, 
    };

    try {
      const res = await fetch(`${baseURL}/task/addTask`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Failed to add task: ${res.statusText}`);
      }

      const newTask = await res.json();
      onSave(newTask);
      onClose();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          >
            <option>TO_DO</option>
            <option>IN_PROGRESS</option>
            <option>DONE</option>
          </select>
          <select
            value={storyPoint}
            onChange={(e) => setStoryPoint(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          >
            {[1, 2, 3, 5, 10].map((point) => (
              <option key={point} value={point}>{point}</option>
            ))}
          </select>
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="">Select Developer</option>
            {developers.map((dev) => (
              <option key={dev.id} value={dev.id}>{dev.name}</option>
            ))}
          </select>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;

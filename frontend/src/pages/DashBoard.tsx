import { useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("developer");

  const data = {
    labels: ["Sprint 1", "Sprint 2", "Sprint 3", "Sprint 4"],
    datasets: [
      {
        label: "Progress %",
        data: [40, 60, 75, 90],
        backgroundColor: "#4F46E5",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Agile Project Dashboard</h1>
        
        <div className="flex space-x-4 bg-white p-2 rounded-lg shadow">
          <button 
            className={`p-2 rounded-lg ${activeTab === "developer" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("developer")}
          >
            Developer
          </button>
          <button 
            className={`p-2 rounded-lg ${activeTab === "admin" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("admin")}
          >
            Admin
          </button>
        </div>

        {activeTab === "developer" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-lg font-semibold">My Tasks</h2>
              <ul className="mt-2">
                <li className="p-2 bg-blue-100 rounded-lg mb-2">Complete API integration</li>
                <li className="p-2 bg-blue-100 rounded-lg">Fix authentication bug</li>
              </ul>
            </div>
            <div className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-lg font-semibold">Sprint Progress</h2>
              <Bar data={data} />
            </div>
          </div>
        )}

        {activeTab === "admin" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-lg font-semibold">Manage Sprints</h2>
              <button className="mt-2 p-2 bg-blue-500 text-white rounded-lg">Create New Sprint</button>
            </div>
            <div className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-lg font-semibold">Team Overview</h2>
              <p>Active Developers: 5</p>
              <p>Pending Tasks: 12</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
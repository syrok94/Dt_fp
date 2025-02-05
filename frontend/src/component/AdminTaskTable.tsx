import React from "react";

interface AdminTask {
  id: number;
  title: string;
  assignedTo?: string;
}

interface AdminTasksTableProps {
  tasks: AdminTask[];
  onEdit: (task_id: number) => void;
}

// const AdminTasksTable: React.FC<AdminTasksTableProps> = ({ tasks, onEdit }) => {
    const AdminTasksTable = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-4">Tasks</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Title</th>
            <th className="border p-2">Assigned To</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id} className="text-center border-b">
                <td className="border p-2">{task.title}</td>
                <td className="border p-2">{task.assignedTo || "Unassigned"}</td>
                <td className="border p-2">
                  <button
                    onClick={() => onEdit(task.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="border p-4 text-center">
                No tasks available
              </td>
            </tr>
          )} */}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTasksTable;

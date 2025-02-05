import React from "react";
import { useUsers } from "../contexts/allUsersContext";

interface AdminDeveloperList {
  id: number;
  name: string;
  role: string;
  taskAssigned?: string;
}

interface AdminDevelopersTableProps {
  developers: AdminDeveloperList[];
  onAction: (developerId: number) => void;
}


const AdminDevelopersTable = () => {

  const { users } = useUsers();

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-4">Developers</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Task Assigned</th>
            <th className="border p-2">Role</th>
            {/* <th className="border p-2">Action</th> */}
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user:any) => (
              <tr key={user.id} className="text-center border-b">
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.taskAssigned || "No Task Assigned"}</td>
                <td className="border p-2">{user.role}</td>
                {/* <td className="border p-2">
                  <button
                    onClick={() => onAction(developer.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  >
                    Manage
                  </button>
                </td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="border p-4 text-center">
                No developers available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDevelopersTable;

import { useContext, useState } from "react";
import { UserContext } from "../contexts/userContext";
import { UserContextType } from "../interfaces/contextInterface";

const UserProfilePage = () => {
  const { user, setUser } = useContext(UserContext) as UserContextType;

  const [editedName, setEditedName] = useState(user.name);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setUser({ ...user, name: editedName });
    setIsEditing(false);
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-xl font-bold mb-4">User Profile</h1>

        <div className="mb-4">
          <div className="font-semibold text-gray-600">Email:</div>
          <div className="text-gray-800">{user.email}</div>
        </div>

       
        <div className="mb-4">
          <div className="font-semibold text-gray-600">Name:</div>
          {isEditing ? (
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          ) : (
            <div className="text-gray-800">{user.name}</div>
          )}
        </div>

        <div className="mb-4">
          <div className="font-semibold text-gray-600">Role:</div>

          <div className="text-gray-800">{user.role}</div>
        </div>

        <div className="flex justify-between">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
          {isEditing && (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={handleSave}
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;

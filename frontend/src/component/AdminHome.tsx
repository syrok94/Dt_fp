import React, { useState } from 'react';

const AdminHome = () => {
  const [boards, setBoards] = useState([]);
  const [newBoardName, setNewBoardName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingBoardName, setEditingBoardName] = useState('');

  const handleAddBoard = () => {
    if (newBoardName.trim()) {
      setBoards([...boards, newBoardName]);
      setNewBoardName('');
      setIsModalOpen(false);
    }
  };

  const handleEditBoard = (index) => {
    setEditingIndex(index);
    setEditingBoardName(boards[index]);
  };

  const handleSaveEdit = () => {
    const updatedBoards = [...boards];
    updatedBoards[editingIndex] = editingBoardName;
    setBoards(updatedBoards);
    setEditingIndex(null);
    setEditingBoardName('');
  };

  const handleDeleteBoard = (index) => {
    const updatedBoards = boards.filter((_, i) => i !== index);
    setBoards(updatedBoards);
  };

  return (
    <div className="p-6">
      {/* Button aligned to the right */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Board
        </button>
      </div>

      {/* Editable Table for Boards */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Boards</h2>
        <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Board Name</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {boards.length === 0 ? (
              <tr>
                <td colSpan="2" className="py-2 px-4 text-center">
                  No boards added yet.
                </td>
              </tr>
            ) : (
              boards.map((board, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={editingBoardName}
                        onChange={(e) => setEditingBoardName(e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    ) : (
                      board
                    )}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {editingIndex === index ? (
                      <button
                        onClick={handleSaveEdit}
                        className="px-4 py-2 bg-green-500 text-white rounded mr-2"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditBoard(index)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded mr-2"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteBoard(index)}
                      className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Adding Board */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Board</h2>
            <input
              type="text"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              placeholder="Enter board name"
              className="w-full p-2 mb-4 border rounded"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddBoard}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Add Board
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHome;

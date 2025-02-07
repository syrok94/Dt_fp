import React, { useState, useContext } from "react";
import { BoardContext } from "../contexts/BoardContext";
import { Board, BoardContextType } from "../interfaces/contextInterface";
import {baseURL} from "../config/Config.json";

const AdminHome: React.FC = () => {
  const [newBoardName, setNewBoardName] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingBoardName, setEditingBoardName] = useState<string>("");
  

  const boardContext = useContext(BoardContext);

  const {boards, setBoards } = boardContext as unknown as BoardContextType;

  const token = localStorage.getItem("token");
  const userId = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}")?.id ?? null;
    } catch {
      return null;
    }
  })();  


  const handleAddBoard = async () => {
    if (!newBoardName.trim() || !userId) return;

    const payload = { name: newBoardName, createdBy: userId };
    try {
      const res = await fetch(`${baseURL}/board/addBoard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const result: Board = await res.json();
        setBoards([...boards, { ...result, tasks: result.tasks ?? [] }]);

        setNewBoardName("");
        setIsModalOpen(false);
      } else {
        console.error("Error adding board");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditBoard = (index: number) => {
    setEditingIndex(index);
    setEditingBoardName(boards[index].name);
  };

  const handleSaveEdit = async () => {
    if (editingBoardName.trim() && editingIndex !== null) {
      const updatedBoard = { ...boards[editingIndex], name: editingBoardName };
      console.log(updatedBoard);
      try {
        const res = await fetch(
          `${baseURL}/board/updateBoard/${updatedBoard.boardId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedBoard),
          }
        );

        if (res.ok) {
          const updatedBoards = [...boards];
          updatedBoards[editingIndex] = updatedBoard;
          setBoards(updatedBoards);
          setEditingIndex(null);
          setEditingBoardName("");
        } else {
          console.error("Error updating board");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleDeleteBoard = async (index: number) => {
    const boardToDelete = boards[index];

    try {
      const res = await fetch(
        `${baseURL}/board/removeBoard/${boardToDelete.boardId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        setBoards(boards.filter((_, i) => i !== index));
      } else {
        console.error("Error deleting board");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Board
        </button>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Boards</h2>
        <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
          <thead>
            <tr >
              <th className="py-2 px-4 border-b text-centre">Board Name</th>
              <th className="py-2 px-4 border-b text-centre">Actions</th>
            </tr>
          </thead>
          <tbody>
            {boards.length === 0 ? (
              <tr>
                <td colSpan={2} className="py-2 px-4 text-center">
                  No boards added yet.
                </td>
              </tr>
            ) : (
              boards.map((board, index) => (
                <tr key={board.boardId}>
                  <td className="py-2 px-4 border-b text-center">
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={editingBoardName}
                        onChange={(e) => setEditingBoardName(e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    ) : (
                      board.name
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

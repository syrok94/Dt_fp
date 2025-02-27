/* eslint-disable react-refresh/only-export-components */
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { Board, BoardContextType } from '../interfaces/contextInterface';
import { fetchAllBoards } from '../services/ApiServices';

interface BoardContextProviderProps {
  children: ReactNode;
}

export const BoardContext = createContext<BoardContextType | undefined>(undefined);


const initialBoardState: Board = {
  boardId: "",
  name: "",
  createdBy: "",
  tasks: []
};

const BoardContextProvider: React.FC<BoardContextProviderProps> = ({ children }) => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [board, setBoard] = useState<Board>(initialBoardState); 

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const data: Board[] | null = await fetchAllBoards();
        if (Array.isArray(data) && data.length > 0) {
          setBoards(data);
          setBoard(data[0]); // Set the first board as the default
        }
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };

    fetchBoards();
  }, []);
  return (
    <BoardContext.Provider value={{ board , boards, setBoards }}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContextProvider;

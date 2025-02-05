/* eslint-disable react-refresh/only-export-components */
import React, { createContext, ReactNode, useState } from 'react';
import { Board, BoardContextType } from '../interfaces/contextInterface';

interface BoardContextProviderProps {
  children: ReactNode;
}

// Define the initial board state
const initialBoardState: Board = {
  boardId: "",
  name: "",
  createdBy: "",
  tasks: []
};

// Create the context with a proper type
export const BoardContext = createContext<BoardContextType | undefined>(undefined);

const BoardContextProvider: React.FC<BoardContextProviderProps> = ({ children }) => {
  const [board, setBoard] = useState<Board>(initialBoardState);

  return (
    <BoardContext.Provider value={{ board, setBoard }}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContextProvider;

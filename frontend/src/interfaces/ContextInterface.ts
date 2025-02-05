export interface LoginContextType {
  token: string;
  setToken: (token: string) => void;
}

export interface UserContextType {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  setUser: (user: {
    id: string;
    email: string;
    name: string;
    role: string;
  }) => void;
}

export interface Board {
  boardId: string;
  name: string;
  createdBy: string;
  tasks: []; 
}

export interface BoardContextType {
  board: Board;
  setBoard: (board: Board) => void;
}


export interface User{
  id:string;
  name:string;
  email:string;
  role:string;
}

export interface Task {
  task_id:string;
  title: string;
  description: string;
  status: string;
  storyPoint: string;
  assignedToId: string;
  boardId: string;
  assignorId:string;
}
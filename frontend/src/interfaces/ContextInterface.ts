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
    setUser: (user: { id: string; email: string; name: string; role: string }) => void;
  }



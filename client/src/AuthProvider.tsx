import { ReactNode, useEffect, useRef, useState } from "react";
import { CurrentUser } from "./utils/types/types";
import axiosClient from "./utils/axiosClient";
import { AuthContext } from "./contexts/AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}
export default function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>();

  const login = (user: CurrentUser) => {
    setCurrentUser(user);
  };

  const logout = async () => {
    await axiosClient.post("/api/auth/signout");
    setCurrentUser(null);
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      const res = await axiosClient.get("/api/auth/currentUser");
      const { currentUser: user } = res.data;
      setCurrentUser(user);
    };
    getCurrentUser();
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

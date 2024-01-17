import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";

import Licitaciones from "./routes/licitaciones";
import LicitacionesView from "./routes/licitaciones/LicitacionesView";
import Login from "./routes/login";
import Root from "./routes/root";
import { CurrentUser } from './utils/types/types';
import axiosClient from './utils/axiosClient';
import ErrorHandler from './shared/error/ErrorHandler';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorHandler />,
    children: [
      {
        path: "/licitaciones",
        element: <Licitaciones />,
        loader: async () => {
          const tenderRes = await axiosClient.get("https://kllejero.dev/api/tender");
          return tenderRes.data;
        },
      },
      {
        path: "/licitaciones/:code",
        element: <LicitacionesView />
      }
    ],
  },
  {
    path: "/login",
    element: <Login />
  },
]);

export default function App() {
  const [ currentUser, setCurrentUser ] = useState<CurrentUser>();

  const login =  (user: any) => {
    setCurrentUser(user);
  }

  const logout = async () => {
    await axiosClient.post("https://kllejero.dev/api/auth/signout");
    setCurrentUser(undefined);
  }

  useEffect(() => {
    const getCurrentUser = async () => {
      setCurrentUser(await axiosClient.get("https://kllejero.dev/api/auth/currentUser"));
    }
    getCurrentUser();
  }, [])

  return (
    <AuthContext.Provider value={{currentUser, login, logout}}>
      <RouterProvider key={currentUser? currentUser.email : null} router={router} />
    </AuthContext.Provider>
  );
}

import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter, useParams } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import { SignalRContext } from './contexts/SignalRContext';

import Licitaciones from "./routes/licitaciones";
import LicitacionesView from "./routes/licitaciones/LicitacionesView";
import Login from "./routes/login";
import Root from "./routes/root";
import { CurrentUser, AuthDataResponse } from './utils/types/types';
import axiosClient from './utils/axiosClient';
import ErrorHandler from './shared/error/ErrorHandler';
import TrackingsView from './routes/trackings/TrackingsView';

import filterRoutes from './routes/filters/Routes'
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './shared/error/ErrorFallback';
import RequireAuth from './components/RequireAuth';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ErrorBoundary
      FallbackComponent={ErrorFallback}
    >
      <RequireAuth>
        <Root />
      </RequireAuth>
    </ErrorBoundary>
      ,
    errorElement: <ErrorHandler />,
    children: [
      {
        path: "/licitaciones",
        element: <Licitaciones />,
        loader: async () => {
          const tenderRes = await axiosClient.get("/api/tender" /*'http://localhost:3000/tender'*/);
          return tenderRes.data;
        },
      },
      {
        path: "/licitaciones/:code",
        element: <LicitacionesView />
      },
      ...filterRoutes,
      {
        path: "/trackings",
        element: <TrackingsView />
      }
    ],
  },
  {
    path: "/login",
    element: <Login />
  },
]);

export default function App() {
  const [ currentUser, setCurrentUser ] = useState<AuthDataResponse>();

  const login =  (user: any) => {
    setCurrentUser(user);
  }

  const logout = async () => {
    await axiosClient.post("/api/auth/signout" /*'http://localhost:3000/signout'*/);
    setCurrentUser(undefined);
  }

  useEffect(() => {
    const getCurrentUser = async () => {
      setCurrentUser(await axiosClient.get("/api/auth/currentUser"/*'http://localhost:3000/currentUser'*/));
    }
    getCurrentUser();
  }, [])

  return (
    <AuthContext.Provider value={{currentUser, login, logout}}>
      <SignalRContext.Provider
        connectEnabled={true}
        accessTokenFactory={() => 'https://kllejero.dev/api/notification/notificationHub'}
        dependencies={['https://kllejero.dev/api/notification/notificationHub']} //remove previous connection and create a new connection if changed
        url={'https://kllejero.dev/api/notification/notificationHub'}
      >
        <RouterProvider key={currentUser &&
                             currentUser.data &&
                             currentUser.data.currentUser ? 
                             currentUser.data.currentUser.email 
                             : null} 
                             router={router} 
        />
      </SignalRContext.Provider>
    </AuthContext.Provider>
  );
}

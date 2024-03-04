import {
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";
import { SignalRContext } from "./contexts/SignalRContext";

import Root from "./routes/root";
import TrackingsView from "./routes/trackings/TrackingsView";
import ErrorHandler from "./shared/error/ErrorHandler";

// Routes
import authRoutes from "./routes/auth/Routes";
import filterRoutes from "./routes/filters/Routes";
import tenderRoutes from "./routes/tenders/Routes";

import { ErrorBoundary } from "react-error-boundary";
import AuthProvider from "./AuthProvider";
import RequireAuth from "./components/RequireAuth";
import ErrorFallback from "./shared/error/ErrorFallback";
import axiosClient from "./utils/axiosClient";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <RequireAuth>
          <Root />
        </RequireAuth>
      </ErrorBoundary>
    ),
    errorElement: <ErrorHandler />,
    children: [
      ...tenderRoutes,
      ...filterRoutes,
      {
        path: "/trackings",
        element: <TrackingsView />,
      },
      {
        path: "/test",
        element: <div>test element</div>,
        loader: async ({ params }: any) => {
          const { id } = params;
          return 0;
        },
      }
    ],
  },
  ...authRoutes,
]);

export default function App() {

  return (
    <AuthProvider>
      <SignalRContext.Provider
        connectEnabled={true}
        accessTokenFactory={() =>
          "https://kllejero.dev/api/notification/notificationHub"
        }
        dependencies={["https://kllejero.dev/api/notification/notificationHub"]} //remove previous connection and create a new connection if changed
        url={"https://kllejero.dev/api/notification/notificationHub"}
      >
        <RouterProvider
          // key={currentUser ? currentUser.email : "router-provider"}
          router={router}
        />
      </SignalRContext.Provider>
    </AuthProvider>
  );

}

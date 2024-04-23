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
import trackingsRoutes from "./routes/trackings/Routes";
import userRoutes from "./routes/users/Routes";

import { ErrorBoundary } from "react-error-boundary";
import AuthProvider from "./AuthProvider";
import RequireAuth from "./components/RequireAuth";
import ErrorFallback from "./shared/error/ErrorFallback";
import SignalRProvider from "./routes/root/SignalRProvider";

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
      ...trackingsRoutes,
      ...userRoutes,
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
      <SignalRProvider>
        <RouterProvider
          // key={currentUser ? currentUser.email : "router-provider"}
          router={router}
        />
      </SignalRProvider>
     </AuthProvider>
  );

}

import { ErrorBoundary } from "react-error-boundary";
import Login from "./components/Login";
import ErrorFallback from "../../shared/error/ErrorFallback";

export default [

  {
    path: "/auth/login",
    element: <ErrorBoundary
      FallbackComponent={ErrorFallback}
    >
     <Login />
    </ErrorBoundary>
  },
]

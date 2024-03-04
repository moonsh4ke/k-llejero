import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

interface RequireAuthProps {
  children: React.ReactNode;
}
export default function RequireAuth({ children }: RequireAuthProps) {
  const location = useLocation();

  const { currentUser } = useContext(AuthContext)!;

  // When the app mounts, there's an effect waiting to provide a currentUser either and object {} or null
  // if undefined, then this is the first render
  // aparently we have to render something, so we have a problem redirecting
  if (currentUser === undefined) return null;

  return currentUser ? (
    children
  ) : (
    <Navigate to="/auth/login" state={{ returnTo: location.pathname }} />
  );
}

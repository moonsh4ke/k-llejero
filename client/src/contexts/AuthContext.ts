import { createContext } from "react";
import { AuthContextData } from "../utils/types/types";

export const AuthContext = createContext<AuthContextData | null>(null);

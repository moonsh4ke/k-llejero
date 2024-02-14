import { createContext } from "react";
import { SnackbarData, SnackbarType } from "../utils/types/types";

export const SnackbarContext = createContext<
  ((msg: string, typ: SnackbarType) => void) | null
>(null);

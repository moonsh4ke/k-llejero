import { useContext } from "react"
import { SnackbarContext } from "../../contexts/SnackbarContext";

export default function useNotify() {
  const notify = useContext(SnackbarContext)!;
  return notify;
}

import { useState } from "react";
import { SnackbarType } from "../../utils/types/types";
import CustomSnackbar from "../components/CustomSnackbar";

export default function useSnackbar() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState<string>()
  const [type, setType] = useState<SnackbarType>()

  const showSnackbar = (msg: string, typ: SnackbarType) => {
    setMessage(msg);
    setType(typ);
    setOpenSnackbar(true);
  };

  const Snackbar = (
    <CustomSnackbar
      message={message? message : undefined}
      type={type? type : undefined}
      openSnackbar={openSnackbar}
      setOpenSnackbar={setOpenSnackbar}
    />
  );

  return { Snackbar, showSnackbar };
}

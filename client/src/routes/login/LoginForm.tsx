import { Alert, AlertTitle, TextField, Button, Link, InputAdornment } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import { useContext, useState } from "react";
import axiosClient from "../../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([])
  const navigate = useNavigate();
  const { login } = useContext(AuthContext)!;

  const handleSubmit = async () => {
    const data = { email, password };
    const apiUrl = 'http://localhost:3000';

    try {
      await axiosClient.post("https://kllejero.dev/api/auth/signin"/*`${apiUrl}/signin`*/ , data)
      const res = await axiosClient.get(`https://kllejero.dev/api/auth/currentUser`);
      const currentUser = res.data;
      setErrors([]);
      login(currentUser);
      navigate("/licitaciones");
    } catch(err: any) {
        console.log(err.response);
        setErrors(err.response.data);
    }
  };

  return (
    <>
      <TextField
        id="outlined-basic"
        label="Correo"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="filled-basic"
        type="password"
        label="Contraseña"
        variant="outlined"
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <KeyIcon />
            </InputAdornment>
          ),
        }}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.length > 0 &&
        <Alert sx={{mb: 2}} severity="error">
          <AlertTitle>Authetication error</AlertTitle>
          <ul>
            {errors.map((err: any) => <li key={err.message}>{err.message}</li>)}
          </ul>
        </Alert>
      }
      <Button
        sx={{ mb: 2 }}
        size="large"
        variant="contained"
        onClick={handleSubmit}
      >
        Login
      </Button>
      <Link sx={{ textAlign: "end" }} variant="body1">
        ¿Olvidó su contraseña?
      </Link>
    </>
  );
}

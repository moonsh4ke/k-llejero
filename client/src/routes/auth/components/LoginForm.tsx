import AccountCircle from "@mui/icons-material/AccountCircle";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Link,
  Stack,
} from "@mui/material";
import { useContext, useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import CustomTextField from "../../../shared/components/inputs/CustomTextField";
import useRequest from "../../../shared/hooks/requests/useRequest";

import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "@sn1006/schemas";
import { zodI18nMap } from "zod-i18n-map";
import PasswordField from "./PasswordField";

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm({
    resolver: zodResolver(authSchema, { errorMap: zodI18nMap }),
  });

  const { doRequest, response, errors, loading } = useRequest(
    "post",
    "/api/auth/signin"
  );

  const { showBoundary } = useErrorBoundary();

  const { login } = useContext(AuthContext)!;

  useEffect(() => {
    if (response?.status == 200) {
      const user = response.data;
      login(user);
      if (location.state?.returnTo) {
        navigate(location.state.returnTo);
      } else {
        navigate("/")
      };
    }
  }, [response]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        try {
          doRequest(data);
        } catch (err) {
          showBoundary(err);
        }
      })}
    >
      <Stack spacing={3}>
        <CustomTextField
          control={control}
          errors={formErrors}
          name="email"
          label="Correo"
          fullWidth
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
        <PasswordField fullWidth control={control} formErrors={formErrors} />
        {errors && errors.length > 0 && (
          <Alert sx={{ mb: 2 }} severity="error">
            <AlertTitle>Authetication error</AlertTitle>
            <ul>
              {errors.map((err: any) => (
                <li key={err.message}>{err.message}</li>
              ))}
            </ul>
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Button size="large" variant="contained" type="submit">
              Login
            </Button>
            <Link sx={{ textAlign: "end" }} variant="body1">
              ¿Olvidó su contraseña?
            </Link>
          </>
        )}
      </Stack>
    </form>
  );
}

import { SerializedError } from "@sn1006/common";
import { User } from "../utils/types";
import { AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import { useErrorBoundary } from "react-error-boundary";
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import CustomTextField from "../../../shared/components/inputs/CustomTextField";
import { Link } from "react-router-dom";
import { Cancel, Save } from "@mui/icons-material";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@sn1006/schemas";
import { zodI18nMap } from "zod-i18n-map";

interface UserFormProps {
  user?: User;
  submitCallback: (data: any) => Promise<any>;
  errors?: SerializedError[];
  loading?: boolean;
  response?: AxiosResponse;
}

export default function UserForm({
  user,
  submitCallback,
  errors,
  loading,
  response,
}: UserFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm({
    resolver: zodResolver(userSchema, { errorMap: zodI18nMap }),
  });
  const { showBoundary } = useErrorBoundary();

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        {user
          ? `Editar usuario ${user.name} ${user.lastname}`
          : "Crear usuario"}
      </Typography>
      <form
        onSubmit={handleSubmit((data) => {
          try {
            submitCallback(data);
          } catch (err) {
            showBoundary(err);
          }
        })}
      >
        <Stack
          spacing={3}
          sx={{
            width: { sm: "100%", md: "75%", lg: "50%" },
          }}
        >
          <CustomTextField
            control={control}
            errors={formErrors}
            name="name"
            label="Nombre *"
            defaultValue={user ? user.name : ""}
            fullWidth
          />
          <CustomTextField
            control={control}
            errors={formErrors}
            name="lastname"
            label="Apellido *"
            defaultValue={user ? user.lastname : ""}
            fullWidth
          />
          <CustomTextField
            control={control}
            errors={formErrors}
            name="phone"
            label="Teléfono *"
            defaultValue={user ? user.phone : ""}
            fullWidth
          />
          <CustomTextField
            control={control}
            errors={formErrors}
            name="email"
            label="Correo electrónico *"
            defaultValue={user ? user.email : ""}
            fullWidth
          />
          <CustomTextField
            control={control}
            errors={formErrors}
            name="rut"
            label="RUT *"
            defaultValue={user ? user.rut : ""}
            fullWidth
          />
          {errors && (
            <Alert severity="error">
              <Typography>Validation Error</Typography>
              <ul>
                {errors.map((err) => (
                  <li>{err.message}</li>
                ))}
              </ul>
            </Alert>
          )}
          <Divider sx={{ my: 3 }} />
          {loading ? (
            <CircularProgress />
          ) : (
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                size="small"
                type="submit"
                startIcon={<Save />}
              >
                Guardar
              </Button>
              <Button variant="text" size="small" startIcon={<Cancel />}>
                <Link
                  to={user ? `/users/${user.id}` : "/users"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Cancelar
                </Link>
              </Button>
            </Stack>
          )}
        </Stack>
      </form>
    </Container>
  );
}

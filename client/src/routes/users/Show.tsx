import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { User } from "./utils/types";
import { Link, useLoaderData } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";

export default function Show() {
  const user = useLoaderData() as User | undefined;
  return user &&
    <Container>
      <Typography variant="h6" gutterBottom>
        Usuario {user.email}
      </Typography>
      <Button sx={{ mb: 2 }} variant="text" size="small" startIcon={<Edit />}>
        <Link to="edit" style={{ textDecoration: "none", color: "inherit" }}>
          Editar
        </Link>
      </Button>
      <Button
        sx={{ mb: 2 }}
        variant="text"
        size="small"
        startIcon={<Delete />}
      >
        Eliminar
      </Button>
      <Stack spacing={3} sx={{ width: { sm: "100%", md: "75%", lg: "50%" } }}>
        <TextField
          value={user.name}
          label="Nombre"
          disabled
        />
        <TextField
          value={user.lastname}
          label="Apellido"
          disabled
        />
        <TextField
          value={user.phone}
          label="Teléfono"
          disabled
        />
        <TextField
          value={user.email}
          label="Correo electrónico"
          disabled
        />
        <TextField
          value={user.rut}
          label="RUT"
          disabled
        />
      </Stack>
    </Container>
}

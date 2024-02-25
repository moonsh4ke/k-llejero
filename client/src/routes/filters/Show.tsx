import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { Filter } from "./utils/types";
import {
  Button,
  Container,
  Divider,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Keywords from "./components/Keywords";
import { Delete, Edit } from "@mui/icons-material";
import axiosClient from "../../utils/axiosClient";
import useNotify from "../../shared/hooks/useNotify";
import { useErrorBoundary } from "react-error-boundary";

export default function Show() {
  const filter = useLoaderData() as Filter;
  const navigate = useNavigate();
  const notify = useNotify();
  const { showBoundary } = useErrorBoundary();

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Filtro {filter.name}
      </Typography>
      <Button sx={{ mb: 2 }} variant="text" size="small" startIcon={<Edit />}>
        <Link to="edit" style={{ textDecoration: "none", color: "inherit" }}>
          Editar
        </Link>
      </Button>
      <Button
        onClick={async () => {
          try {
            await axiosClient.delete(`/api/filter/${filter.id}`)
            navigate("/filters");
            notify("Filtro eliminado satisfactoriamente", "success");
          } catch(err) {
            showBoundary(err);
          }
        }}
        sx={{ mb: 2 }}
        variant="text"
        size="small"
        startIcon={<Delete />}
      >
        Eliminar
      </Button>
      <Stack spacing={3} sx={{ width: { sm: "100%", md: "75%", lg: "50%" } }}>
        <TextField value={filter.name} label="Nombre" disabled />
        <TextField
          value={filter.description}
          label="Descripción"
          multiline
          disabled
        />
        <FormControlLabel
          control={<Switch checked={filter.active} disabled />}
          label="Activo"
        />
        <Keywords keywords={filter.keywords} />
      </Stack>
      <Divider sx={{ my: 1 }} />
    </Container>
  );
}

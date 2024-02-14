import { Link, useLoaderData, useParams } from "react-router-dom";
import { Filter } from "./utils/types";
import {
  Button,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Keywords from "./components/Keywords";
import { Delete, Edit } from "@mui/icons-material";

export default function Show() {
  const filter = useLoaderData() as Filter;
  const { control, handleSubmit } = useForm();

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Filtro {filter.name}
      </Typography>
      <Button sx={{mb: 2}} variant="text" size="small" startIcon={<Edit />}>
        <Link to="edit" style={{textDecoration: "none", color: "inherit"}}>Editar</Link>
      </Button>
      <Button sx={{mb: 2}} variant="text" size="small" startIcon={<Delete />}>
        <Link to="#" style={{textDecoration: "none", color: "inherit"}}>Eliminar</Link>
      </Button>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <Stack spacing={3} sx={{ width: { sm: "100%", md: "75%", lg: "50%" } }}>
        <Controller
          name="name"
          control={control}
          defaultValue={filter.name}
          disabled
          render={({ field }) => <TextField {...field} label="Nombre" />}
        />
        <Controller
          name="description"
          control={control}
          disabled
          defaultValue={filter.description}
          render={({ field }) => (
            <TextField {...field} label="Descripción" multiline />
          )}
        />
          <Keywords keywords={filter.keywords} />
        </Stack>
        <Divider sx={{ my: 1 }} />
      </form>
    </Container>
  );
}

import { Add, Cancel, Close, Save } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { SerializedError } from "@sn1006/common";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import CustomTextField from "../../../shared/components/inputs/CustomTextField";
import { Filter, Keyword } from "../utils/types";
import Keywords from "./Keywords";
import CustomSwitch from "../../../shared/components/inputs/CustomSwitch";

interface FilterFormProps {
  filter?: Filter;
  submitCallback: (data: any) => Promise<any>;
  errors?: SerializedError[];
  loading?: boolean;
  response?: AxiosResponse;
}

export default function FilterForm({
  filter,
  submitCallback,
  loading,
  errors,
  response,
}: FilterFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();
  const [keywords, setKeywords] = useState<Keyword[]>(
    filter ? filter.keywords : []
  );
  const [keyword, setKeyword] = useState<string>("");
  const [keywordAdd, setKeywordAdd] = useState<boolean>(false);

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        {filter ? `Editar ${filter.name}` : "Crear filtro"}
      </Typography>
      <form
        onSubmit={handleSubmit((data) => {
          submitCallback(data);
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
            defaultValue={filter? filter.name : ""}
            rules={{required: "campo requerido"}}
          />
          <CustomTextField
            control={control}
            errors={formErrors}
            name="description"
            label="Descripción *"
            defaultValue={filter? filter.description : ""}
            rules={{required: "campo requerido"}}
          />
          <CustomSwitch
            name="active"
            label="Activo"
            defaultValue={filter? filter.active : true}
            control={control}
          />
          {!keywordAdd && (
            <Box>
              <Button
                onClick={() => setKeywordAdd(true)}
                variant="text"
                size="small"
                startIcon={<Add />}
              >
                Agregar palabra clave
              </Button>
            </Box>
          )}
          {keywordAdd && (
            <Stack direction="row" spacing={1}>
              <TextField
                value={keyword}
                label="Palabra clave"
                onChange={(e) => setKeyword(e.target.value)}
              />
              <IconButton
                color="primary"
                onClick={() => {
                  setKeywords([
                    ...keywords,
                    {
                      id: uuidv4(),
                      value: keyword,
                    },
                  ]);
                  setKeyword("");
                }}
              >
                <Add />
              </IconButton>
              <IconButton
                color="primary"
                onClick={() => {
                  setKeywordAdd(false);
                  setKeyword("");
                }}
              >
                <Close />
              </IconButton>
            </Stack>
          )}
          {keywords.length > 0 && (
            <Keywords keywords={keywords} setKeywords={setKeywords} />
          )}
        </Stack>
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
                to={filter ? `/filters/${filter.id}` : "/filters"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Cancelar
              </Link>
            </Button>
          </Stack>
        )}
      </form>
    </Container>
  );
}

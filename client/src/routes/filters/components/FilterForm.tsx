import { Add, Cancel, Close, Save } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Filter, Keyword } from "../utils/types";
import Keywords from "./Keywords";
import { AxiosResponse } from "axios";

interface FilterFormProps {
  filter?: Filter;
  submit: (data: any) => Promise<AxiosResponse>;
}

export default function FilterForm({ filter, submit }: FilterFormProps) {
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState<Keyword[]>(
    filter ? filter.keywords : []
  );
  const [keyword, setKeyword] = useState<string>("");
  const [keywordAdd, setKeywordAdd] = useState(false);


  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        {filter ? `Editar ${filter.name}` : "Crear filtro"}
      </Typography>
      <form
        onSubmit={handleSubmit(async (formData) => {
          const reqData = { ...formData, keywords };
          const filterRes = await submit(reqData);
          navigate(`/filters/${filterRes.data.id}`)
        })}
      >
        <Stack
          spacing={3}
          sx={{
            width: { sm: "100%", md: "75%", lg: "50%" },
          }}
        >
          <Controller
            name="name"
            control={control}
            defaultValue={filter ? filter.name : ""}
            render={({ field }) => <TextField {...field} label="Nombre" />}
          />
          <Controller
            name="description"
            control={control}
            defaultValue={filter ? filter.description : ""}
            render={({ field }) => (
              <TextField {...field} label="Descripción" multiline />
            )}
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
        <Divider sx={{ my: 3 }} />
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
      </form>
    </Container>
  );
}

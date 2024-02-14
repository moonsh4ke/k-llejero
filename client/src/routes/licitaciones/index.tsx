import { useLoaderData, useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Container,
  InputAdornment,
  Link,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import AuthMiddleware from "../../components/AuthMiddleware";
import FilterArrayInput from "../../shared/components/FilterArrayInput";
import { Search } from "@mui/icons-material";

function createData(
  code: string,
  name: string,
  state_code: string,
  end_date: string
) {
  return { code, name, state_code, end_date };
}

const rows = [
  createData(
    "1000-20-LP23",
    "Sum. mat. pétreo Ruta Q-677 Comuna Sta. Bárbara.",
    "Publicada",
    "2023-10-30T18:30:00.000+00:00"
  ),
  createData(
    "1000-25-LE23",
    "Sum. material pétreo Ruta Q-485Comuna de Antuco.",
    "Publicada",
    "2023-10-30T18:30:00.000+00:00"
  ),
  createData(
    "1509-5-L114",
    "Insumos Medicos y Medicamentos",
    "Adjudicada",
    "2023-10-30T18:30:00.000+00:00"
  ),
];

export default function LicitacionesIndex() {
  const navigate = useNavigate();
  const tenders = useLoaderData();
  const [showSnackbar, setShowSnackbar] = useState(false);

  const createTracking = async (tenderId: string) => {
    try {
      const endpoint = `https://kllejero.dev/api/tracking/api/trackings/${tenderId}`;
      const resp = await axios.post(endpoint);
      console.log(resp.data);
    } catch (error) {
      console.error(`createTracking error => ${error}`);
    }
  }

  const handleSnackbarClose = () => {
    setShowSnackbar(!showSnackbar);
  }

  return (
  <AuthMiddleware>
    {showSnackbar &&
      <Snackbar open={showSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Seguimiento creado correctamente!
        </Alert>
      </Snackbar>
    }
    <Container>
      <Stack direction="row" sx={{mb: 2}} spacing={2}>
        <FilterArrayInput  />
        <TextField
          size="small"
          sx={{width: 400}}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Acciones</TableCell>
              <TableCell>Código</TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Estado</TableCell>
              <TableCell align="right">Fecha de Cierre</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tenders.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Link
                    onClick={() => createTracking(row.code)}
                  >
                    Seguir
                  </Link>
                </TableCell>
                <TableCell component="th" scope="row">
                <Link
                  onClick={()=>navigate(`/licitaciones/${row.code}`)}
                >
                  {row.code}
                </Link>
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.stateCode}</TableCell>
                <TableCell align="right">{row.endDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  </AuthMiddleware>
  );
}

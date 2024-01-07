import { useNavigate } from "react-router-dom";

import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
} from "@mui/material";

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
  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Estado</TableCell>
              <TableCell align="right">Fecha de Cierre</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                <Link
                  onClick={()=>navigate(`/licitaciones/${row.code}`)}
                >
                  {row.code}
                </Link>
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.state_code}</TableCell>
                <TableCell align="right">{row.end_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

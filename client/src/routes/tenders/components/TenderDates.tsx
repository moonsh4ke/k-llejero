import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { blue } from "@mui/material/colors";

export default function TenderDates({ tender }) {
  return (
    <TableContainer sx={{ width: "500px" }} component={Paper}>
      <Table>
        <TableBody>
          {Object.keys(tender["Fechas"]).map((key) => {
            return (
              <TableRow>
                <TableCell
                  sx={{
                    borderRight: 1,
                    borderColor: "divider",
                    bgcolor: blue[50],
                    // width: "50px",
                  }}
                >
                  <b>{key.replace(/([A-Z])/g, " $1").trim()}</b>
                </TableCell>
                <TableCell>
                  {tender["Fechas"][key] !== null &&
                    new Date(tender["Fechas"][key]).toLocaleString("es-ES", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

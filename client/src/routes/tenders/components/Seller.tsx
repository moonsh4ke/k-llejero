import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { ExpandMore } from "@mui/icons-material";

import React from "react";
import { blue } from "@mui/material/colors";

export default function Seller({ tender }) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <>
          <TableContainer sx={{width: "700px"}} component={Paper}>
            <Table>
              <TableBody>
                {Object.keys(tender["Comprador"]).map((key) => {
                  return (
                    <TableRow>
                      <TableCell sx={{
                        borderRight: 1,
                        borderColor: "divider",
                        bgcolor: blue[50],
                      }}>
                        <b>{key.replace(/([A-Z])/g, " $1").trim()}</b>
                      </TableCell>
                      <TableCell>{tender["Comprador"][key]}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
    </>
  );
}

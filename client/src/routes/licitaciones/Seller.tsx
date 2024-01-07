import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { ExpandMore } from "@mui/icons-material";

import React from "react";

export default function Seller({ tender }) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Ver Comprador
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Table>
            <TableBody>
              {Object.keys(tender["Comprador"]).map((key) => {
                return (
                  <TableRow>
                    <TableCell>
                      <b>{key}</b>
                    </TableCell>
                    <TableCell>{tender["Comprador"][key]}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Ver Fechas
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Table>
            <TableBody>
              {Object.keys(tender["Fechas"]).map((key) => {
                return ( tender["Fechas"][key] &&
                  <TableRow>
                    <TableCell>
                      <b>{key}</b>
                    </TableCell>
                    <TableCell>{tender["Fechas"][key]}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Ver items
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Table>
            <TableBody>
              {Object.keys(tender["Items"]["Listado"]).map((key) => {
                return (
                  <TableRow>
                    <TableCell>
                    </TableCell>
                    <TableCell>{tender["Fechas"][key]}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Personal data
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

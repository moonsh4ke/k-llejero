import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chip,
  Container,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Box,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

import React from "react";

export default function LicitacionesView() {
  const [tender, setTender] = useState();
  const [waiting, setWaiting] = useState(true);

  let { code } = useParams();

  useEffect(() => {
    const fetchTender = async () => {
      const res = await axios.get(
        `https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?codigo=${code}&ticket=F8537A18-6766-4DEF-9E59-426B4FEE2844`
      );
      setTender(res.data.Listado[0]);
      setWaiting(false);
    };
    fetchTender();
  }, []);

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      {waiting && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
      {tender && (
        <Container>
          <Typography variant="h5">{tender["Nombre"]}</Typography>
          <Typography variant="body1">{tender["CodigoExterno"]}</Typography>
          <Typography variant="body1">{tender["Descripcion"]}</Typography>
          <Chip label={tender["Estado"]} color="success" />
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
                Comprador
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {Object.keys(tender["Comprador"]).map((key) => {
                return (
                  <Typography variant="body1">
                    {tender["Comprador"][key] &&
                      `${key}: ${tender["Comprador"][key]}`}
                  </Typography>
                );
              })}
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
                Users
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                You are currently not an owner
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Donec placerat, lectus sed mattis semper, neque lectus feugiat
                lectus, varius pulvinar diam eros in elit. Pellentesque
                convallis laoreet laoreet.
              </Typography>
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
                Advanced settings
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Filtering has been entirely disabled for whole web server
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
                Integer sit amet egestas eros, vitae egestas augue. Duis vel est
                augue.
              </Typography>
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
                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
                Integer sit amet egestas eros, vitae egestas augue. Duis vel est
                augue.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Container>
      )}
    </>
  );
}

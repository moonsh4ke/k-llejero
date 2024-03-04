import React from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

import { ExpandMore } from "@mui/icons-material";

export default function Items({ items }) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <>
      <Typography sx={{ width: "33%", flexShrink: 0 }}>VER ITEMS</Typography>
        {items.map((item) => {
          return (
            <Card sx={{ width: "800px", m: 1}}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">{item["NombreProducto"]}</Typography>
                <Typography variant="body1" color="text.sencondary">{item["Descripcion"].toLowerCase()}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Ver detalle</Button>
              </CardActions>
            </Card>
          );
        })}
    </>
  );
}

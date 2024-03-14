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
  Stack,
} from "@mui/material";

import { ExpandMore } from "@mui/icons-material";

export default function Items({ items }) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
      <Stack spacing={2}>
          {items.map((item) => {
            return (
              <Card sx={{ width: "500px"}}>
                <CardContent>
                  <Typography gutterBottom variant="body1" component="div"><b>{item["NombreProducto"]}</b></Typography>
                  <Typography variant="body2" color="text.sencondary">{item["Descripcion"].toLowerCase()}</Typography>
                </CardContent>
                {/* <CardActions> */}
                {/*   <Button size="small">Ver detalle</Button> */}
                {/* </CardActions> */}
              </Card>
            );
          })}
      </Stack>
  );
}

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chip,
  Container,
  Typography,
  CircularProgress,
  Box,
  Paper,
} from "@mui/material";

import Seller from "./Seller";
import Items from "./Items";
import tenderExample from "./utils/tenderExample"

const tender = tenderExample["Listado"][0];

export default function LicitacionesView() {
  // const [tender, setTender] = useState();
  const [waiting, setWaiting] = useState(true);
  console.log(tender);

  let { code } = useParams();

  // useEffect(() => {
  //   const fetchTender = async () => {
  //     const res = await axios.get(
  //       `https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?codigo=${code}&ticket=F8537A18-6766-4DEF-9E59-426B4FEE2844`
  //     );
  //     setTender(res.data.Listado[0]);
  //     setWaiting(false);
  //   };
  //   fetchTender();
  // }, []);


  return (
    <>
      {waiting && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
      {tender && (
        <Container>
          <Paper
            elevation={3}
            sx={{
              p: 6,
              "& > *": {
                mb: 3,
              },
            }}
          >
            <Typography variant="h5">{tender["Nombre"]}</Typography>
            <Typography variant="body1">{tender["CodigoExterno"]}</Typography>
            <Typography variant="body1">{tender["Descripcion"]}</Typography>
            <Chip label={tender["Estado"]} color="success" />
            <Seller tender={tender}/>
            <Items items={tender["Items"]["Listado"]}/>
            <Typography variant="body1">Tipo: {tender["Tipo"]}</Typography>
          </Paper>
        </Container>
      )}
    </>
  );
}

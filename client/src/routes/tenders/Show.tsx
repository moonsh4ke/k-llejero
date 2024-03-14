import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import LinkIcon from "@mui/icons-material/Link";

import {
  Chip,
  Container,
  Typography,
  CircularProgress,
  Box,
  Paper,
  Snackbar,
  Tab,
  Stack,
  Link,
} from "@mui/material";

import Seller from "./components/Seller";
import Items from "./components/Items";
import tenderExample from "./utils/tenderExample";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import TenderDates from "./components/TenderDates";

const tender = tenderExample["Listado"][0];

export default function Show() {
  // const [tender, setTender] = useState();
  const [waiting, setWaiting] = useState(true);

  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  let { code } = useParams();

  // TODO: dont use this effect, instead use the useRequest hook
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
      {tender && (
        <>
          <Container>
            <Stack spacing={2}>
              <Typography variant="h6">{tender["Nombre"]}</Typography>
              <Stack
                direction="row"
                spacing={2}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Typography variant="body1">
                  {tender["CodigoExterno"]}
                </Typography>
                <Chip label={tender["Estado"]} color="success" />
              </Stack>
              <Typography variant="body1">{tender["Descripcion"]}</Typography>
              <Link
                sx={{ display: "flex", alignItems: "center" }}
                underline="none"
                target="_blank"
                href={`http://www.mercadopublico.cl/Procurement/Modules/RFB/DetailsAcquisition.aspx?idlicitacion=${tender["CodigoExterno"]}`}
              >
                <LinkIcon sx={{ mr: 1 }} />
                Ver en MercadoPublico
              </Link>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Comprador" value="1" />
                    <Tab label="Items" value="2" />
                    <Tab label="Fechas" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Seller tender={tender} />
                </TabPanel>
                <TabPanel value="2">
                  <Items items={tender["Items"]["Listado"]} />
                </TabPanel>
                <TabPanel value="3">
                  <TenderDates tender={tender} />
                </TabPanel>
              </TabContext>
            </Stack>

            {/* <Typography variant="h5">{tender["Nombre"]}</Typography> */}
            {/* <Typography variant="body1">{tender["CodigoExterno"]}</Typography> */}
            {/* <Typography variant="body1">{tender["Descripcion"]}</Typography> */}
            {/* <Chip label={tender["Estado"]} color="success" /> */}
            {/* <Seller tender={tender}/> */}
            {/* <Items items={tender["Items"]["Listado"]}/> */}
            {/* <Typography variant="body1">Tipo: {tender["Tipo"]}</Typography> */}
          </Container>
        </>
      )}
    </>
  );
}

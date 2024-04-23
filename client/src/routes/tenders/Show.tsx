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
  List,
  ListItem,
  Button,
} from "@mui/material";

import Seller from "./components/Seller";
import Items from "./components/Items";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import TenderDates from "./components/TenderDates";
import axiosClient from "../../utils/axiosClient";
import { Tender } from "./utils/types";
import { tenderStates } from "../../utils/tenderStates";
import { Category } from "@mui/icons-material";

const formatDate = (strDate: string) => {
  const parsedDate = new Date(strDate);
  const formattedDate = `${parsedDate.getDate().toString().padStart(2, '0')}/${(parsedDate.getMonth() + 1).toString().padStart(2, '0')}/${parsedDate.getFullYear()} ${parsedDate.getHours().toString().padStart(2, '0')}:${parsedDate.getMinutes().toString().padStart(2, '0')}:${parsedDate.getSeconds().toString().padStart(2, '0')}`;
  return formattedDate
}

export default function Show() {
  const [tender, setTender] = useState<Tender>();
  const [filterDetail, setFilterDetail] = useState<boolean>();

  const [waiting, setWaiting] = useState(true);

  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  let { code } = useParams();

  useEffect(() => {
    const fetchTender = async () => {
      const res = await axiosClient.get(`api/tender/${code}`)
      setTender(res.data);
    };
    fetchTender();
  }, []);

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  return (
    <>
      {tender && (
        <>
          <Container maxWidth="md">
            <Paper sx={{padding: 3}}>
              <Stack spacing={2}>
                <Typography variant="h6">{tender.name}</Typography>
                  <Typography variant="subtitle1">
                    Código {tender.code}
                  </Typography>
                  <Typography variant="subtitle1">
                    Publicada el {tender.publicationDate}
                  </Typography>
                  <Typography variant="body1">
                    Filtrada el {formatDate(tender.filter.date)}
                  </Typography>
                <Typography variant="subtitle1">
                  Estado {tenderStates[tender.stateCode]}
                </Typography>
                {tender.categories &&
                  <div>
                    <Typography sx={{mb: 1}} variant="body1">
                      Categorias
                    </Typography>
                    <Stack direction="row" spacing={1} useFlexGap sx={{display: "flex", flexWrap: "wrap", ml: 2}}>
                      {tender.categories.map(cat => <Chip label={cat} />)}
                    </Stack>
                  </div>
                }
                <Typography textAlign="justify" variant="body1">{tender.description}</Typography>
                <Link
                  sx={{ display: "flex", alignItems: "center" }}
                  underline="none"
                  target="_blank"
                  href={`http://www.mercadopublico.cl/Procurement/Modules/RFB/DetailsAcquisition.aspx?idlicitacion=${tender.code}`}
                >
                  <LinkIcon sx={{ mr: 1 }} />
                  Ver en MercadoPublico
                </Link>

                <div>
                <Button onClick={e => setFilterDetail(!filterDetail)}variant="text">Ver detalle de filtro</Button>
                </div>
                {filterDetail &&
                  <List>
                    {tender.filter.matchs.map(match => <ListItem>{match.keyword} coincide con {match.on}</ListItem>)}
                  </List>
                }
              </Stack>
            </Paper>
          </Container>
        </>
      )}
    </>
  );
}

import { Fragment, useEffect, useState } from "react"
import { ITracking } from "../licitaciones/utils/trackingType";
import {
    Chip,
    Container,
    Typography,
    CircularProgress,
    Box,
    Paper,
  } from "@mui/material";
import axios from "axios";

export default function TrackingsView() {
    const [trackings, setTrackings] = useState<Array<ITracking>>();
    const [isLoading, setIsLoading] = useState(true);
    const [existsError, setExistsError] = useState(false);
    
    useEffect(() => {
        // TODO: CATCH 404
        const fetchTrackings = async() => {
            try {
                const endpoint = '/api/tracking/api/trackings';
                const res = await axios.get(endpoint);
    
                setTrackings(res.data.data);
                setIsLoading(false);
    
            } catch (error) {
                console.error(`Error fetchTrackings => ${error}`)
                setExistsError(true);
                setIsLoading(false);
            }
        }
        fetchTrackings();
    }, []);

    return (
        <>
            {isLoading 
                ?
                    <Box sx={{ display: "flex" }}>
                        <CircularProgress />
                    </Box>
                :
                    <Fragment>
                        {existsError 
                            ?
                                <Typography variant="h4">Usuario no tiene seguimientos creados</Typography>
                            :
                                <>
                                    <Typography variant="h3">Seguimientos</Typography>
                                    {trackings?.map(tracking => {
                                        return (
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
                                                    <Typography variant="h5">{tracking.tenderId}</Typography>
                                                    <Typography variant="body1">Estado: Abierta</Typography>
                                                    <Typography variant="body1">Fecha de creación: {tracking.createdDate.toString()}</Typography>
                                                    <Typography variant="body1">Fecha de actualización: {tracking.updatedDate?.toString() ?? 'Sin actualizaciones'}</Typography>
                                                </Paper>
                                            </Container>
                                        )
                                    })}
                                </>
                        } 

                    </Fragment>
            }
        </>
    )
}

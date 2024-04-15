import { Fragment, useContext, useEffect, useState } from "react"
import {
    Chip,
    Container,
    Typography,
    CircularProgress,
    Box,
    Paper,
  } from "@mui/material";
import axios from "axios";
import axiosClient from "../../utils/axiosClient";
import { AuthContext } from "../../contexts/AuthContext";
import { Tracking } from "./types/tracking.type";
import { Button } from '@mui/material';

export default function TrackingsView() {
    const { currentUser, logout } = useContext(AuthContext)!;
    const [trackings, setTrackings] = useState<Tracking[]>();
    const [isLoading, setIsLoading] = useState(true);
    const [existsError, setExistsError] = useState(false);
    
    useEffect(() => {
        // TODO: CATCH 404
        const fetchTrackings = async() => {
            try {
                const endpoint = '/api/tracking/api/trackings';
                const queryParams = {
                    UserId: currentUser?.email,
                    Page: 1,
                    RecordsPerPage: 5
                }

                const res = await axiosClient.get(endpoint, {
                    params: queryParams
                });

                if (res.status === 200) {
                    console.log(res.data.data);
                    setTrackings(res.data.data);
                }
    
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
                                                    <Typography variant="body1">Estado: {tracking.tenderStatus}</Typography>
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

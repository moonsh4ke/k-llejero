import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axiosClient from "../../utils/axiosClient";
import { TrackingWithNotes } from "./types/trackingWithNotes.type";
import { Box, Button, CircularProgress, Divider, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import NoteList from './NoteList';

export default function Tracking() {
    const { id } = useParams();
    const [tracking, setTracking] = useState<TrackingWithNotes>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTracking = async() => {
            try {
                const endpoint = `/api/tracking/api/trackings/${id}`;

                const res = await axiosClient.get(endpoint);

                if (res.status === 200) {
                    console.log(res.data.data);
                    setTracking(res.data.data[0]);
                }
    
                setIsLoading(false);
    
            } catch (error) {
                console.error(`Error fetchTrackings => ${error}`)
                //setExistsError(true);
                setIsLoading(false);
            }
        }
        fetchTracking();
    }, []);

    return (
        <>
            {isLoading ? 
                <CircularProgress />
                :
                <div>
                    {tracking &&
                        <>
                            <Typography variant="h6">Seguimiento activo para licitación {tracking.tenderId}</Typography>
                            <Typography variant="body2">Estado seguimiento: {tracking.trackingStatus}</Typography>
                            <Typography variant="body2">Fecha de creación: {tracking.createdDate?.toString()}</Typography>
                            <Typography variant="body2">Fecha de actualización: {tracking.updatedDate ? tracking.updatedDate.toString() : 'sin actualizaciones'}</Typography>
                            <Typography variant="h6">Notas</Typography>
                            <Box sx={{ display: "flex" }}>
                                <Button variant="contained" type="submit">
                                    Adjuntar cotización
                                </Button>
                                <h1>

                                </h1>
                                <Button variant="contained" type="submit">
                                    Descargar cotización
                                </Button>
                            </Box>
                            
                            {/*tracking.notes ?
                                <Typography variant="body1">No hay notas</Typography>
                                :
                                <NoteList/>
                            */}
                            <NoteList/>
                        </>
                    }
                </div>
            }
        </>
    )
}
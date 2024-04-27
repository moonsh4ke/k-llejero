import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axiosClient from "../../utils/axiosClient";
import { TrackingWithNotes } from "./types/trackingWithNotes.type";
import { Box, Button, CircularProgress, Divider, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import NoteList from './NoteList';
import FileForm from "./components/FileForm";
import { TrackingData } from "./types/tracking.type";

export default function Tracking() {
    const { id } = useParams();
    const [tracking, setTracking] = useState<TrackingData>();
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
                            <Typography variant="h6">Seguimiento para licitación {tracking.tenderId}</Typography>
                            <Typography variant="body2">Estado licitación: {tracking.tenderStatus && tracking.tenderStatus.length ? tracking.tenderStatus : "Publicada"}</Typography>
                            <Typography variant="body2">Fecha de creación: {tracking.createdDate?.toString()}</Typography>
                            <Typography variant="body2">Fecha de actualización: {tracking.updatedDate ? tracking.updatedDate.toString() : 'sin actualizaciones'}</Typography>
                            <FileForm tracking={tracking}/>
                            <NoteList trackingId={tracking.id}/>
                        </>
                    }
                </div>
            }
        </>
    )
}
import { Box, Button, CircularProgress, Container, Stack, TextField, Typography } from '@mui/material';
import { NoteFormProps } from '../types/notes.props.type';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../../utils/axiosClient';
import { Note } from '../types/trackingWithNotes.type';
import { Cancel, Save } from '@mui/icons-material';

// codigo horrible

export default function NoteForm() {
    const navigate = useNavigate();
    const { id, noteId } = useParams();
    const [isCreate, setIsCreate] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [description, setDescription] = useState('');
    const [note, setNote] = useState<Note>();

    const onDescriptionChange = (e: any) => {
        setDescription(e.target.value);
    }

    const fetchNote = async () => {
        try {
            const endpoint = `/api/tracking/api/notes/${id}/${noteId}`;

            const res = await axiosClient.get(endpoint);

            if (res.status === 200) {
                console.log(res.data.data);
                setNote(res.data.data);
                setDescription(res.data.data.description);
            }

            setIsLoading(false);

        } catch (error) {
            console.error(`Error fetchNote => ${error}`)
            //setExistsError(true);
            setIsLoading(false);
        }
    }

    const createNote = async () => {
        try {
            setIsLoading(true);
            const endpoint = `/api/tracking/api/notes`;
            const notes = {
                TrackingId: id,
                Notes: [`${description}`]
            }
            const resp = await axiosClient.post(endpoint, notes);

            if (resp.status === 200) {
                navigate(`/trackings/${id}`);
            }

        } catch (error) {
            console.error(`Error createNote => ${error}`)
            //setExistsError(true);
        }
        setIsLoading(false);
    }   

    const updateNote = async () => {
        try {
            setIsLoading(true);
            const endpoint = `/api/tracking/api/notes`;
            const resp = await axiosClient.put(endpoint, null, {
                headers: {
                    trackingId: id,
                    noteId: note?.id,
                    newNote: description
                }
            });

            if (resp.status === 200) {
                navigate(`/trackings/${id}`);
            }

        } catch (error) {
            console.error(`Error updateNote => ${error}`)
            //setExistsError(true);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        if (id && noteId) {
            setIsCreate(false);
            fetchNote();
        } else {
            setIsLoading(false);
        }
    }, []);

    return (
        <>
            <Box sx={{
                width: '500px'
            }}>
                {isLoading 
                    ? 
                        <CircularProgress />
                    :
                        <>
                            <Typography variant="h6" gutterBottom>
                                {isCreate ? 'Crear nota' : 'Editar nota' }
                            </Typography>
                            <TextField
                                sx={{
                                    paddingBottom: '10px'
                                }}
                                fullWidth
                                label="Descripción" 
                                variant="outlined"
                                value={description}
                                onChange={(e) => onDescriptionChange(e)}
                            />
                            <Stack direction="row" spacing={1}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    size="small"
                                    type="submit"
                                    startIcon={<Save />}
                                    onClick={() => isCreate ? createNote() : updateNote()}
                                >
                                    Guardar
                                </Button>
                                <Button variant="text" size="small" startIcon={<Cancel />} fullWidth>
                                    <Link
                                        to={id ? `/trackings/${id}` : "/trackings"}
                                        style={{ textDecoration: "none", color: "inherit" }}
                                    >
                                        Cancelar
                                    </Link>
                                </Button>
                            </Stack>
                        </>
                }
            </Box>
        </>
    )
}
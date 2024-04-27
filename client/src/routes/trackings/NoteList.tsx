import { Cancel, Clear, Edit, Save } from '@mui/icons-material';
import { Box, Button, CircularProgress, Container, Link, Stack, Typography } from '@mui/material';
import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridRowParams,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExport
} from "@mui/x-data-grid";
import { Fragment, useContext, useEffect, useState } from 'react';
import CustomTextField from '../../shared/components/inputs/CustomTextField';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@sn1006/schemas";
import { zodI18nMap } from "zod-i18n-map";
import { useErrorBoundary } from 'react-error-boundary';
import { AuthContext } from '../../contexts/AuthContext';
import { NotesListProps } from './types/notes.props.type';
import axiosClient from '../../utils/axiosClient';
import { Note, Notes } from './types/trackingWithNotes.type';
import NoteForm from './components/NoteForm';
import { useNavigate } from 'react-router-dom';

function CustomToolbar() {
    return(
      <GridToolbarContainer>
        <GridToolbarExport />
        <GridToolbarColumnsButton />
      </GridToolbarContainer>
    );
}

export default function NoteList({ ...props }: NotesListProps) {
    const navigate = useNavigate();
    const [notes, setNotes] = useState<Notes>();
    const [note, setNote] = useState<Note>();
    const [isLoading, setIsLoading] = useState(true);
    const { currentUser, logout } = useContext(AuthContext)!;
    const [showForm, setShowForm] = useState(false);
    const [existsError, setExistsError] = useState(false);
    const [paginationModel, setPaginationModel] = useState({
      page: 0,
      pageSize: 5
    });

    const columns: GridColDef[] = [
      {
          field: "description",
          headerName: "Descripción",
          width: 200,
      },
      {
          field: "createdDate",
          headerName: "Fecha de creación",
          width: 200,
      },
      {
          field: "updatedDate",
          headerName: "Fecha de actualización",
          width: 200,
      },
      {
          field: "actions",
          headerName: "Acciones",
          type: "actions",
          width: 200,
          getActions: (params: GridRowParams) => [
            <GridActionsCellItem
              onClick={() => { navigate(`/trackings/${params.row.trackingId}/editNote/${params.row.id}`) }}
              icon={<Edit color="primary" />}
              label="Visualizar"
            />,
            <GridActionsCellItem
            onClick={async () => { await onDeleteNote(params.row.trackingId, params.row.id) }}
              icon={<Clear color="primary" />}
              label="Cerrar licitación"
            />
          ],
        },
  ];

    const onPageModelChange = (newPaginationModel: any) => {
      setPaginationModel({
          page: newPaginationModel.page,
          pageSize: 5
      });
    }

    const fetchNotes = async () => {
      try {
        const endpoint = '/api/tracking/api/notes';
        const queryParams = {
            TrackingId: props.trackingId,
            Page: paginationModel.page + 1,
            RecordsPerPage: 5
        }

        const res = await axiosClient.get(endpoint, {
            params: queryParams
        });

        if (res.status === 200) {
            console.log(res.data.data);
            setNotes(res.data.data);
        }

      } catch (error) {
          // todo: catch 404
          //setExistsError(true);
          console.error('Failed to fetch data:', error);
      }
      setIsLoading(false);
    }

    useEffect(() => {
      fetchNotes();
    }, [paginationModel]);

    const {
      control,
      handleSubmit,
      formState: { errors: formErrors },
    } = useForm({
      resolver: zodResolver(userSchema, { errorMap: zodI18nMap }),
    });
    const { showBoundary } = useErrorBoundary();

    const onDeleteNote = async (trackingId: string, noteId: string) => {
      try {
        setIsLoading(true);
        const endpoint = `/api/tracking/api/notes`;
        const resp = await axiosClient.delete(endpoint, {
            headers: {
                trackingId: trackingId,
                noteId: noteId,
            }
        });

        if (resp.status === 200) {
          await fetchNotes();
        }

      } catch (error) {
          console.error(`Error onDeleteNote => ${error}`)
          //setExistsError(true);
      }
      setIsLoading(false);
    }

    return (
      <>
        {isLoading 
            ?
              <CircularProgress />
            :
              <>
                <div>
                  {notes && notes.outputNotes ? 
                    <Fragment>
                      <Typography variant="h6" sx={{padding:'20px 20px 20px 0px'}}>Notas</Typography>
                        <DataGrid
                          getRowHeight={() => "auto"}
                          getRowId={(row: Note) => row.id}
                          loading={isLoading}
                          pagination
                          rows={notes.outputNotes}
                          rowCount={notes.totalNotes}
                          paginationModel={paginationModel}
                          pageSizeOptions={[5]}
                          columns={columns}
                          sx={{
                          "& .MuiDataGrid-cell": {
                              py: 1,
                          },
                          }}
                          slots={{
                              toolbar: CustomToolbar
                          }}
                          onPaginationModelChange={(newPaginationModel: any) => onPageModelChange(newPaginationModel) }
                          paginationMode="server"
                      />
                    </Fragment>
                    : 
                      <Typography variant="h6">No hay notas creadas</Typography>
                  }  
                </div>
                <Box sx={{padding:'20px 20px 20px 0px'}}>
                  <Button variant="contained" type="submit" onClick={() => navigate(`/trackings/${props.trackingId}/newNote`)}>
                    Crear nota
                  </Button>
                </Box>
              </>
        }
      </> 
    )
}
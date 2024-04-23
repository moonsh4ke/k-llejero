import { Cancel, Clear, Edit, Save } from '@mui/icons-material';
import { Button, Container, Link, Stack, Typography } from '@mui/material';
import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridRowParams,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExport
} from "@mui/x-data-grid";
import { useState } from 'react';
import CustomTextField from '../../shared/components/inputs/CustomTextField';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@sn1006/schemas";
import { zodI18nMap } from "zod-i18n-map";
import { useErrorBoundary } from 'react-error-boundary';

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
            onClick={() => { console.log(params.row.id) }}
            icon={<Edit color="primary" />}
            label="Visualizar"
          />,
          <GridActionsCellItem
            // onClick={}
            icon={<Clear color="primary" />}
            label="Cerrar licitación"
          />
        ],
      },
];

function CustomToolbar() {
    return(
      <GridToolbarContainer>
        <GridToolbarExport />
        <GridToolbarColumnsButton />
      </GridToolbarContainer>
    );
}

export default function NoteList() {
    const [showEdit, setShowEdit] = useState(false);
    const notes = [
        {
            id: '1',
            description: 'Nota de prueba 1',
            createdDate: '15-03-2024 12:15',
            updatedDate: 'sin actualizaciones'
        },
        {
            id: '2',
            description: 'Nota de prueba 2',
            createdDate: '14-03-2024 17:18',
            updatedDate: 'sin actualizaciones'
        },
        {
            id: '3',
            description: 'Nota de prueba 3',
            createdDate: '12-03-2024 10:25',
            updatedDate: 'sin actualizaciones'
        },
    ];

    const {
      control,
      handleSubmit,
      formState: { errors: formErrors },
    } = useForm({
      resolver: zodResolver(userSchema, { errorMap: zodI18nMap }),
    });
    const { showBoundary } = useErrorBoundary();

    const changeNote = () => {
      setShowEdit(!showEdit);
    }

    return (
        <>  
            {!showEdit &&
            <>
              <div>
              <DataGrid
                  getRowHeight={() => "auto"}
                  getRowId={(row) => row.id}
                  rows={notes}
                  columns={columns}
                  sx={{
                    "& .MuiDataGrid-cell": {
                      py: 1,
                    },
                  }}
                  slots={{
                      toolbar: CustomToolbar
                  }}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
              />  
          </div>  
          <Button variant="contained" type="submit" onClick={changeNote}>
             Crear nota
          </Button>
          </>
            }
            {showEdit &&
                  <Container>
                  <Typography variant="h6" gutterBottom>
                    Editar nota
                  </Typography>
                  <form
                  >
                    <Stack
                      spacing={3}
                      sx={{
                        width: { sm: "100%", md: "75%", lg: "50%" },
                      }}
                    >
                      <CustomTextField
                        control={control}
                        errors={formErrors}
                        name="name"
                        label="Descripción *"
                        defaultValue="Nota de prueba 1"
                        fullWidth
                      />
                    </Stack>
                  </form>
                  <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                size="small"
                type="submit"
                startIcon={<Save />}
              >
                Guardar
              </Button>
              <Button variant="text" size="small" startIcon={<Cancel />}>
                <Link
                  to={`/users/asdasd`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Cancelar
                </Link>
              </Button>
            </Stack>
                </Container>
            }
        </>
    )
}
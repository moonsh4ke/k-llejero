import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridRowParams,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExport
} from "@mui/x-data-grid";
import { Tracking, TrackingData } from "./types/tracking.type";
import { Clear, RestartAlt, Visibility } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axiosClient from "../../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Alert, Snackbar } from '@mui/material';
import { SnackbarData } from "../../utils/types/types";

function CustomToolbar() {
    return(
      <GridToolbarContainer>
        <GridToolbarExport />
        <GridToolbarColumnsButton />
      </GridToolbarContainer>
    );
}

export default function List() {
    const navigate = useNavigate();
    const { currentUser, logout } = useContext(AuthContext)!;
    const [trackings, setTrackings] = useState<Tracking>();
    const [initLoading, setInitLoading] = useState(true); 
    const [isLoading, setIsLoading] = useState(true);
    const [existsError, setExistsError] = useState(false);
    const [page, setPage] = useState(0);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5
    });
    const [snackbarData, setSnackbarData] = useState<SnackbarData>({
        show: false,
        severity: "",
        message: "",
    });

    const onPageModelChange = (newPaginationModel: any) => {
        setPaginationModel({
            page: newPaginationModel.page,
            pageSize: 5
        });
    }

    const columns: GridColDef[] = [
        {
            field: "tenderId",
            headerName: "Licitación",
            width: 200,
        },
        {
            field: "tenderStatus",
            headerName: "Estado licitación",
            width: 200,
        },
        {
            field: "createdDate",
            headerName: "Fecha de creación",
            width: 200,
        },
        {
            field: "actions",
            headerName: "Acciones",
            type: "actions",
            width: 200,
            getActions: (params: GridRowParams) => [
              <GridActionsCellItem
                onClick={() => { navigate(params.row.id) }}
                icon={<Visibility color="primary" />}
                label="Visualizar"
              />,
              <GridActionsCellItem
                onClick={async () => { await deleteTracking(params.row.id) }}
                icon={<Clear color="primary" />}
                label="Cerrar licitación"
              />
            ],
          },
    ];

    const deleteTracking = async (id: string) => {
        try {
            setIsLoading(true);
            const endpoint = `/api/tracking/api/trackings/${id}`;
            const resp = await axiosClient.delete(endpoint);
    
            if (resp.status === 200) {
                await fetchTrackings();
                setSnackbarData({
                    show: true,
                    severity: "success",
                    message: "Seguimiento borrado correctamente",
                });
            }
    
          } catch (error) {
              console.error(`Error onDeleteNote => ${error}`)
              setSnackbarData({
                show: true,
                severity: "error",
                message: "Ha ocurrido un error inesperado",
              });
              //setExistsError(true);
          } finally {
            setIsLoading(false);
          }
    }

    const fetchTrackings = async () => {
        setIsLoading(true);
        try {
            const endpoint = '/api/tracking/api/trackings';
            const queryParams = {
                UserId: currentUser?.email,
                Page: paginationModel.page + 1,
                RecordsPerPage: 5
            }

            const res = await axiosClient.get(endpoint, {
                params: queryParams
            });

            if (res.status === 200) {
                console.log(res.data.data);
                const newOutputTrackings = res.data.data.outputTrackings?.map((tracking: TrackingData) => {
                    if (tracking.tenderStatus === null || tracking.tenderStatus.length === 0) {
                        return {...tracking, tenderStatus: 'Publicada'};
                    }
                    return tracking;
                });
                const trackingData = { ...res.data.data, outputTrackings: newOutputTrackings };
                setTrackings(trackingData);
            }

        } catch (error) {
            // todo: catch 404
            setExistsError(true);
            console.error('Failed to fetch data:', error);
        }
        setIsLoading(false);
        setInitLoading(false);
    };

    useEffect(() => {
        fetchTrackings();
    }, [paginationModel]);

    const handleSnackbarClose = () => {
        setSnackbarData({
          ...snackbarData,
          show: !snackbarData.show,
        });
    };

    return (
        <>  
            <h2>Seguimientos</h2>
            <>
                <Snackbar
                    open={snackbarData.show}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                >
                    <Alert
                        onClose={handleSnackbarClose}
                        severity={snackbarData.severity}
                        variant="filled"
                        sx={{ width: "100%" }}
                    >
                        {snackbarData.message}
                    </Alert>
                </Snackbar>
            </>
            {initLoading ?
                <CircularProgress />
                :
                <div>
                    {trackings && trackings.outputTrackings ? (
                        <div>
                            <DataGrid
                                getRowHeight={() => "auto"}
                                getRowId={(row) => row.id}
                                loading={isLoading}
                                pagination
                                rows={trackings.outputTrackings}
                                rowCount={trackings.totalTrackings}
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
                        </div>   
                        )
                    :   
                        <div>
                            <h1>No hay seguimientos</h1>
                        </div>
                    }
                </div>
            }
        </>
    )
}
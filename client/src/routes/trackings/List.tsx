import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridRowParams,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExport
} from "@mui/x-data-grid";
import { Tracking } from "./types/tracking.type";
import { Clear, Visibility } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axiosClient from "../../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

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
                // onClick={}
                icon={<Clear color="primary" />}
                label="Cerrar licitación"
              />
            ],
          },
    ];

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
                setTrackings(res.data.data);
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

    // https://mui.com/x/react-data-grid/pagination/
    // Server-side pagination

    return (
        <>  
            <h2>Seguimientos activos</h2>
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
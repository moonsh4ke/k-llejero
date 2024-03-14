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
        field: "trackingStatus",
        headerName: "Estado seguimiento",
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
            // TODO: agregar handler de tracking (Nico)
            // onClick={}
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

function CustomToolbar() {
    return(
      <GridToolbarContainer>
        <GridToolbarExport />
        <GridToolbarColumnsButton />
      </GridToolbarContainer>
    );
}

export default function List() {
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

    // https://mui.com/x/react-data-grid/pagination/
    // Server-side pagination

    return (
        <>  
            <h2>Seguimientos activos</h2>
            {trackings ? (
                <div>
                <DataGrid
                    getRowHeight={() => "auto"}
                    getRowId={(row) => row.id}
                    rows={trackings}
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
                        onclick: () => { console.log('CLICK') }
                      },
                    }}
                />  
                </div>   
                )
            :   
                <div>
                    <h1>No hay seguimientos</h1>
                </div>
            }
        </>
    )
}
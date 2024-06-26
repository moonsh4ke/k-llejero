import { Link, useNavigate } from "react-router-dom";

import { Bookmark, FilterAlt, Visibility } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Chip,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import MuiLink from "@mui/material/Link";

import {
  DataGrid,
  GridActionsCell,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import axiosClient from "../../utils/axiosClient";
import { tenderStates } from "../../utils/tenderStates";
import { SnackbarData, TenderState } from "../../utils/types/types";
import { useForm } from "react-hook-form";
import CustomTextField from "../../shared/components/inputs/CustomTextField";
import { AuthContext } from "../../contexts/AuthContext";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
      <GridToolbarColumnsButton />
    </GridToolbarContainer>
  );
}

export default function List() {
  const navigate = useNavigate();
  // const tenders = useLoaderData();
  const [tenders, setTenders] = useState<any[]>([]);
  const { currentUser, logout } = useContext(AuthContext)!;

  const columns: GridColDef[] = [
    {
      field: "code",
      headerName: "Código",
      width: 200,
    },
    { field: "name", headerName: "Nombre", width: 400 },
    {
      field: "stateCode",
      headerName: "Estado",
      type: "string",
      width: 120,
      valueGetter: (params) => tenderStates[params.value as TenderState],
      renderCell: (params) => (
        <Chip size="small" color="primary" label={params.value} />
      ),
    },
    {
      field: "endDate",
      headerName: "Fecha de cierre",
      type: "dateTime",
      width: 140,
      valueGetter: (params) => new Date(params.value),
      valueFormatter: (params) =>
        params.value.toLocaleString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
          hour: "numeric",
          minute: "numeric",
        }),
    },
    {
      field: "actions",
      type: "actions",
      getActions: (params: GridRowParams) => [
        <MuiLink underline="none" variant="button">
          <Link
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
            }}
            to={params.row.id}
          >
            Ver
          </Link>
        </MuiLink>,
        <GridActionsCellItem
          onClick={() => { createTracking(params.row.code, params.row.stateCode) }}
          icon={<Bookmark color="secondary" />}
          label="Seguir"
        />,
      ],
    },
  ];
  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();

  useEffect(() => {
    const getTenders = async () => {
      const tenderRes = await axiosClient.get("/api/tender");
      console.log(tenderRes.data);
      setTenders(tenderRes.data);
    };
    getTenders();
  }, []);

  const [snackbarData, setSnackbarData] = useState<SnackbarData>({
    show: false,
    severity: "",
    message: "",
  });

  const createTracking = async (tenderId: string, tenderState: number) => {
    try {
      const endpoint = `/api/tracking/api/trackings/${tenderId}`;
      const resp = await axiosClient.post(endpoint, null, {
        headers: {
          'userId': currentUser?.email,
          'tenderState': `${tenderState}`
        }
      });

      setSnackbarData({
        show: true,
        severity: "success",
        message: resp.data.message,
      });
    } catch (error) {
      setSnackbarData({
        show: true,
        severity: "error",
        message: "Error al crear el seguimiento",
      });
      console.error(`createTracking error => ${error}`);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarData({
      ...snackbarData,
      show: !snackbarData.show,
    });
  };

  return (
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
      <Stack direction="row" spacing={2} sx={{ display: "flex" }}>
        <form
          onSubmit={handleSubmit(async (filterData) => {
            const res = await axiosClient.get(
              `/api/tender?filter=${JSON.stringify(filterData)}`
            );
            setTenders(res.data);
          })}
        >
          <Stack sx={{ width: "280" }} spacing={3}>
            <Stack
              sx={{ display: "flex", alignItems: "center" }}
              direction="row"
            >
              <FilterAlt color="primary" />
              <Typography variant="h6">Filtros</Typography>
            </Stack>
            <CustomTextField
              control={control}
              errors={formErrors}
              name="code"
              label="Código"
              fullWidth
            />
            <CustomTextField
              control={control}
              errors={formErrors}
              name="name"
              label="Nombre"
              fullWidth
            />
            <Button variant="contained" type="submit">
              Aplicar
            </Button>
          </Stack>
        </form>
        {tenders && (
          <Box
            sx={{
              flexGrow: 1,
            }}
          >
            <DataGrid
              getRowHeight={() => "auto"}
              rows={tenders}
              onRowClick={(params) => navigate(params.row.code)}
              columns={columns}
              sx={{
                "& .MuiDataGrid-cell": {
                  py: 1,
                },
              }}
              slots={{
                toolbar: CustomToolbar,
              }}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 25 },
                },
              }}
            />
          </Box>
        )}
      </Stack>
    </>
  );
}

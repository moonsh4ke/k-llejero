import { useEffect, useState } from "react";
import axiosClient from "../../utils/axiosClient";
import { User } from "./utils/types";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

const columns: GridColDef[] = [
  {
    field: "rut",
    headerName: "RUT",
    width: 200,
  },
  {
    field: "email",
    headerName: "Correo",
    width: 200,
  },
  {
    field: "name",
    headerName: "Nombre",
    width: 200
  },
  {
    field: "lastname",
    headerName: "Apellido",
    width: 200
  },
  {
    field: "phone",
    headerName: "Telefono",
    width: 200
  },
  {
    field: "actions",
    type: "actions",
    getActions: (params: GridRowParams) => [
      <Link to={`${params.id}/edit`}>Editar</Link>,
      <Link to={`${params.id}`}>Ver</Link>,
    ]
  }
];

export default function List() {
  const [ users, setUsers ] = useState<User[]>();
  useEffect(() => {
    const fetchUsers = async () => {
      const usersRes = await axiosClient.get("/api/user")
      setUsers(usersRes.data);
    }
    fetchUsers();
  },[])

  return (
    <>
      <Link to="new">Crear</Link>
      {users &&
          <DataGrid
            getRowHeight={() => "auto"}
            rows={users}
            columns={columns}
            sx={{
              "& .MuiDataGrid-cell": {
                py: 1,
              },
            }}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 25 },
              },
            }}
          />
      }
    </>
  );
}

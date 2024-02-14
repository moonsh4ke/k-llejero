import { Link, useLoaderData } from "react-router-dom";
import CardFilter from "./components/FilterCard";
import { Filter as FilterType } from "./utils/types";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Button } from "@mui/material";
import { Add } from "@mui/icons-material";

export default function () {
  const filters = useLoaderData() as FilterType[];
  return (
    <Box>
      <Button startIcon={<Add />} size="small" sx={{ mb: 2 }} variant="text">
        <Link to="new" style={{textDecoration: "none", color: "inherit"}}>
          Crear filtro
        </Link>
      </Button>
      <Grid2 container spacing={1.5}>
        {filters.map((fil: FilterType) => (
          <Grid2 sm={3}>
            <Link style={{textDecoration: "none"}} to={fil.id}>
              <CardFilter filter={fil} />
            </Link>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}

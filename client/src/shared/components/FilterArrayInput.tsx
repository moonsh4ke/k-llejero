import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Filter } from "../../routes/filters/utils/types";
import useGetManyResource from "../hooks/requests/useGetManyResource";
import { useState } from "react";

export default function FilterArrayInput() {
  const { data: filters } = useGetManyResource<Filter>("filter");
  const [filterName, setFilterName] = useState<string>();
  return (
    filters && (
      <FormControl sx={{width: 300}} size="small">
        <InputLabel id="filter-select-small-label">Filtro</InputLabel>
        <Select
          labelId="filter-select-small-label"
          id="filter-select-small"
          value={filterName}
          label="Filtro"
          onChange={(e) => setFilterName(e.target.value as string)}
        >
          {filters.map((fil) => (
            <MenuItem value={fil.id}>{fil.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  );
}

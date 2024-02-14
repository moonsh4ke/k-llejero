import { useLoaderData, useNavigate } from "react-router-dom";
import axiosClient from "../../utils/axiosClient";
import FilterForm from "./components/FilterForm";
import { Filter } from "./utils/types";
import useNotify from "../../shared/hooks/useNotify";

export default function Edit() {
  const filter = useLoaderData() as Filter;
  const notify = useNotify();

  const handleSubmit = async (data: any) => {
    try {
      const filterRes = await axiosClient.put(`https://kllejero.dev/api/filter/${filter.id}`, data);
      notify("Filtro editado satisfactoriamente", "success");
      return filterRes;

    } catch(err) {
      throw(err);
    }
  }

  return(
    <FilterForm filter={filter} submit={handleSubmit}/>
  );
}

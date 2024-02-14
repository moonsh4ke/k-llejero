import useNotify from "../../shared/hooks/useNotify";
import axiosClient from "../../utils/axiosClient";
import FilterForm from "./components/FilterForm";

export default function New() {
  const notify = useNotify();

  const handleSubmit = async (data: any) => {
    try {
      const filterRes = await axiosClient.post("https://kllejero.dev/api/filter", data);
      notify("Filtro creado satisfactoriamente", "success");
      return filterRes;
    } catch(err) {
      throw(err);
    }
  }

  return (
    <FilterForm submit={handleSubmit} />
  );
}

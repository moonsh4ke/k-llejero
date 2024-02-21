import { AxiosResponse } from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import useRequest from "../../shared/hooks/requests/useRequest";
import useNotify from "../../shared/hooks/useNotify";
import FilterForm from "./components/FilterForm";
import { Filter } from "./utils/types";
import { useEffect } from "react";

export default function Edit() {
  const filter = useLoaderData() as Filter;
  const notify = useNotify();
  const navigate = useNavigate();

  const { doRequest, loading, response, errors } = useRequest(
    "put",
    `https://kllejero.dev/api/filter/${filter.id}`,
  )

  useEffect(() => {
    if (response?.status == 200) {
      const newFilter = response.data;
      navigate(`/filters/${newFilter.id}`)
      notify("Filtro editado satisfactoriamente", "success");
    }
  }, [response]);

  return(
    <FilterForm
      filter={filter}
      submitCallback={doRequest}
      loading={loading}
      errors={errors}
      response={response}
    />
  );
}

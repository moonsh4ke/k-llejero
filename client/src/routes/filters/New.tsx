import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import useRequest from "../../shared/hooks/requests/useRequest";
import useNotify from "../../shared/hooks/useNotify";
import FilterForm from "./components/FilterForm";
import { useEffect } from "react";

export default function New() {
  const notify = useNotify();
  const navigate = useNavigate();

  const { doRequest, loading, response, errors } = useRequest(
    "post",
    "/api/filter",
  )

  useEffect(() => {
    if (response?.status == 200) {
      const newFilter = response.data;
      navigate(`/filters/${newFilter.id}`)
      notify("Filtro creado satisfactoriamente", "success");
    }
  }, [response]);

  return (
    <FilterForm
      submitCallback={doRequest}
      loading={loading}
      errors={errors}
      response={response}
    />
  );
}

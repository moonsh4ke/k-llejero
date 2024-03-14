import { useNavigate } from "react-router-dom";
import useNotify from "../../shared/hooks/useNotify";
import UserForm from "./components/UserForm";
import useRequest from "../../shared/hooks/requests/useRequest";
import { useEffect } from "react";

export default function New() {
  const notify = useNotify();
  const navigate = useNavigate();

  const { doRequest, loading, response, errors } = useRequest(
    "post",
    "/api/user",
  )

  useEffect(() => {
    if (response?.status == 200) {
      const newUser = response.data;
      navigate(`/users/${newUser.id}`)
      notify("Usuario creado satisfactoriamente", "success");
    }
  }, [response]);

  return(
    <UserForm
      submitCallback={doRequest}
      loading={loading}
      errors={errors}
      response={response}
    />
  );
}

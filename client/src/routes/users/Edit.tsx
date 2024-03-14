import { useLoaderData, useNavigate } from "react-router-dom";
import useNotify from "../../shared/hooks/useNotify";
import UserForm from "./components/UserForm";
import useRequest from "../../shared/hooks/requests/useRequest";
import { useEffect } from "react";
import { User } from "./utils/types";

export default function Edit() {
  const user = useLoaderData() as User | undefined;
  const notify = useNotify();
  const navigate = useNavigate();

  const { doRequest, loading, response, errors } = useRequest(
    "put",
    "/api/user",
  )

  useEffect(() => {
    if (response?.status == 200) {
      const newUser = response.data;
      navigate(`/users/${newUser.id}`)
      notify("Usuario editado satisfactoriamente", "success");
    }
  }, [response]);

  return(
    <UserForm
      user={user}
      submitCallback={doRequest}
      loading={loading}
      errors={errors}
      response={response}
    />
  );
}

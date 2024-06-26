import { SerializedError } from "@sn1006/common";
import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import axiosClient from "../../../utils/axiosClient";

type method = "put" | "post" | "get";

export default function useRequest(
  method: method,
  url: string,
  callback?: (res: AxiosResponse) => any
) {
  const [loading, setLoading] = useState<boolean>();
  const [errors, setErrors] = useState<SerializedError[] | undefined>();
  const [response, setResponse] = useState<AxiosResponse>();

  const doRequest = async (data?: any) => {
    try {
      setLoading(true);
      setErrors(undefined);
      const res = await axiosClient[method](url, data);
      setLoading(false);
      setResponse(res);
      callback && callback(res);
    } catch (err) {
      if (err instanceof AxiosError && Array.isArray(err.response?.data)) {
        setLoading(false);
        setErrors(err.response?.data);
      } else throw err;
    }
  };

  return { doRequest, loading, errors, response };
}

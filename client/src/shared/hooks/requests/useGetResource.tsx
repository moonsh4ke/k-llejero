import { useEffect, useState } from "react";
import axiosClient from "../../../utils/axiosClient";

// make a GET request to a backend resource endpoint to get an individual record
export default function useGetResource<Resource>(resource: string, id: string) {
  const [data, setData] = useState<Resource>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>();
  useEffect(() => {
    const doRequest = async () => {
      try {
        const recordRes = await axiosClient.get(`/api/${resource}/${id}`);
        setData(recordRes.data);
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    };
    doRequest();
  }, []);
  return { data, loading, error };
}

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function LicitacionesView() {
  const [tender, setTender] = useState()
  let { code } = useParams();

  useEffect(() => {
    const fetchTender = async () => {
      const res = await axios.get(
        `https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?codigo=${code}&ticket=F8537A18-6766-4DEF-9E59-426B4FEE2844`
      );
      setTender(res.data);
    };
    fetchTender()
  }, []);

  return (
    <>
      {tender && <div>{JSON.stringify(tender, null, 2)}</div>}
    </>
  );
}

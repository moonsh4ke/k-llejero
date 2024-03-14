import axiosClient from "../../utils/axiosClient";
import Show from "./Show";
import List from "./List";

export default [
    {
      path: "/tenders",
      element: <List />,
      // loader: async () => {
      //   const tenderRes = await axiosClient.get("/api/tender");
      //   return tenderRes.data;
      // },
    },
    {
      path: "/tenders/:code",
      element: <Show />
    },
]

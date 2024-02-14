import Edit from "./Edit";
import New from "./New";
import Show from "./Show";
import axiosClient from "../../utils/axiosClient";
import List from "./List";

export default [
  {
    path: "/filters/:id/edit",
    element: <Edit />,
    loader: async ({ params }: any) => {
      const { id } = params;
      const filterRes = await axiosClient.get(
        `https://kllejero.dev/api/filter/${id}`
      );
      return filterRes.data;
    },
  },
  {
    path: "/filters/:id",
    element: <Show />,
    loader: async ({ params }: any) => {
      const { id } = params;
      const filterRes = await axiosClient.get(
        `https://kllejero.dev/api/filter/${id}`
      );
      return filterRes.data;
    },
  },
  {
    path: "/filters/new",
    element: <New />,
  },
  {
    path: "/filters",
    element: <List />,
    loader: async () => {
      const filterRes = await axiosClient.get(
        "https://kllejero.dev/api/filter"
      );
      return filterRes.data;
    },
  },
];

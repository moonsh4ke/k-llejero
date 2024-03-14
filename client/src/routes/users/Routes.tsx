import axiosClient from "../../utils/axiosClient";
// import Show from "./Show";
import List from "./List";
import New from "./New";
import Show from "./Show";
import Edit from "./Edit";

export default [
    {
      path: "/users/:id/edit",
      element: <Edit />,
      loader: async({ params }: any) => {
        const { id } = params;
        const userRes = await axiosClient.get(
          `/api/user/${id}`
        )
        return userRes.data;
      }
    },
    {
      path: "/users/:id",
      element: <Show />,
      loader: async({ params }: any) => {
        const { id } = params;
        const userRes = await axiosClient.get(
          `/api/user/${id}`
        )
        return userRes.data;
      }
    },
    {
      path: "/users/new",
      element: <New />
    },
    {
      path: "/users",
      element: <List />,
    },
]

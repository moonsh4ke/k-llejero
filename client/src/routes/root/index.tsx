import { Outlet } from "react-router-dom"
import Header from "./Header"


export default function RootIndex() {
  return (
    <div>
      <Header />
      <Outlet />
      <footer>footer</footer>
    </div>
  )
}

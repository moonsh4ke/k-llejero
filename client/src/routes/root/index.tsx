import { Outlet } from "react-router-dom"
import Header from "./Header"
import { Box, Container } from "@mui/material"
import { useState } from "react";
import { styled, useTheme } from '@mui/material/styles';
import { Main, DrawerHeader } from "./customStyles";
import Sidebar from "./Sidebar";


export default function RootIndex() {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <Box sx={{ display: 'flex' }}>
      <Header
        openSidebar={openSidebar}
        handleDrawerOpen={(e) => setOpenSidebar(true)}
      />
      <Sidebar
        open={openSidebar}
        handleDrawerClose={(e) => setOpenSidebar(false)}
      />
      <Container>
        <Main open={openSidebar}>
          <DrawerHeader />
          <Outlet />
        </Main>
      </Container>
      {/* <footer>footer</footer> */}
    </Box>
  )
}

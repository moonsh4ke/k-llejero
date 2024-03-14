import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./Header";
import { Box, Container } from "@mui/material";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Main, DrawerHeader } from "./customStyles";
import Sidebar from "./Sidebar";
import { SnackbarContext } from "../../contexts/SnackbarContext";
import CustomSnackbar from "../../shared/components/CustomSnackbar";
import useSnackbar from "../../shared/hooks/useSnackbar";

export default function RootIndex() {
  const [openSidebar, setOpenSidebar] = useState(false);

  const { Snackbar, showSnackbar } = useSnackbar();

  return (
    <Box sx={{ display: "flex" }}>
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
          <SnackbarContext.Provider value={showSnackbar}>
            <Outlet />
          </SnackbarContext.Provider>
        </Main>
        {Snackbar}
      </Container>
      <ScrollRestoration />
    </Box>
  );
}

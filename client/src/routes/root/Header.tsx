import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { HeaderProps } from "../../utils/types/types";

import { AppBar } from "./customStyles";
import logoBanner from "/images/logo_banner.png";
import { Badge, Stack } from "@mui/material";
import Mail from "@mui/icons-material/Mail";
import { Notifications } from "@mui/icons-material";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function Header({ openSidebar, handleDrawerOpen }: HeaderProps) {
  const { currentUser, logout } = useContext(AuthContext)!;
  const [messages, setMessage] = useState([]);
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <AppBar position="fixed" open={openSidebar}>
        <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
          <Stack direction="row" spacing={1}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(openSidebar && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Button color="inherit">
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="licitaciones"
                >
                  Licitaciones
                </Link>
              </Button>
            </Typography>
          </Stack>
          <img style={{ height: "45px" }} src={logoBanner} alt="logo banner" />
          <Stack direction="row" spacing={1}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <Mail />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            {!currentUser && (
              <Button color="inherit" onClick={(e) => navigate("/login")}>
                Login
              </Button>
            )}
            {currentUser && (
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { BadgeProps, HeaderProps, Notification } from "../../utils/types/types";

import { AppBar } from "./customStyles";
import logoBanner from "/images/logo_banner.png";
import { Badge, Container, Paper, Stack } from "@mui/material";
import Mail from "@mui/icons-material/Mail";
import { Notifications } from "@mui/icons-material";
import AccountCircle from "@mui/icons-material/AccountCircle";

import Box from "@mui/material/Box";
import TenderNotificationIcon from "./TenderNotificationIcon";

const notifications = [
  {
    id: "dfas124",
    content: "content 1 dfasdsf",
    tenderId: "dfasfsa",
  },
  {
    id: "dfas1245j",
    content: "content 3 dfaskjsla",
    tenderId: "dfasfsa",
  },
  {
    id: "dfasdfasj",
    content: "content 2 dfaskljfdgsl",
    tenderId: "dfasfsa",
  }
]

export default function Header({ openSidebar, handleDrawerOpen }: HeaderProps) {
  const { currentUser, logout } = useContext(AuthContext)!;
  // const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [badgeData, setBadgeData] = useState<BadgeProps>({
    badgeContent: 3,
    color: "error",
  });

  // if (currentUser) {
  //   SignalRContext.useSignalREffect(
  //     `notificationSendToUser-${currentUser.email}`,
  //     (message) => {
  //       setBadgeData({
  //         ...badgeData,
  //         badgeContent: (badgeData.badgeContent += 1),
  //       });
  //       console.log(`HUB: ${JSON.stringify(message)}`);
  //       setNotifications([...notifications, message]);
  //     },
  //     []
  //   );
  // }

  const navigate = useNavigate();

  const onBadgeClick = () => {
    setBadgeData({
      badgeContent: 0,
      color: "error",
    });
    setShowNotifications(!showNotifications);
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <AppBar position="fixed" open={openSidebar}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
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
            <Link
              style={{textDecoration: "none", color: "inherit" }}
              to="/"
            >
            <img style={{ height: "45px" }} src={logoBanner} alt="logo banner" />
            </Link>
          <Stack direction="row" spacing={1}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <Mail />
              </Badge>
            </IconButton>

            <TenderNotificationIcon />
            {/* <IconButton */}
            {/*   size="large" */}
            {/*   aria-label="show 17 new notifications" */}
            {/*   color="inherit" */}
            {/* > */}
            {/*   <Badge */}
            {/*     badgeContent={badgeData.badgeContent} */}
            {/*     color="error" */}
            {/*     onClick={onBadgeClick} */}
            {/*   > */}
            {/*     <Notifications /> */}
            {/*   </Badge> */}
            {/* </IconButton> */}
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
              <Button color="inherit" onClick={(e) => navigate("/auth/login")}>
                Login
              </Button>
            )}
            {currentUser && (
              <Button
                color="inherit"
                onClick={async () => {
                  await logout();
                }}
              >
                Logout
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      {/* TODO */}
      {/* {showNotifications && ( */}
      {/*   <Container */}
      {/*     maxWidth="md" */}
      {/*     sx={{ */}
      {/*       position: "absolute", */}
      {/*       border: "solid red", */}
      {/*       right: 0, */}
      {/*       top: 100, */}
      {/*       //backgroundColor: 'black' */}
      {/*     }} */}
      {/*   > */}
      {/*     {notifications?.map((notification) => ( */}
      {/*       <Container */}
      {/*         key={notification.id} */}
      {/*         onClick={() => navigate(`/licitaciones/${notification.tenderId}`)} */}
      {/*         sx={{ */}
      {/*           zIndex: 99999, */}
      {/*         }} */}
      {/*       > */}
      {/*         <Paper */}
      {/*           elevation={3} */}
      {/*           sx={{ */}
      {/*             p: 2, */}
      {/*             "& > *": { */}
      {/*               mb: 0, */}
      {/*             }, */}
      {/*           }} */}
      {/*         > */}
      {/*           <Typography variant="body1">{notification.content}</Typography> */}
      {/*           {/* <Typography variant="body2"> */}
      {/*           {/*   {notification.createdDate.toString()} */}
      {/*           {/* </Typography> */}
      {/*         </Paper> */}
      {/*       </Container> */}
      {/*     ))} */}
      {/*   </Container> */}
      {/* )} */}
    </Box>
  );
}

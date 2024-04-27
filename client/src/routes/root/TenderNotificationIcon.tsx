import { Check, Circle, Close, Notifications } from "@mui/icons-material";
import { Avatar, Badge, Button, Card, CardContent, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";
import { BadgeProps } from "../../utils/types/types";
import {
  Box,
  Fade,
  Paper,
  Popper,
  PopperPlacementType,
  Typography,
} from "@mui/material";
import { Fragment, ReactNode, useContext, useEffect, useState } from "react";
import { grey, yellow, green, red, blue, blueGrey, lime } from "@mui/material/colors";
import { tenderStates } from "../../utils/tenderStates";
import axiosClient from "../../utils/axiosClient";
import { SignalRContext } from "../../contexts/SignalRContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface Notification {
  id: string;
  tenderId: string;
  userId: string;
  content: string;
  tenderStatus: 6 | 7 | 8 | 18 | 19;
  createdDate: Date;
  readed: boolean;
}

const formatDate = (date: Date) => {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric',
    timeZone: 'local'
  } as Intl.DateTimeFormatOptions;

  return date.toLocaleString('es-ES', options);
}

export default function TenderNotificationIcon() {
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext)!;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<PopperPlacementType>();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  if (currentUser) {
    SignalRContext.useSignalREffect(
      `notificationSendToUser-${currentUser.email}`,
      (message) => {
        setBadgeData({
          ...badgeData,
          badgeContent: badgeData.badgeContent += 1,
        });
        
        console.log(`Received notification: ${JSON.stringify(message)}`);
      
        const notificationsArray = notifications.length === 5 ? [message, ...notifications.slice(0, 4)] : [message, ...notifications];
        setNotifications(notificationsArray);
      },
      []
    );
  }

  const [badgeData, setBadgeData] = useState<BadgeProps>({
    badgeContent: 0,
    color: "error",
  });

  const handleClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setBadgeData({
        badgeContent: 0,
        color: "error",
      });
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };
  
  const handleReadedClick = async () => {
    const notReadedNotifications = notifications.filter(notification => !notification.readed);

    if (!notReadedNotifications.length) {
      return;
    }

    try {
      const endpoint = '/api/notification/api/notification';
      const config = { headers: {'Content-Type': 'application/json'} };

      const res = await axiosClient.put(endpoint, notReadedNotifications, config);

      if (res.status === 200) {
        console.log(`Updated notifications: ${res.data.data}`);
        setNotifications(res.data.data);
      }
    } catch (error) {
      console.error('Failed to update notifications data:', error);
    }
  }

  const StateIcon = ({state}: any) => {
    switch(state) {
      // cerrada
      case 6:
        return(
          <Avatar sx={{bgcolor: blue[500], width: 24, height: 24}}>
            {/* <Close fontSize="small"/> */}
            C
          </Avatar>
        )
      // desierta
      case 7:
        return(
          <Avatar sx={{bgcolor: yellow[600], width: 24, height: 24}}>
            D
          </Avatar>
        )
      // adjudicada
      case 8:
        return(
          <Avatar sx={{bgcolor: green[500], width: 24, height: 24}}>
            {/* <Check fontSize="small"/> */}
            A
          </Avatar>
        )
      // revocada
      case 18:
        return(
          <Avatar sx={{bgcolor: red[500], width: 24, height: 24}}>
            R
          </Avatar>
        )
      // suspendida
      case 19:
        return(
          <Avatar sx={{bgcolor: lime[500], width: 24, height: 24}}>
            S
          </Avatar>
        )
      default:
        return null;
    }
  }

  const popper = (
    <Popper
      // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
      sx={{ zIndex: 1200, width: "500px" }}
      open={open}
      anchorEl={anchorEl}
      placement={placement}
      transition
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper
            elevation={4}
            sx={{
              paddingY: 1,
              paddingX: 2,
            }}
          >
            {/* <Stack spacing={1.5}> */}
              <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Typography variant="h6">Notificaciones</Typography>
                <Button variant="text" startIcon={<Check />} onClick={handleReadedClick}>
                  Marcar como leidas
                </Button>
              </Box>
              <List sx={{
                maxHeight: "350px",
                overflowY: "scroll",
                "&::-webkit-scrollbar": {
                  width: "8px"
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: "transparent"
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: grey[200],
                  borderRadius: "5px",
                  border: "2px solid transparent",
                  backgroundClip: "padding-box",
                  height: "10px"
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  backgroundColor: grey[400],
                  border: 0
                },
                '&::-webkit-scrollbar-thumb:active': {
                  backgroundColor: "#556cd6",
                },
              }}>
                {notifications.map((not, i) => (
                <Fragment key={not.id}>
                  <ListItem onClick={() => navigate(`/trackings/${not.tenderId}`)}>
                    <ListItemButton>
                      <ListItemIcon>
                        {!not.readed &&
                          <Circle color="primary" sx={{fontSize:"0.7em"}}/>
                        }
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant="body1">{not.tenderId}</Typography>
                        <Typography variant="body2">{not.content}</Typography>
                        <Typography variant="caption">{formatDate(not.createdDate)}</Typography>
                      </ListItemText>
                      <ListItemIcon>
                        <StateIcon state={not.tenderStatus} />
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                  {i !== notifications.length - 1 &&
                    <Divider variant="inset" component="li"/>
                  }
                </Fragment>
                ))}
              </List>
              {/*<Button variant="text">Ver todas las notificaciones</Button>
             </Stack> */}
          </Paper>
        </Fade>
      )}
    </Popper>
  );

  useEffect(() => {
    const fetchNotifications = async() => {
      try {
        const endpoint = '/api/notification/api/notification';
        const queryParams = {
          UserId: currentUser?.email,
          Page: 1,
          RecordsPerPage: 5
        }
        const res = await axiosClient.get(endpoint, {
          params: queryParams
        });

        if (res.status === 200) {
          console.log(`DATA => ${JSON.stringify(res.data)}`)
          const notReadedNotifications = res.data.data.filter(notification => !notification.readed).length;
          setBadgeData({
            ...badgeData,
            badgeContent: notReadedNotifications
          });
          setNotifications(res.data.data);
        }
        
      } catch(error) {
        console.error(`Error fetchNotifications => ${error}`)
      }
    }
    fetchNotifications();
  }, []);

  return (
    <IconButton
      size="large"
      aria-label="show 17 new notifications"
      color="inherit"
      onClick={handleClick("bottom-end")}
    >
      <Badge badgeContent={badgeData.badgeContent} color="error">
        <Notifications />
      </Badge>
      {popper}
    </IconButton>
  );
}

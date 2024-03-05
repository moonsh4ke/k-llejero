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
import { ReactNode, useState } from "react";
import { grey, yellow, green, red, blue, blueGrey, lime } from "@mui/material/colors";
import { tenderStates } from "../../utils/tenderStates";

interface NotificationTest {
  id: string;
  name: string;
  code: string;
  state: 6 | 7 | 8 | 18 | 19;
  createdDate: Date;
  readed: boolean;
}

const formatDate = (date: Date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' } as Intl.DateTimeFormatOptions;
  return date.toLocaleString('es-ES', options);
}

const notifications: NotificationTest[] = [
  {
    id: "idk1",
    name: "Insumos Medicos y Medicamentos",
    code: "1509-5-L114",
    state: 6,
    createdDate: new Date(2024, 3, 3, 14, 30, 0),
    readed: false,
  },
  {
    id: "idk2",
    name: "Insumos Medicos y Medicamentos",
    code: "1509-5-L114",
    state: 7,
    createdDate: new Date(2024, 2, 3, 14, 30, 0),
    readed: false,
  },
  {
    id: "idk3",
    name: "Insumos Medicos y Medicamentos",
    code: "1509-5-L114",
    state: 8,
    createdDate: new Date(2024, 1, 3, 14, 30, 0),
    readed: false,
  },
  {
    id: "idk4",
    name: "Insumos Medicos y Medicamentos",
    code: "1509-5-L114",
    state: 18,
    createdDate: new Date(2023, 3, 3, 14, 30, 0),
    readed: false,
  },
  {
    id: "idk5",
    name: "Insumos Medicos y Medicamentos",
    code: "1509-5-L114",
    state: 19,
    createdDate: new Date(2023, 2, 2, 14, 30, 0),
    readed: false,
  },
];

export default function TenderNotificationIcon() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<PopperPlacementType>();

  const [badgeData, setBadgeData] = useState<BadgeProps>({
    badgeContent: 3,
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
                <Button  variant="text" startIcon={<Check />}>Marcar como leidas</Button>
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
                <>
                  <ListItem>
                    <ListItemButton>
                      <ListItemIcon>
                        <Circle color="primary" sx={{fontSize:"0.7em"}}/>
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant="body1">{not.name}</Typography>
                        <Typography variant="body2">{not.code}</Typography>
                        <Typography variant="body2">{tenderStates[not.state]}</Typography>
                        <Typography variant="caption">{formatDate(not.createdDate)}</Typography>
                      </ListItemText>
                      <ListItemIcon>
                        <StateIcon state={not.state} />
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                  {i !== notifications.length - 1 &&
                    <Divider variant="inset" component="li"/>
                  }
                </>
                ))}
              </List>
              <Button variant="text">Ver todas las notificaciones</Button>
            {/* </Stack> */}
          </Paper>
        </Fade>
      )}
    </Popper>
  );

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

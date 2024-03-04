import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";

import { DrawerHeader, drawerWidth } from "./customStyles";
import { SidebarProps } from "../../utils/types/types";
import { Link } from "react-router-dom";
import {
  Bookmark,
  FilterAlt,
  LibraryBooks,
  PeopleAlt,
  Summarize,
} from "@mui/icons-material";

export default function Sidebar({ open, handleDrawerClose }: SidebarProps) {
  const theme = useTheme();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      {/* Assignment */}
      {/* LibraryBooks */}
      <List>
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to="/tenders"
        >
          <ListItem key="tenders" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LibraryBooks />
              </ListItemIcon>
              <ListItemText>Licitaciones</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to="/trackings"
        >
          <ListItem key="trackings" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Bookmark />
              </ListItemIcon>
              <ListItemText>Seguimientos</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
        <Link style={{ textDecoration: "none", color: "inherit" }} to="/users">
          <ListItem key="users" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PeopleAlt />
              </ListItemIcon>
              <ListItemText>Usuarios</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to="/reports"
        >
          <ListItem key="reports" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Summarize />
              </ListItemIcon>
              <ListItemText>Reportes</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to="/filters"
        >
          <ListItem key="filters" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FilterAlt />
              </ListItemIcon>
              <ListItemText>Filtros</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
}

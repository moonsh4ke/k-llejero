import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';

import { DrawerHeader, drawerWidth } from './customStyles';
import { SidebarProps } from '../../utils/types/types';
import { Link } from 'react-router-dom';

export default function Sidebar({
  open,
  handleDrawerClose,
}: SidebarProps) {
  const theme = useTheme();

  return (
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Licitaciones', 'Seguimientos', 'Usuarios', 'Reportes'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText>
              <Link style={{textDecoration: "none", color: "inherit"}} to={text}>
              {text}
              </Link>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* <Divider /> */}
        {/* <List> */}
        {/*   {['All mail', 'Trash', 'Spam'].map((text, index) => ( */}
        {/*     <ListItem key={text} disablePadding> */}
        {/*       <ListItemButton> */}
        {/*         <ListItemIcon> */}
        {/*           {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
        {/*         </ListItemIcon> */}
        {/*         <ListItemText primary={text} /> */}
        {/*       </ListItemButton> */}
        {/*     </ListItem> */}
        {/*   ))} */}
        {/* </List> */}
      </Drawer>
  );
}

import { MouseEventHandler } from "react"

export interface AuthContextData {
  currentUser?: CurrentUser;
  login: (user: any) => any;
  logout: () => any;
}

export interface CurrentUser {
  id: string;
  email: string;
  iat: number;
}

export interface HeaderProps {
  openSidebar: boolean;
  handleDrawerOpen: MouseEventHandler;
}

export interface SidebarProps {
  open: boolean,
  handleDrawerClose: MouseEventHandler;
}

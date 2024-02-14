import { Dispatch, MouseEventHandler, SetStateAction } from "react"

export interface SnackbarData {
  message?: string;
  type?: SnackbarType;
  openSnackbar: boolean;
  setOpenSnackbar: Dispatch<SetStateAction<boolean>>;
}

export type SnackbarType = "success" | "info" | "warning" | "error";

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

export interface Notification {
  
}

export interface NotificationData {

}

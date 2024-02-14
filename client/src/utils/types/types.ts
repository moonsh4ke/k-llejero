import { Dispatch, MouseEventHandler, SetStateAction } from "react"

export interface SnackbarData {
  message?: string;
  type?: SnackbarType;
  openSnackbar: boolean;
  setOpenSnackbar: Dispatch<SetStateAction<boolean>>;
}

export type SnackbarType = "success" | "info" | "warning" | "error";

export interface AuthContextData {
  currentUser?: AuthDataResponse;
  login: (user: any) => any;
  logout: () => any;
}

export interface AuthDataResponse {
  data:       Data;
  status:     number;
  statusText: string;
  headers:    AuthDataResponseHeaders;
  config:     Config;
  request:    Request;
}

export interface Config {
  transitional:      Transitional;
  adapter:           string[];
  transformRequest:  null[];
  transformResponse: null[];
  timeout:           number;
  xsrfCookieName:    string;
  xsrfHeaderName:    string;
  maxContentLength:  number;
  maxBodyLength:     number;
  env:               Request;
  headers:           ConfigHeaders;
  method:            string;
  url:               string;
}

export interface Request {
}

export interface ConfigHeaders {
  Accept: string;
}

export interface Transitional {
  silentJSONParsing:   boolean;
  forcedJSONParsing:   boolean;
  clarifyTimeoutError: boolean;
}

export interface Data {
  currentUser: CurrentUser;
}

export interface CurrentUser {
  id:    string;
  email: string;
  iat:   number;
}

export interface AuthDataResponseHeaders {
  "content-length":            string;
  "content-type":              string;
  date:                        string;
  etag:                        string;
  "strict-transport-security": string;
  "x-powered-by":              string;
}


export interface HeaderProps {
  openSidebar: boolean;
  handleDrawerOpen: MouseEventHandler;
}

export interface SidebarProps {
  open: boolean,
  handleDrawerClose: MouseEventHandler;
}

export interface BadgeProps {
  badgeContent: number;
  color: string;
}

export interface Notification {
  id:          string;
  tenderId:    string;
  userId:      string;
  content:     string;
  createdDate: Date;
  readed:      boolean;
}

export interface SnackbarData {
  show:     boolean;
  severity: string;
  message:  string;
}

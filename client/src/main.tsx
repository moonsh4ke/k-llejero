import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import theme from "./theme";
import App from "./App";

import i18next from "i18next";
import translation from "zod-i18n-map/locales/es/zod.json";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

i18next.init({
  lng: "es",
  resources: {
    es: { zod: translation },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(

  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

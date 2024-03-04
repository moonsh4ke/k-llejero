import { Box, Container, Stack, useMediaQuery } from "@mui/material";
import LoginForm from "./LoginForm";
import cover from "/cover.jpg";

import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

export default function Login() {
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));

  const { currentUser } = useContext(AuthContext)!;

  const location = useLocation();

  // Wait for currentUser to be set { null or CurrentUser }, so if the user
  // is already logged in he got redirected to root
  // IMPORTANT!! this login only maters at the first render, because
  // currentUser can be undefined only in this moment

  if (currentUser === undefined) return null;

  // When we succesfully login we make and "intermediate" render, caused by the async function in the loader of routes
  // So we need to check if the currentUser is legged in by this "intermediate" render or the user is trying to access
  // This route and is already logged in

  if (currentUser && (!location.state || !location.state.returnTo))
    return <Navigate to="/" />

  return (
    <Container maxWidth="xl" sx={{ pt: 8 }}>
      {matchesMd ? (
        <Stack direction="row">
          <Box sx={{ width: "50%" }}>
            <img
              src={cover}
              alt="k-llejero_cover"
              style={{
                width: "100%",
                borderRadius: "1%",
                opacity: "90%",
              }}
            />
          </Box>
          <Box sx={{ width: "50%", p: { md: 2, lg: 4 } }}>
            <LoginForm />
          </Box>
        </Stack>
      ) : (
        <Box sx={{ px: { sm: 10, xs: 0 } }}>
          <LoginForm />
        </Box>
      )}
    </Container>
  );
}

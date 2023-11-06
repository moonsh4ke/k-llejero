import { Container, Grid } from "@mui/material";
import cover from "/cover.jpg";
import LoginForm from "./LoginForm";

export default function LoginIndex() {
  return (
    <Container maxWidth="xl" sx={{ mt: 8 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <img
            src={cover}
            alt="k-llejero_cover"
            style={{ width: "100%", borderRadius: "1%", opacity: "90%" }}
          />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{ display: "flex", flexDirection: "column", mt: 4, pr: 12 }}
        >
          <LoginForm />
        </Grid>
      </Grid>
    </Container>
  );
}

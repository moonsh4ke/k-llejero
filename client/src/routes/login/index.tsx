import { Container, TextField, Grid, Button, Link, InputAdornment } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import cover from "/cover.jpg";

export default function LoginIndex() {
  return (
    <Container maxWidth="xl" sx={{ mt: 8}}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
        <img src={cover} alt="k-llejero_cover" style={{ width: "100%", borderRadius: "1%", opacity: "90%"}} />
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", flexDirection: "column", mt: 4, pr: 12 }}>
          <TextField
            id="outlined-basic"
            label="Correo"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            id="filled-basic"
            type="password"
            label="Contraseña"
            variant="outlined"
            sx={{mb: 2}}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button sx={{ mb: 2}} size="large" variant="contained">Login</Button>
          <Link sx={{textAlign: "end"}} variant="body1" >¿Olvidó su contraseña?</Link>
        </Grid>
      </Grid>
    </Container>
  );
}

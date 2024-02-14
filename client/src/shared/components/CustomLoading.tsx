import { CircularProgress, Stack, Typography } from "@mui/material";

export default function CustomLoading({ msg }) {
  return(
    <Stack spacing={2} alignItems="center">
      <Typography variant="h6">
        {msg}
      </Typography>
      <CircularProgress />
    </Stack>
  );
}

import { Alert, AlertTitle, Container } from "@mui/material";

export default function ErrorFallback({ error, resetErrorBoundary }: any) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <Container sx={{p: 10}}>
      <Alert severity="error">
        <AlertTitle>{error.message}</AlertTitle>
        {error.stack}
      </Alert>
    </Container>
  );
}

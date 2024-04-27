import { Download, Upload, UploadFile } from "@mui/icons-material";
import { Alert, Box, Button, CircularProgress, Snackbar, Stack, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { FileFormProps } from "../types/fileform.type";
import { TrackingData } from "../types/tracking.type";
import axiosClient from "../../../utils/axiosClient";
import { SnackbarData } from "../../../utils/types/types";

export default function FileForm(data : FileFormProps) {
  const [tracking, setTracking] = useState<TrackingData>(data.tracking);
  const [base64, setBase64] = useState<string | null>(tracking?.base64File ?? null);
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbarData, setSnackbarData] = useState<SnackbarData>({
    show: false,
    severity: "",
    message: "",
  });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file && file.type === "application/pdf" && file.size <= 5242880) {
      setLoading(true); // Inicia el indicador de carga
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const result = reader.result as string;
        setBase64(result);
        const trackingData = {
            ...tracking,
            base64File: result
        }
        
        try {
            setLoading(true);
            const endpoint = `/api/tracking/api/trackings/${trackingData.id}`;
            const resp = await axiosClient.put(endpoint, trackingData);

            if (resp.status === 200) {
                setTracking(trackingData);
                setSnackbarData({
                    show: true,
                    severity: "success",
                    message: "Cotización adjuntada correctamente",
                });
            }

        } catch (error) {
            console.error(`Error updateNote => ${error}`)
            setSnackbarData({
                show: true,
                severity: "error",
                message: "Ha ocurrido un error inesperado",
            });
        } finally {
            setLoading(false);
        }
      };
      reader.onerror = (error) => {
        console.error('Error: ', error);
        setLoading(false); // Detiene el indicador de carga si hay error en la lectura del archivo
      };
    } else {
        setSnackbarData({
            show: true,
            severity: "error",
            message: "Por favor suba un archivo de máximo 5MB",
        });
    }
  };

  const handleDownload = () => {
    if (base64) {
      const link = document.createElement('a');
      link.href = base64;
      link.download = 'Quotation.pdf'; // Nombre del archivo a descargar
      link.click();
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarData({
      ...snackbarData,
      show: !snackbarData.show,
    });
  };

  return (
    <>
        <Snackbar
            open={snackbarData.show}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
        >
            <Alert
            onClose={handleSnackbarClose}
            severity={snackbarData.severity}
            variant="filled"
            sx={{ width: "100%" }}
            >
            {snackbarData.message}
            </Alert>
         </Snackbar>
        <Box sx={{
            padding: '20px 20px 20px 0px'
        }}>
            <>
                {loading 
                    ?
                        <CircularProgress />
                    :
                        <Stack direction="row" spacing={1}>
                            {tracking && tracking.base64File && (
                                <Button 
                                    variant="contained" 
                                    sx={{
                                        width: '250px'
                                    }}
                                    size="small"
                                    startIcon={<Download />}
                                    onClick={handleDownload}>
                                Descargar cotización
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                component="label"
                                startIcon={<Upload />}
                                sx={{
                                    width: '250px'
                                }}
                            >
                                Adjuntar cotización
                                <input
                                type="file"
                                accept="application/pdf"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                id="upload-quote-input"
                                />
                            </Button>
                        </Stack>
                }
            </>
        </Box>
    </>
  )
}
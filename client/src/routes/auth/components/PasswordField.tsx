import { Control, FieldErrors } from "react-hook-form";
import CustomOutlinedInput from "../../../shared/components/inputs/OutlinedInput";
import { useState } from "react";
import { IconButton, InputAdornment, SxProps } from "@mui/material";
import { Key, Visibility, VisibilityOff } from "@mui/icons-material";

type PasswordFieldProps = {
  control: Control;
  formErrors: FieldErrors;
  sx?: SxProps;
  fullWidth?: boolean;
};

export default function PasswordField({
  control,
  formErrors,
  sx,
  fullWidth,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <CustomOutlinedInput
      id="password-adornment"
      sx={sx ? sx : undefined}
      control={control}
      errors={formErrors}
      name="password"
      label="Contraseña"
      fullWidth={fullWidth ? fullWidth : undefined}
      type={showPassword ? "text" : "password"}
      startAdornment={
        <InputAdornment position="start">
          <Key />
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }
    />
  );
}

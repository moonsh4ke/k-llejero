import { Box, SxProps, TextField, TextFieldProps } from "@mui/material";
import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormReturn,
  useForm,
} from "react-hook-form";

type CustomTextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = any,
  TTransformedValues extends FieldValues = TFieldValues
> = {
  name: string;
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  label: string;
  errors: FieldErrors<TFieldValues>;
  control: Control<TFieldValues, TContext, TTransformedValues>;
  defaultValue?: string;
  sx?: SxProps;
} & Omit<TextFieldProps, "name" | "defaultValue" | "sx">;

export default function CustomTextField({
  name,
  defaultValue,
  rules,
  label,
  errors,
  control,
  sx,
  ...textFieldProps
}: CustomTextFieldProps) {
  return (
    <Box sx={sx ? sx : undefined}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue ? defaultValue : ""}
        rules={rules}
        render={({ field }) => (
          <TextField
            {...field}
            {...textFieldProps}
            label={label}
            error={!!errors[name]}
            helperText={errors[name] ? (errors[name]!.message as string) : ""}
          />
        )}
      />
    </Box>
  );
}

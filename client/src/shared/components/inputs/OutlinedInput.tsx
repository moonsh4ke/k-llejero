import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
  SxProps,
} from "@mui/material";
import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

type CustomOutlinedInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = any,
  TTransformedValues extends FieldValues = TFieldValues
> = {
  id: string;
  name: string;
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  label: string;
  errors: FieldErrors<TFieldValues>;
  control: Control<TFieldValues, TContext, TTransformedValues>;
  defaultValue?: string;
  fullWidth?: boolean;
  sx?: SxProps;
} & Omit<
  OutlinedInputProps,
  "fullWidth" | "id" | "name" | "defaultValue" | "sx"
>;

export default function CustomOutlinedInput({
  id,
  name,
  defaultValue,
  fullWidth,
  rules,
  label,
  errors,
  control,
  sx,
  ...outlinedInputProps
}: CustomOutlinedInputProps) {
  return (
    <Box sx={sx ? sx : undefined}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue ? defaultValue : ""}
        rules={rules}
        render={({ field }) => (
          <FormControl
            fullWidth={fullWidth ? fullWidth : undefined}
            variant="outlined"
          >
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <OutlinedInput
              {...field}
              {...outlinedInputProps}
              label={label}
              error={!!errors[name]}
            />
            <FormHelperText error={!!errors[name]}> {errors[name] ? (errors[name]!.message as string) : ""}</FormHelperText>
          </FormControl>
        )}
      />
    </Box>
  );
}

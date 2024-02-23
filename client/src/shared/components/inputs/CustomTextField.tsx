import { TextField, TextFieldProps } from "@mui/material";
import { Control, Controller, FieldErrors, FieldPath, FieldValues, RegisterOptions } from "react-hook-form";

type CustomTextFieldProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>, TContext = any, TTransformedValues extends FieldValues = TFieldValues> = {
  name: string;
  defaultValue: string;
  rules?: Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
  label: string;
  errors: FieldErrors<TFieldValues>;
  control: Control<TFieldValues, TContext, TTransformedValues>;
} & Omit<TextFieldProps, 'name' | 'defaultValue'>

export default function CustomTextField({
  name,
  defaultValue,
  rules,
  label,
  errors,
  control,
  ...textFieldProps
}: CustomTextFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue? defaultValue : undefined}
      rules={rules}
      render={({ field }) => (
        <TextField
          {...field}
          {...textFieldProps}
          label={label}
          error={!!errors[name]}
          helperText={
            errors[name] ? (errors[name]!.message as string) : ""
          }
        />
      )}
    />
  )
}

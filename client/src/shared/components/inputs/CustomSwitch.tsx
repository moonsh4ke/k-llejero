import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { Control, Controller, FieldValues } from "react-hook-form";

type CustomSwitchProps<TFieldValues extends FieldValues = FieldValues, TContext = any, TTransformedValues extends FieldValues = TFieldValues> = {
  name: string;
  defaultValue: boolean;
  control: Control<TFieldValues, TContext, TTransformedValues>;
  label: string;
}

export default function CustomSwitch({
  name,
  label,
  defaultValue,
  control,
}: CustomSwitchProps) {
  return(
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({field: { onChange, value }}) => (
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={value} onChange={onChange} />}
            label={label}
          />
        </FormGroup>
      )}
    />
  );
}

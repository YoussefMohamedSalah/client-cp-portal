import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { IOption } from "types/Forms/option";

interface Props {
  label?: string;
  value: any;
  disabled?: boolean;
  defaultValue?: any;
  options: IOption[];
  onChange: (value: any) => void;
  placeholder?: string;
  required?: boolean;
}

const SimpleSelect = React.memo(({ options, label, onChange, defaultValue, disabled, value, required }: Props) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl
        size="small"
        sx={{
          minWidth: "150px",
          // border: '1px solid #888888',
          "& .MuiInputLabel-root": {
            color: "#888888!important", // Label color
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#888888!important", // Border color
            },
            "&:hover fieldset": {
              borderColor: "#40a9ff",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#40a9ff",
            },
            "& input": {
              color: "#888888!important", // Input text color
            },
          },
        }}
        fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          required={required}
          value={value}
          label={label}
          onChange={(event: SelectChangeEvent<string>, child: React.ReactNode) => {
            const newValue = event.target.value;
            onChange(newValue);
          }}>
          {options.map((option, index: number) => {
            return (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
});

export default SimpleSelect;

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

const SimpleSelect = React.memo(
  ({ options, label, onChange, defaultValue, disabled, value, required, placeholder }: Props) => {
    return (
      <Box sx={{ minWidth: 120, margin: "8px 0" }}>
        <FormControl
          disabled={disabled}
          required={required}
          size="small"
          sx={{
            minWidth: "150px",
            "& fieldset": {
              borderColor: "#888888!important",
              borderWidth: 1,
            },
            "& .MuiInputLabel-root": {
              color: "#888888!important", // Label color
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#888888!important", // Border color
              },
              "& svg": {
                color: "#888888!important", // svg icon color
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
              "& .MuiInputBase-input": {
                color: "#888888!important",
              },
            },
          }}
          fullWidth>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            placeholder={placeholder}
            required={required}
            value={value}
            label={label}
            defaultValue={defaultValue}
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
  },
);

export default SimpleSelect;

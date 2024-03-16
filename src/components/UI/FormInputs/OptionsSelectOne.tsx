import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { AutocompleteInputChangeReason } from "@mui/material/Autocomplete";
import { IOption } from "types/Forms/option";

interface Props {
  label?: string;
  value: any;
  disabled?: boolean;
  defaultValue?: any;
  options: (string | IOption)[];
  onChange: (value: any) => void;
  placeholder?: string;
  required?: boolean;
}

const OptionsSelectOne = React.memo(({ options, label, onChange, defaultValue, disabled, value, required }: Props) => {
  const getOptionLabel = (option: string | IOption) => (typeof option === "string" ? option : option?.label || "");
  const filterOptions = (options: (string | IOption)[], { inputValue }: { inputValue: string }) => {
    const inputValueLowerCase = inputValue.toLowerCase();
    const filteredOptions = options.filter((option) => {
      const optionLabel = getOptionLabel(option).toLowerCase();
      return optionLabel.includes(inputValueLowerCase);
    });
    return filteredOptions;
  };

  return (
    <Autocomplete
      freeSolo
      size="small"
      sx={{
        minWidth: "150px",
        // border: '1px solid #888888',
        "& .MuiInputLabel-root": {
          color: "#888888!important", // Label color
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: required ? "red" : "#888888!important", // Border color based on required prop
          },
          "&:hover fieldset": {
            borderColor: "#000000",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#40a9ff",
          },
          "& input": {
            color: "#888888!important", // Input text color
          },
        },
      }}
      fullWidth
      disabled={disabled}
      disablePortal
      value={value}
      defaultValue={defaultValue}
      getOptionLabel={getOptionLabel}
      onChange={(event: any, newValue: string | IOption | null) => {
        if (typeof newValue === "string") {
          onChange(newValue);
        } else if (newValue !== null) {
          onChange(newValue?.value);
        } else {
          onChange(null);
        }
      }}
      onInputChange={(event, newInputValue: string, reason: AutocompleteInputChangeReason) => {
        if (reason === "input") {
          onChange(newInputValue);
        }
      }}
      id="free-solo-2-demo"
      disableClearable
      options={options}
      filterOptions={filterOptions}
      renderInput={(params) => (
        <TextField
          sx={{ margin: "8px 0" }}
          placeholder={label}
          required={required}
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
        />
      )}
    />
  );
});

export default OptionsSelectOne;

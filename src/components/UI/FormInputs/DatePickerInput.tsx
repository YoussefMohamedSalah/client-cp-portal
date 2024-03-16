import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/material/styles";

interface Props {
  label?: string;
  type?: string;
  key?: string;
  value: any;
  width?: string;
  rows?: number;
  onCustomClick?: (value: string | any) => void;
  placeholder?: string;
  multiple?: boolean;
  hidden?: boolean;
  disabled?: boolean;
  defaultValue?: any;
  info?: string;
  required?: boolean;
  onChange: (value: string | any) => void;
}

const DatePickerInput = ({ onChange, value, defaultValue, required, disabled, label }: Props) => {

  const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
    // Apply styling to the underlying TextField
    "& .MuiInputBase-input": {
      color: "#888888",
    },

    "& .MuiInputLabel-root": {
      color: "#888888",
    },

    // Add styling for the borders
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red", // Set the border color
      },
      "&:hover fieldset": {
        borderColor: "#888888", // Set the border color on hover
      },
      "&.Mui-focused fieldset": {
        borderColor: "#40a9ff", // Set the border color when focused
      },
    },
  }));

  const handleFormatDateBeforeResponding = (dateObject: any) => {
    const stringDate = dateObject.format("YYYY-MM-DD");
    onChange(stringDate);
  };

  return (
    <>
      {required ? (
        <StyledDatePicker
          value={moment(value)}
          disabled={disabled}
          sx={{ margin: "8px 0" }}
          onChange={(newValue: any) => handleFormatDateBeforeResponding(newValue)}
          slotProps={{ textField: { size: "small", fullWidth: true, required: required } }}
          views={["year", "month", "day"]}
          label={label}
        />
      ) : (
        <DatePicker
          value={moment(value)}
          disabled={disabled}
          sx={{ margin: "8px 0" }}
          onChange={(newValue: any) => handleFormatDateBeforeResponding(newValue)}
          slotProps={{ textField: { size: "small", fullWidth: true, required: required } }}
          views={["year", "month", "day"]}
          label={label}
        />
      )}
    </>
  );
};

export default DatePickerInput;

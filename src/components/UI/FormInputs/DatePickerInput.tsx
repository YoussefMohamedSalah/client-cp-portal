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
    "& fieldset": {
      borderColor: "#888888!important",
      borderWidth: 1,
    },
    "& .MuiInputBase-input": {
      color: "#888888",
    },
    "& .MuiInputLabel-root": {
      color: "#888888",
      "& fieldset": {
        borderColor: "#888888!important", // Border color
      }
    },
    // Add styling for the borders
    "& .MuiOutlinedInput-root": {
      "& svg": {
        color: "#888888!important", // svg icon color
      },
    },
  }));

  const handleFormatDateBeforeResponding = (dateObject: any) => {
    const stringDate = dateObject.format("YYYY-MM-DD");
    onChange(stringDate);
  };

  return (
    <>
      <StyledDatePicker
        value={moment(value)}
        disabled={disabled}
        sx={{ margin: "8px 0" }}
        onChange={(newValue: any) => handleFormatDateBeforeResponding(newValue)}
        slotProps={{ textField: { size: "small", fullWidth: true, required: required } }}
        views={["year", "month", "day"]}
        label={label}
      />
    </>
  );
};

export default DatePickerInput;

import moment from "moment";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
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

const StyledTimePicker = styled(TimePicker)(({ theme }) => ({
    // Apply styling to the underlying TextField
    "& .MuiInputBase-input": {
        color: "#888888",
    },

    "& .MuiInputLabel-root": {
        color: "#888888",
    },

    "& .Mui-focused": {
        "& .MuiInputLabel-root": {
            color: "#888888",
        },
    },

    // Add styling for the borders
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "#888888", // Set the border color
        },
        "&:hover fieldset": {
            borderColor: "#888888", // Set the border color on hover
        },
        "&.Mui-focused fieldset": {
            borderColor: "#888888", // Set the border color when focused
        },
    },
}));

const TimePickerInput = ({ onChange, value, defaultValue, required, disabled, label }: Props) => {
    const handleFormatTimeBeforeResponding = (dateObject: any) => {
        const stringTime = dateObject.format("HH:mm"); // Format in 24-hour format
        onChange(stringTime);
    };

    const defaultTime = defaultValue ? moment(defaultValue, "hh:mm").format("HH:mm") : null;


    return (
        <StyledTimePicker
            sx={{ margin: "8px 0" }}
            slotProps={{ textField: { size: "small", fullWidth: true, required: required ? true : false } }}
            value={moment(value, "HH:mm")}
            defaultValue={defaultTime}
            disabled={disabled}
            onChange={(newValue: any) => handleFormatTimeBeforeResponding(newValue)}
            label={label}
            name="startTime"
        />
    );
};

export default TimePickerInput;

import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const ValidationTextField = styled(TextField)({
  '& input:valid + fieldset': {
    borderColor: '#888888!important',
    borderWidth: 1,
  },
  '& input:invalid + fieldset': {
    borderColor: 'red',
    borderWidth: 1,
  },
  '& input:valid:focus + fieldset': {
    borderLeftWidth: 4,
    padding: '4px !important', // override inline-style
  },
  // Adjust label color
  '& .MuiInputLabel-root': {
    color: '#888888!important',
  },
  // Adjust focused label color
  '& .Mui-focused': {
    '& .MuiInputLabel-root': {
      color: '#888888!important',
    },
  },
  // Adjust input value color
  '& .MuiInputBase-input': {
    color: '#888888!important',
  },
  // Override hover styles
  '&:hover': {
    '& .MuiInputLabel-root, & .MuiInputBase-input': {
      color: '#888888!important',
    },
  },
});

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
};


const TextInput = ({ onChange, value, defaultValue, required, disabled, label, type, width }: Props) => {
  return (
    <ValidationTextField
      fullWidth
      sx={{ margin: '8px 0', width: `${width}` }}
      label={label}
      type={type === "number" ? "number" : "text"}
      required={required}
      disabled={disabled}
      autoCorrect={''}
      size="small"
      variant="outlined"
      defaultValue={defaultValue}
      value={value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
      id="validation-outlined-input"
      className="mui_input"
    />
  )
}

export default TextInput

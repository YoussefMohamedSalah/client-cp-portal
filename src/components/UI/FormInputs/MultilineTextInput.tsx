import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';


const ValidationTextField = styled(TextField)({
  '& textarea + fieldset': {
    borderColor: '#888888!important',
    borderWidth: 1,
  },
  '& textarea:valid:focus + fieldset': {
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
}

const MultilineTextInput = ({
  label,
  onChange,
  defaultValue,
  value,
  required,
  disabled,
  hidden,
  rows,
  key
}: Props) => {
  return (
    <ValidationTextField
      id={`text-area-${key}`}
      label={label}
      placeholder={label}
      sx={{ margin: '8px 0' }}
      fullWidth
      hidden={hidden}
      multiline
      rows={rows}
      value={value}
      defaultValue={defaultValue}
      required={required}
      disabled={disabled}
      size="small"
      onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value)}
    />
  )
}

export default MultilineTextInput
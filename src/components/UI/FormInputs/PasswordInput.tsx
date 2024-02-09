import * as React from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

const ValidationTextField = styled(OutlinedInput)({
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


const PasswordInput = ({ onChange, value, defaultValue, required, disabled, label }: Props) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <ValidationTextField
      id="outlined-adornment-password"
      label={label}
      required={required}
      disabled={disabled}
      fullWidth
      size="small"
      value={value}
      defaultValue={defaultValue}
      sx={{ margin: '8px 0', border: "gray" }}
      type={showPassword ? 'text' : 'password'}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
      endAdornment={
        <InputAdornment position="end" >
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }
    />
  )
}

export default PasswordInput
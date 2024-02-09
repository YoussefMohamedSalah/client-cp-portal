import * as React from 'react';
import Switch from '@mui/material/Switch';
import { IOption } from 'types/Forms/option';

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
  hide?: boolean;
  disabled?: boolean;
  defaultValue?: any;
  info?: string;
  required?: boolean;
  options: IOption[];
  onChange: (value: string | any) => void;
}

const SwitchInput = ({ onChange, value, defaultValue, required, disabled }: Props) => {
  const [checked, setChecked] = React.useState(true);

  return (
    <Switch
      checked={checked}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
      }}
      required={required}
      sx={{ margin: '8px 0' }}
      disabled={disabled}
      size="small"
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
}

export default SwitchInput;
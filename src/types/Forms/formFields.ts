import { IOption } from "./option";

export interface IFormField {
  name: string;

  type:
  | "text"
  | "email"
  | "password"
  | "number"
  | "date"
  | "time"
  | "datetime-local"
  | "checkbox"
  | "radio"
  | "select"
  | "hidden"
  | "multi select"
  | "image"
  | "checkboxes"
  | "editor"
  | "textarea";
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  options?: IOption[];
  defaultValue?: any;
  multiple?: boolean;
  rows?: number;
};

export interface IField {
  label: string;
  type: string;
  key?: string;
  value?: any;
  width?: string;
  rows?: number;
  onChange: (value: string | any) => void;
  onCustomClick?: (value: string | any) => void;
  placeholder?: string;
  options?: IOption[];
  multiple?: boolean;
  hide?: boolean;
  disabled?: boolean;
  default?: any;
  info?: string;
  required?: boolean;
};
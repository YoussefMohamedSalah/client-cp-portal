import React, { InputHTMLAttributes } from "react";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  label?: string;
  placeholder?: string;
  name: string;
  error?: any;
  type?: string;
  shadow?: boolean;
  variant?: "normal" | "solid" | "outline";
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className = "block",
      label,
      name,
      error,
      placeholder,
      variant = "normal",
      shadow = false,
      type = "text",
      inputClassName,
      labelClassName,
      ...rest
    },
    ref,
  ) => {
    return (
      <>
        {label && (
          <label htmlFor={name} className="form-label">
            {label}
          </label>
        )}
        <input
          id={name}
          name={name}
          type={type}
          ref={ref} // @ts-ignore
          placeholder={placeholder}
          className="form-control form-control-lg"
          autoComplete="off"
          spellCheck="false"
          aria-invalid={error ? "true" : "false"}
          {...rest}
        />
        {error && <p className="my-2 text-warning opacity-75">{error}</p>}
      </>
    );
  },
);

export default Input;
Input.displayName = "Input";

import React from "react";

interface Props {
  onClick?: () => void;
  className?: string;
  variant?: "secondary" | "primary" | "dark";
  size?: "md" | "lg";
  content: string;
}

const Button: React.FC<Props> = ({ onClick, className, variant, size, content }) => {
  return (
    <button
      type="button"
      className={`btn btn-${variant ? variant : "secondary"} btn-${size ? size : "md"} ${className}`}
      onClick={onClick}>
      {content}
    </button>
  );
};

export default Button;

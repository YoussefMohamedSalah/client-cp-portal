import { useRef } from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

interface Props {
  key?: string;
  hidden?: boolean;
  disabled?: boolean;
  label: string;
  onChange: (value: string | any) => void;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const FileUploadInput = ({ onChange, disabled, label }: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Programmatically click the hidden file input
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100">
      <Button
        sx={{ margin: "8px 0", width: "250px" }}
        variant="outlined"
        component="span"
        disabled={disabled}
        endIcon={<CloudUploadIcon />}
        onClick={handleButtonClick}
      >
        {label}
        <VisuallyHiddenInput
          type="file"
          ref={fileInputRef} // Reference to the hidden file input
          onChange={onChange} // Handle file change
        />
      </Button>
    </div>
  );
};

export default FileUploadInput;

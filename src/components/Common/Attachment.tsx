import React, { useCallback, useEffect, useState } from "react";
import Dropzone from "./Dropzone";
import { Spinner } from "react-bootstrap";

interface Props {
  onUploadFile: (file: File) => void;
  isSubmitting: boolean;
}

const Attachment: React.FC<Props> = ({ onUploadFile, isSubmitting }) => {
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (file) {
      onUploadFile(file)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file])

  const onDrop = useCallback((acceptedFiles: any) => {
    let reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = url => {
      setFile(acceptedFiles[0])
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="mt-3">
      <Dropzone
        onDrop={onDrop}
        file={file ? file : null}
        onDelete={() => setFile({} as File)}
      />
      {file &&
        file &&
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary" onClick={() => onUploadFile(file)}>
            {isSubmitting
              ? <Spinner animation="border" variant="light" size="sm" />
              : "Upload"}
          </button>
        </div>}
    </div>
  );
};

export default Attachment;

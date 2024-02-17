import React, { useRef, useState } from "react";
import { getImageUrl } from "utils/Helpers";

interface Props {
  defaultUrl: string;
  title: string;
  onSave: () => void;
}

const ImageCard = ({ defaultUrl, title, onSave }: Props) => {
  const [file, setFile] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile);
      setFile(fileUrl);
    }
  };

  return (
    <div className="card">
      <div className="card-header d-flex align-items-center" style={{ height: "3rem" }}>
        {title}
      </div>
      <hr className="mt-0 mb-3" />
      <div className="card-body text-center d-flex flex-column align-items-center">
        <div
          className="rounded mb-2"
          style={{
            width: "13.4rem",
            height: "13.4rem",
            overflow: "hidden",
            backgroundColor: "#cccccc",
          }}>
          <img
            className="mb-2"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            src={file || getImageUrl(defaultUrl) || "https://placehold.co/600x600/FFFFFF/cccccc/png"}
            alt=""
          />
        </div>
        <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
        <input type="file" ref={inputRef} style={{ display: "none" }} onChange={handleFileChange} />
        <div className="d-flex gap-2">
          <button className="btn btn-primary" type="button" onClick={handleUpload}>
            Upload
          </button>
          <button className="btn btn-primary" type="button" onClick={() => onSave()}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;

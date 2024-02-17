import ImagePreviewModal from "components/Modals/ImagePreviewModal";
import React, { useState } from "react";
import { FileType } from "types/FileType";

interface Props {
  files: FileType[];
  onRemove: (file: FileType) => void;
}

const OldFiles = ({ files, onRemove }: Props) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [preview, setPreview] = useState<FileType>();

  return (
    <>
      {files &&
        files.map((file, index: number) => {
          return (
            <div key={index} className="btn-group" role="group" aria-label="Basic outlined example">
              <button
                type="button"
                style={{
                  backgroundColor: file?.state! === false ? "#FC5A69" : "",
                }}
                className="btn btn-outline-secondary"
                onClick={() => {
                  setPreview(file);
                  setIsModal(true);
                }}>
                {file.name}
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => onRemove(file)}>
                <i className="icofont-close-circled text-danger  pointer" />
              </button>
            </div>
          );
        })}
      <ImagePreviewModal
        onClose={() => setIsModal(false)}
        isModal={isModal}
        modalHeader={preview?.name! || ""}
        preview={preview ? `${process.env.REACT_APP_API_FILES_BASE_URL + preview?.url!}` : ""}
      />
    </>
  );
};

export default OldFiles;

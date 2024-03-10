import { useDropzone } from "react-dropzone";

interface Props {
  onDrop: (acceptedFiles: any) => void;
  file: File | null;
  onDelete: () => void;
}

const Dropzone: React.FC<Props> = ({ onDrop, file, onDelete }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const getFileSize = (size: number) => {
    if (size) {
      if (size < 1024) {
        return `${size} B`;
      } else if (size >= 1024 && size < 1024 * 1024) {
        return `${(size / 1024).toFixed(2)} KB`;
      } else if (size >= 1024 * 1024 && size < 1024 * 1024 * 1024) {
        return `${(size / (1024 * 1024)).toFixed(2)} MB`;
      } else {
        return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
      }
    } else return "";
  };

  const renderFileIconByMimeType = (fileName: string) => {
    if (fileName) {
      if (fileName.endsWith(".pdf")) {
        return (
          <i
            className="icofont-file-pdf"
            style={{
              color: "#ff0000",
              fontSize: 50,
            }}
          />
        );
      } else if (fileName.endsWith(".doc") || fileName.endsWith(".docx") || fileName.endsWith(".odt")) {
        return (
          <i
            className="icofont-file-document"
            style={{
              color: "#007bff",
              fontSize: 50,
            }}
          />
        );
      } else if (fileName.endsWith(".xls") || fileName.endsWith(".xlsx")) {
        return (
          <i
            className="icofont-file-excel"
            style={{
              color: "#28a745",
              fontSize: 50,
            }}></i>
        );
      } else if (fileName.endsWith(".ppt") || fileName.endsWith(".pptx")) {
        return (
          <i
            className="icofont-file-ppt"
            style={{
              color: "#ff0000",
              fontSize: 50,
            }}></i>
        );
      } else if (fileName.endsWith(".zip") || fileName.endsWith(".rar")) {
        return (
          <i
            className="icofont-file-archive"
            style={{
              color: "#000000",
              fontSize: 50,
            }}></i>
        );
      } else if (
        fileName.endsWith(".png") ||
        fileName.endsWith(".jpg") ||
        fileName.endsWith(".jpeg") ||
        fileName.endsWith(".gif")
      ) {
        return <img alt="file" src={fileName} style={{ width: 50, height: 50 }} />;
      } else if (fileName.endsWith(".txt")) {
        return (
          <i
            className="icofont-file-alt"
            style={{
              color: "#000000",
              fontSize: 50,
            }}
          />
        );
      } else {
        return <i className="icofont-file"></i>;
      }
    }
  };

  return (
    <div className="dropzone">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>
            Drop the file here ... <i className="icofont-upload-alt"></i>
          </p>
        ) : (
          <p>
            Drag 'n' drop some file here, or click to select files <i className="icofont-upload-alt"></i>
          </p>
        )}
      </div>
      {file && file?.name! && (
        <div className="uploaded-files w-100">
          <div className="text-center d-flex align-items-center justify-content-center">
            <div style={{ margin: 10 }}>
              <div className="file-name">
                {renderFileIconByMimeType(file?.name!)}
                <section>{file?.name!}</section>
              </div>
              <div className="file-size">
                <span>{getFileSize(file?.size!)}</span>
              </div>
              <div className="file-action">
                <i className="icofont-trash" style={{ cursor: "pointer", marginLeft: 5 }} onClick={onDelete} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropzone;

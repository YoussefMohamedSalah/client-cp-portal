import { Modal } from "react-bootstrap";

interface Props {
  onClose: () => void;
  isModal: boolean;
  modalHeader: string;
  preview: any;
}

const ImagePreviewModal: React.FC<Props> = ({ onClose, isModal, modalHeader, preview }) => {
  return (
    <Modal centered size="lg" show={isModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">{modalHeader}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <img src={preview} alt="Preview" style={{ maxWidth: "100%", maxHeight: "75vh" }} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" onClick={onClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImagePreviewModal;

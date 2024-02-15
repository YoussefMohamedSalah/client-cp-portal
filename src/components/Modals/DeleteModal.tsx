import { Modal } from "react-bootstrap";

interface Props {
  onClose: () => void;
  show: boolean;
  modalHeader: string;
  onDelete: () => void;
  message?: string;
}

const DeleteModal: React.FC<Props> = ({ onClose, show, modalHeader, onDelete, message }) => {
  return (
    <Modal show={show} centered onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">{modalHeader}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="justify-content-center flex-column d-flex">
        <i className="icofont-ui-delete text-danger display-2 text-center mt-2" />
        <p className="mt-4 fs-5 text-center">{message || "Are you sure you want to delete this?"}</p>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-primary" onClick={onClose}>
          Cancel
        </button>
        <button type="button" className="btn btn-danger color-fff" onClick={onDelete}>
          Delete
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;

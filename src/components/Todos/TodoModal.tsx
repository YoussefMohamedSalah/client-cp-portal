import FormInputs from "components/UI/FormInputs/FormInputs";
import { Modal } from "react-bootstrap";
import { IField } from "types/Forms/formFields";

interface Props {
  onClose: () => void;
  onUpdate: () => void;
  onCreate: () => void;
  isModal: "none" | "edit" | "create";
  formFields: IField[];
}

const TodoModal = ({ onClose, onUpdate, onCreate, isModal, formFields }: Props) => {
  console.log(isModal)
  return (
    <Modal centered show={isModal !== "none" ? true : false} onHide={onClose}>
      <Modal.Body className="d-flex flex-column">
        <FormInputs formFields={formFields} grid={true} block={true} />
        {isModal === "create" ? (
          <button type="button" className="btn btn-primary align-self-center" onClick={onCreate}>
            Create
          </button>
        ) : (
          <button type="button" className="btn btn-primary align-self-center" onClick={onUpdate}>
            Update
          </button>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default TodoModal;

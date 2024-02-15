import { useDeleteGroup } from "api/Group/deleteGroup";
import { useUI } from "contexts/UIContext";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { handleServerError } from "utils/HandlingServerError";

interface Props {
  message?: string;
  groupId: string;
  children: string | JSX.Element | JSX.Element[];
  className: string;
  isRemoved: () => void;
}

const DeleteModal: React.FC<Props> = ({
  message,
  groupId,
  className,
  children,
  isRemoved,
}) => {
  const [show, setShow] = useState<boolean>(false);

  const { showError, showSuccess } = useUI();
  const { mutateAsync: deleteMutation } = useDeleteGroup();

  const deleteGroup = async () => {
    try {
      await deleteMutation({ id: groupId });
      showSuccess();
      isRemoved();
      setShow(false);
    } catch (err: any) {
      console.log(err.response?.data?.msg!);
      showError(handleServerError(err.response));
    }
  };

  return (
    <>
      <button className={className} type="button" onClick={() => setShow(true)}>
        {children}
      </button>

      <Modal show={show} centered onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Delete Group</Modal.Title>
        </Modal.Header>

        <Modal.Body className="justify-content-center flex-column d-flex">
          <i className="icofont-ui-delete text-danger display-2 text-center mt-2" />
          <p className="mt-4 fs-5 text-center">
            {message || "Are you sure you want to delete this?"}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShow(false)}
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn btn-danger color-fff"
            onClick={deleteGroup}
          >
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;

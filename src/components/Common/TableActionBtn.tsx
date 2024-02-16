import { useState } from "react";
import DeleteModal from "components/Modals/DeleteModal";

interface Props {
  id: string;
  onClickEdit: () => void;
  onDelete: (id: string) => void;
  title: string;
}

function TableActionBtn({ id, title, onClickEdit, onDelete }: Props) {
  const [isModal, setIsModal] = useState<boolean>(false);

  const handleDelete = (id: string) => {
    onDelete(id);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      <div className="btn-group" role="group" aria-label="Basic outlined example">
        <button type="button" className="btn btn-outline-secondary" onClick={onClickEdit}>
          <i className="icofont-edit text-success" />
        </button>
        <button type="button" className="btn btn-outline-secondary deleterow" onClick={() => setIsModal(true)}>
          <i className="icofont-close-circled text-danger"></i>
        </button>
      </div>
      <DeleteModal
        show={isModal}
        onClose={() => setIsModal(false)}
        onDelete={() => handleDelete(id)}
        message={`Are you sure you want to delete ${title}?`}
        modalHeader={`Delete ${title}`}
      />
    </>
  );
}

export default TableActionBtn;

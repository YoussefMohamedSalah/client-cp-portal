import { useState } from "react";
import { handleServerError } from "utils/HandlingServerError";
import { useUI } from "contexts/UIContext";
import DeleteModal from "components/Modals/DeleteModal";
import { allowEditActionBtn, allowDeleteActionBtn } from "utils/ActionsGuards";
import { useDeleteDocument } from "api/Documents/deleteDocument";
import { PettyCashRequest } from "types/Pc_request";
import { PurchaseOrderRequest } from "types/Po_request";
import { EmployeeRequest } from "types/Employee_request";
import { MaterialRequest } from "types/Material_request";
import { SiteRequest } from "types/Site_request";
import { Contract } from "types/Contract";
import { Invoice } from "types/Invoice";

interface Props<
  T extends
    | PettyCashRequest
    | PurchaseOrderRequest
    | EmployeeRequest
    | MaterialRequest
    | SiteRequest
    | Contract
    | Invoice,
> {
  data: T;
  onClickEdit: () => void;
}

function DocumentsTableActionBtn<
  T extends
    | PettyCashRequest
    | PurchaseOrderRequest
    | EmployeeRequest
    | MaterialRequest
    | SiteRequest
    | Contract
    | Invoice,
>({ data, onClickEdit }: Props<T>) {
  const { mutateAsync: deleteMutation } = useDeleteDocument();
  const [isModal, setIsModal] = useState<boolean>(false);
  const { showError, showSuccess } = useUI();

  const handleModalClose = (reload: boolean = false) => {
    if (reload === true) window.location.reload();
    setIsModal(false);
  };

  const handleDelete = async () => {
    try {
      await deleteMutation({ type: data.type, id: data.id });
      showSuccess();
      handleModalClose(true);
    } catch (err: any) {
      console.log(err.response?.data?.msg!);
      showError(handleServerError(err.response));
    }
  };

  return (
    <>
      <div className="btn-group" role="group" aria-label="Basic outlined example">
        {allowEditActionBtn(data.user.id, data) && (
          <button type="button" className="btn btn-outline-secondary" onClick={onClickEdit}>
            <i className="icofont-edit text-success" />
          </button>
        )}
        {allowDeleteActionBtn(data.user.id, data) && (
          <button type="button" className="btn btn-outline-secondary deleterow" onClick={() => setIsModal(true)}>
            <i className="icofont-close-circled text-danger"></i>
          </button>
        )}
      </div>
      <DeleteModal
        show={isModal}
        onClose={handleModalClose}
        onDelete={handleDelete}
        message="Are you sure you want to delete this Document?"
        modalHeader="Delete Document"
      />
    </>
  );
}

export default DocumentsTableActionBtn;

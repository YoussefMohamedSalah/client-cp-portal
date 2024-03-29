import { PettyCashRequest } from "types/Pc_request";
import { PurchaseOrderRequest } from "types/Po_request";
import { EmployeeRequest } from "types/Employee_request";
import { MaterialRequest } from "types/Material_request";
import { SiteRequest } from "types/Site_request";
import { Contract } from "types/Contract";
import { Invoice } from "types/Invoice";
import { allowDocumentsActionsBtns } from "utils/Helpers";
import { useReactToPrint } from "react-to-print";

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
  document: T;
  ref: any;
  onApprove: () => void;
  onReject: () => void;
}

function DocumentActions<
  T extends
    | PettyCashRequest
    | PurchaseOrderRequest
    | EmployeeRequest
    | MaterialRequest
    | SiteRequest
    | Contract
    | Invoice,
>({ onApprove, onReject, ref, document }: Props<T>) {
  const handlePrint = useReactToPrint({
    content: () => ref.current!,
  });

  if (!document || !document.id) return <></>;
  return (
    <div className="col-sm d-flex align-items-center justify-content-center gap-2 pt-2">
      {allowDocumentsActionsBtns(document) && (
        <button type="button" className="btn btn-success btn-md lift text-white" onClick={onApprove}>
          <i className="fa fa-check pe-1" /> Approve
        </button>
      )}
      {allowDocumentsActionsBtns(document) && (
        <button type="button" className="btn btn-danger btn-md lift text-white" onClick={onReject}>
          <i className="fa fa-close pe-1" /> Reject
        </button>
      )}
      <button type="button" className="btn btn-primary btn-md lift" onClick={handlePrint}>
        <i className="fa fa-print pe-1" /> Print
      </button>
    </div>
  );
}

export default DocumentActions;

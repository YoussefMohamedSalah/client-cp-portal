import DocumentsDetailsContent from "components/Common/DocumentDetailsContent";
import DocumentActions from "components/Print/DocumentActions";
import { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import { Contract } from "types/Contract";
import { DocumentFinances } from "types/DocumentFinances";
import { Invoice } from "types/Invoice";
import { MaterialRequest } from "types/Material_request";
import { PettyCashRequest } from "types/Pc_request";
import { PurchaseOrderRequest } from "types/Po_request";
import { SiteRequest } from "types/Site_request";

interface Props {
  onClose: any;
  isModal: any;
  modalHeader: string;
  modelData: any;
  documentFinances?: DocumentFinances;
  documentType: string;
  data?: any;
}

const DocumentPreviewModal = ({
  onClose,
  isModal,
  modelData,
  modalHeader,
  documentType,
  documentFinances,
  data,
}: Props) => {
  const componentRef = useRef<HTMLDivElement>(null);

  // Define the handlePrint function
  const handlePrint = useReactToPrint({
    content: () => componentRef.current!,
  });

  return (
    <Modal centered size="xl" show={isModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">{modalHeader}</Modal.Title>
        {/* Attach handlePrint function to the onClick event */}
        <button type="button" className="btn btn-primary btn-md lift ms-auto" onClick={handlePrint}>
          <i className="fa fa-print pe-1" /> Print
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="row g-3 py-1 pt-4" ref={componentRef}>
          {documentType === "po" && (
            <DocumentsDetailsContent<PurchaseOrderRequest>
              data={modelData}
              finances={documentFinances ? documentFinances : ({} as DocumentFinances)}
            />
          )}
          {documentType === "pc" && <DocumentsDetailsContent<PettyCashRequest> data={modelData} />}
          {documentType === "site" && <DocumentsDetailsContent<SiteRequest> data={modelData} />}
          {documentType === "material" && <DocumentsDetailsContent<MaterialRequest> data={modelData} />}
          {documentType === "contract" && (
            <DocumentsDetailsContent<Contract>
              data={modelData}
              finances={documentFinances ? documentFinances : ({} as DocumentFinances)}
            />
          )}
          {documentType === "invoice" && <DocumentsDetailsContent<Invoice> data={modelData} />}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DocumentPreviewModal;

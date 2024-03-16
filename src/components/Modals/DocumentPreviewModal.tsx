import DocumentsDetailsContent from "components/Common/DocumentDetailsContent";
import { Modal } from "react-bootstrap";
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
}

const DocumentPreviewModal = ({ onClose, isModal, modelData, modalHeader, documentType, documentFinances }: Props) => {
  return (
    <Modal centered size="xl" show={isModal} onHide={onClose} style={{ zIndex: 9999 }}>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">{modalHeader}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row g-3 py-1 pt-4">
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

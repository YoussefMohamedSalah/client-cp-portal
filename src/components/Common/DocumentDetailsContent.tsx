import { useEffect, useRef, useState } from "react";
import { handleServerError } from "utils/HandlingServerError";
import { useUI } from "contexts/UIContext";
import { PettyCashRequest } from "types/Pc_request";
import { PurchaseOrderRequest } from "types/Po_request";
import { EmployeeRequest } from "types/Employee_request";
import { MaterialRequest } from "types/Material_request";
import { SiteRequest } from "types/Site_request";
import { Contract } from "types/Contract";
import { Invoice } from "types/Invoice";
import { useAuth } from "contexts/AuthContext";
import ApproveDocumentModal from "components/Modals/ApproveDocumentModal";
import RejectDocumentModal from "components/Modals/RejectDocumentModal";
import DocumentHeader from "components/Print/DocumentHeader";
import { PAGES } from "constants/pages";
import {
  isContractType,
  isEmployeeRequestType,
  isInvoiceType,
  isMaterialType,
  isPettyCashType,
  isPurchaseOrderType,
  isSiteType,
} from "utils/CheckPropsType";
import DocumentMainInfoSec from "components/Print/DocumentMainInfoSec";
import { PrintInstallments, PrintMainInfoSec, PrintMaterials } from "types/Print";
import DocumentTable from "components/Print/DocumentTable";
import DocumentActions from "components/Print/DocumentActions";
import { useApproveDocument } from "api/Documents/approveDocument";
import { useRejectDocument } from "api/Documents/rejectDocument";
import { DocumentFinances } from "types/DocumentFinances";

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
  finances?: DocumentFinances;
}

function DocumentsDetailsContent<
  T extends
    | PettyCashRequest
    | PurchaseOrderRequest
    | EmployeeRequest
    | MaterialRequest
    | SiteRequest
    | Contract
    | Invoice,
>({ data }: Props<T>) {
  const [conditions, setConditions] = useState<string[]>([]);
  const [materials, setMaterials] = useState<PrintMaterials[]>([]);
  const [installments, setInstallments] = useState<PrintInstallments[]>([]);

  const [isRejectModal, setIsRejectModal] = useState<boolean>(false);
  const [isApproveModal, setIsApproveModal] = useState<boolean>(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const { mutateAsync: approveMutation } = useApproveDocument();
  const { mutateAsync: rejectMutation } = useRejectDocument();

  const { showError, showSuccess } = useUI();
  const { session } = useAuth();

  useEffect(() => {
    if (data) {
      checkIfDataHasItems();
      checkIfDataHasInstallments();
      checkIfDataHasConditions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleModalClose = (reload: boolean = false) => {
    if (reload === true) window.location.reload();
    setIsRejectModal(false);
    setIsApproveModal(false);
  };

  const handleOpenApproveModal = () => {
    setIsRejectModal(false);
    setIsApproveModal(true);
  };

  const handleOpenRejectModal = () => {
    setIsRejectModal(true);
    setIsApproveModal(false);
  };

  const handleApprove = async (note: string) => {
    try {
      await approveMutation({ type: data.type, id: data.id, note });
      showSuccess();
      window.location.reload();
    } catch (err: any) {
      console.log(err.response?.data?.msg!);
      showError(handleServerError(err.response));
    }
  };

  const handleReject = async (note: string) => {
    try {
      await rejectMutation({ type: data.type, id: data.id, note });
      showSuccess();
      window.location.reload();
    } catch (err: any) {
      console.log(err.response?.data?.msg!);
      showError(handleServerError(err.response));
    }
  };

  const handleQrCodeUrl = (): string => {
    let baseUrl = `${process.env.REACT_APP_PUBLIC_URL}`;
    if (data.id) {
      if (isPurchaseOrderType(data)) return `${baseUrl}/${PAGES.PO_REQUEST_INFO}/${data.id}`;
      else if (isPettyCashType(data)) return `${baseUrl}/${PAGES.PC_REQUEST_INFO}/${data.id}`;
      else if (isSiteType(data)) return `${baseUrl}/${PAGES.SITE_REQUEST_INFO}/${data.id}`;
      else if (isMaterialType(data)) return `${baseUrl}/${PAGES.MATERIAL_REQUEST_INFO}/${data.id}`;
      else if (isEmployeeRequestType(data)) return `${baseUrl}/${PAGES.EMPLOYEE_REQUEST_INFO}/${data.id}`;
      else if (isContractType(data)) return `${baseUrl}/${PAGES.CONTRACT_INFO}/${data.id}`;
      else if (isInvoiceType(data)) return `${baseUrl}/${PAGES.INVOICE_INFO}/${data.id}`;
      else return "";
    } else return "";
  };

  const handleMainInfoSecData = (): PrintMainInfoSec[] => {
    let baseDataObj = [
      { key: "Ref", value: data.code || "" },
      { key: "Date", value: data.date || "" },
      { key: "Project", value: `${!isEmployeeRequestType(data) ? data.project_details?.name! : ""}` },
      { key: "To", value: `${isPurchaseOrderType(data) ? data.supplier?.company_name! : ""}` },
      { key: "To", value: `${isContractType(data) ? data.subcontractor_details?.name! : ""}` },
      { key: "Subject", value: data.subject || "" },
      { key: "Description", value: data.description || "" },
    ];
    return baseDataObj;
  };

  const checkIfDataHasItems = () => {
    if (!isEmployeeRequestType(data) && !isSiteType(data)) setMaterials(data.items);
  };

  const checkIfDataHasInstallments = () => {
    if (isPurchaseOrderType(data)) setInstallments(data.installments);
  };

  const checkIfDataHasConditions = () => {
    if (isPurchaseOrderType(data) || isContractType(data)) setConditions(data.conditions);
  };

  return (
    <>
      <div ref={componentRef} className="row justify-content-center">
        <div className="col-lg-12 col-md-12">
          <div className="card p-xl-3 p-lg-2 p-0">
            <DocumentHeader logo={session?.company?.logo!} url={handleQrCodeUrl()} />
            <div className="card-body">
              <DocumentMainInfoSec mainInfo={handleMainInfoSecData()} />
              {conditions && conditions.length > 0 && (
                <div>
                  <h3>Conditions</h3>
                  <DocumentTable
                    tableHead={["#", "condition"]}
                    tableData={conditions}
                    renderRow={(rowData, index: number) => (
                      <tr>
                        <td className="text-start p-2">{index + 1} -</td>
                        <td className="text-start p-2">{rowData}</td>
                      </tr>
                    )}
                  />
                </div>
              )}
              {materials && materials.length > 0 && (
                <div>
                  <h3>Materials</h3>
                  <DocumentTable<PrintMaterials>
                    tableHead={[
                      "item",
                      "description",
                      "count",
                      "price",
                      "total",
                      "payed amount",
                      "payed percentage",
                      "prev count",
                      "current count",
                    ]}
                    tableData={materials}
                    renderRow={(rowData) => (
                      <>
                        <td className="text-start p-2">{rowData.item}</td>
                        <td className="text-start p-2">{rowData.description}</td>
                        <td className="text-start p-2">{rowData.count || 0}</td>
                        <td className="text-start p-2">{rowData.price || 0}</td>
                        <td className="text-start p-2">{rowData.total || 0}</td>
                        <td className="text-start p-2">{rowData.payed_amount || 0}</td>
                        <td className="text-start p-2">{rowData.payed_percentage || 0}</td>
                        <td className="text-start p-2">{rowData.prev_count || rowData.count}</td>
                        <td className="text-start p-2">{rowData.current_count || rowData.count}</td>
                      </>
                    )}
                  />
                </div>
              )}
              {installments && installments.length > 0 && (
                <div>
                  <h3>Installments</h3>
                  <DocumentTable<PrintInstallments>
                    tableHead={["name", "details", "date", "percentage", "value"]}
                    tableData={installments}
                    renderRow={(rowData) => (
                      <>
                        <td className="text-start p-2">{rowData.name}</td>
                        <td className="text-start p-2">{rowData.details}</td>
                        <td className="text-start p-2">{rowData.date}</td>
                        <td className="text-start p-2">{rowData.percentage}</td>
                        <td className="text-start p-2">{rowData.value}</td>
                      </>
                    )}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div></div>
        <DocumentActions<T>
          document={data}
          onApprove={handleOpenApproveModal}
          onReject={handleOpenRejectModal}
          ref={componentRef}
        />
      </div>
      <ApproveDocumentModal onClose={handleModalClose} handleApprove={handleApprove} show={isApproveModal} />
      <RejectDocumentModal onClose={handleModalClose} handleReject={handleReject} show={isRejectModal} />
    </>
  );
}

export default DocumentsDetailsContent;

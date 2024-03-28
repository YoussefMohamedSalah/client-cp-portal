import Loading from "components/UI/Loading";
import DocumentTable from "components/Common/DocumentTable";
import { Tab, Nav } from "react-bootstrap";
import PageHeader from "components/Common/PageHeader";
import { DOCUMENT_TYPE, STATUS } from "enums/enums";
import { useEffect, useState } from "react";
import WorkFlowStatusModal from "components/Modals/WorkFlowStatusModal";
import useColumnTable from "hooks/useColumnTable";
import { geFinanceDocuments } from "api/Finances/getFinanceDocuments";
import { useUI } from "contexts/UIContext";
import { handleServerError } from "utils/HandlingServerError";
import { Contract } from "types/Contract";
import { PettyCashRequest } from "types/Pc_request";
import { SiteRequest } from "types/Site_request";
import { MaterialRequest } from "types/Material_request";
import { PurchaseOrderRequest } from "types/Po_request";
import { Invoice } from "types/Invoice";
import { EmployeeRequest } from "types/Employee_request";


const FinanceApproval: React.FC = () => {
  const [selectedDocument, setSelectedDocument] = useState<any>({} as any);
  const [documentType, setDocumentType] = useState<string>(DOCUMENT_TYPE.PURCHASE_ORDER);
  const [documents, setDocuments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { showError } = useUI();

  useEffect(() => {
    if (documentType) {
      handleGetDocuments(documentType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentType]);

  const handleGetDocuments = async (type: string) => {
    try {
      setIsLoading(true);
      const documents = await geFinanceDocuments(type);
      if (documents) {
        setDocuments(documents.financeDocuments?.data! || []);
      }
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      showError(handleServerError(err.response));
    }
  };

  const handleOpen = (request: PurchaseOrderRequest) => {
    setSelectedDocument(request);
    setOpen(true);
  };

  const {
    purchaseOrderColumnT,
    pettyCashColumnT,
    siteColumnT,
    materialColumnT,
    employeesRequestsColumnT,
    contractColumnT,
    invoiceColumnT,
  } = useColumnTable(handleOpen);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="container-fluid">
        <Tab.Container id="left-tabs-example" defaultActiveKey="po">
          <div className="row clearfix g-3">
            <PageHeader
              headerTitle={"Finances | Control Center"}
              isBtnShow={false}
              renderRight={() => {
                return (
                  <Nav variant="pills" className="nav nav-tabs tab-body-header rounded invoice-set">
                    <Nav.Item>
                      <Nav.Link onClick={() => setDocumentType(DOCUMENT_TYPE.PURCHASE_ORDER)} eventKey="po">
                        PO
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link onClick={() => setDocumentType(DOCUMENT_TYPE.PETTY_CASH)} eventKey="pc">
                        PC
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link onClick={() => setDocumentType(DOCUMENT_TYPE.SITE)} eventKey="site">
                        SI
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link onClick={() => setDocumentType(DOCUMENT_TYPE.MATERIAL)} eventKey="material">
                        MR
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link onClick={() => setDocumentType(DOCUMENT_TYPE.EMPLOYEE)} eventKey="employee">
                        EMP
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link onClick={() => setDocumentType(DOCUMENT_TYPE.CONTRACT)} eventKey="contract">
                        CON
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link onClick={() => setDocumentType(DOCUMENT_TYPE.INVOICE)} eventKey="invoice">
                        INV
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                );
              }}
            />
          </div>
          <div className="test">
            <Tab.Content>
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  <Tab.Pane eventKey="po">
                    <DocumentTable<PurchaseOrderRequest>
                      title={"Purchase Order Requests"}
                      columns={purchaseOrderColumnT}
                      data={documents || []}
                      renderCards={true}
                      renderSearch={true}
                      renderDownload={true}
                      selectItem={(item: PurchaseOrderRequest) => setSelectedDocument(item)}
                      filterOptions={["name", "date", "code"]}
                      isFinanceApproval={true}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="pc">
                    <DocumentTable<PettyCashRequest>
                      title={"Petty cash Requests"}
                      columns={pettyCashColumnT}
                      data={documents || []}
                      renderCards={true}
                      renderSearch={true}
                      renderDownload={true}
                      selectItem={(item: PettyCashRequest) => setSelectedDocument(item)}
                      filterOptions={["name", "date", "code"]}
                      isFinanceApproval={true}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="site">
                    <DocumentTable<SiteRequest>
                      title={"Site Requests"}
                      columns={siteColumnT}
                      data={documents || []}
                      renderCards={true}
                      renderSearch={true}
                      renderDownload={true}
                      selectItem={(item: SiteRequest) => setSelectedDocument(item)}
                      filterOptions={["name", "date", "code"]}
                      isFinanceApproval={true}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="material">
                    <DocumentTable<MaterialRequest>
                      title={"Material Requests"}
                      columns={materialColumnT}
                      data={documents || []}
                      renderCards={true}
                      renderSearch={true}
                      renderDownload={true}
                      selectItem={(item: MaterialRequest) => setSelectedDocument(item)}
                      filterOptions={["name", "date", "code"]}
                      isFinanceApproval={true}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="employee">
                    <DocumentTable<EmployeeRequest>
                      title={"Employee Requests"}
                      columns={employeesRequestsColumnT}
                      data={documents || []}
                      renderCards={true}
                      renderSearch={true}
                      renderDownload={true}
                      selectItem={(item: EmployeeRequest) => setSelectedDocument(item)}
                      filterOptions={["name", "date", "code"]}
                      isFinanceApproval={true}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="contract">
                    <DocumentTable<Contract>
                      title={"Contracts"}
                      columns={contractColumnT}
                      data={documents || []}
                      renderCards={true}
                      renderSearch={true}
                      renderDownload={true}
                      filterOptions={["name", "date", "code"]}
                      isFinanceApproval={true}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="invoice">
                    <DocumentTable<Invoice>
                      title={"Payment Certificates"}
                      columns={invoiceColumnT}
                      data={documents || []}
                      renderCards={true}
                      renderSearch={true}
                      renderDownload={true}
                      selectItem={(item: Invoice) => setSelectedDocument(item)}
                      filterOptions={["name", "date", "code"]}
                      isFinanceApproval={true}
                    />
                  </Tab.Pane>
                </>
              )}
            </Tab.Content>
          </div>
        </Tab.Container>
      </div>
      {selectedDocument && selectedDocument?.status! !== STATUS.ARCHIVED && (
        <WorkFlowStatusModal<any> handleClose={handleClose} open={open} selectedDocument={selectedDocument} />
      )}
    </>
  );
};

export default FinanceApproval;

// <div className="container-fluid">
//   {/* page header */}
//   <PageHeader headerTitle={"Finance Approval"} />
//   {/* table data */}
//   <div className="test">
//     <DocumentTable<PurchaseOrderRequest>
//       title={"FinanceApproval"}
//       columns={purchaseOrderColumnT}
//       data={requests}
//       renderCards={true}
//       renderSearch={true}
//       renderDownload={true}
//       selectItem={(item: PurchaseOrderRequest) => setSelectedDocument(item)}
//       filterOptions={["name", "date", "code"]}
//       isFinanceApproval={true}
//     />
//   </div>
// </div>
// {selectedDocument && selectedDocument.status !== STATUS.ARCHIVED && (
//   <WorkFlowStatusModal<PurchaseOrderRequest>
//     handleClose={handleClose}
//     open={open}
//     selectedDocument={selectedDocument}
//   />
// )}
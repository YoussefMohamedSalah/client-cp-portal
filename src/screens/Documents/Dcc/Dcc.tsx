// import { lazy } from "react";
import { Tab, Nav } from "react-bootstrap";
import PageHeader from "components/Common/PageHeader";
import DocumentTable from "components/Common/DocumentTable";
import useColumnTable from "hooks/useColumnTable";
import { useState, useEffect } from "react";
// ---
import { Contract } from "types/Contract";
import { PettyCashRequest } from "types/Pc_request";
import { SiteRequest } from "types/Site_request";
import { MaterialRequest } from "types/Material_request";
import { PurchaseOrderRequest } from "types/Po_request";
import { Invoice } from "types/Invoice";
import { EmployeeRequest } from "types/Employee_request";
import Loading from "components/UI/Loading";
import WorkFlowStatusModal from "components/Modals/WorkFlowStatusModal";
import { STATUS } from "enums/enums";
import { useUI } from "contexts/UIContext";
import { handleServerError } from "utils/HandlingServerError";
import { getAllContracts } from "api/Documents/Contracts/getAllContracts";
import { geDccDocuments } from "api/Dcc/getDccDocuments";

// const DccPo = lazy(() => import("./DccPo"));
// const DccPc = lazy(() => import("./DccPc"));
// const DccSite = lazy(() => import("./DccSite"));
// const DccMaterial = lazy(() => import("./DccMaterial"));
// const DccPageHeader = lazy(() => import("../../components/Dcc/DccPageHeader"));

const Dcc: React.FC = () => {
	const [selectedDocument, setSelectedDocument] = useState<any>({} as any);
	const [documentType, setDocumentType] = useState<string>("")
	const [documents, setDocuments] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);

	const { showError } = useUI();

	useEffect(() => {
		if (documentType) {
			handleGetDocuments()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [documentType]);

	const handleOpen = (request: Contract) => {
		setSelectedDocument(request);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleGetDocuments = async () => {
		try {
			const documents = await geDccDocuments(documentType);
			if (documents) {
				setDocuments(documents.dccDocuments?.data! || [])
			}
		} catch (err: any) {
			showError(handleServerError(err.response));
		}
	}

	const {
		purchaseOrderColumnT,
		pettyCashColumnT,
		siteColumnT,
		materialColumnT,
		employeesRequestsColumnT,
		contractColumnT,
		invoiceColumnT,
	} = useColumnTable(handleOpen);

	if (isLoading) return <Loading />
	return (
		<>
			<div className="container-fluid">
				<Tab.Container id="left-tabs-example" defaultActiveKey="po">
					<div className="row clearfix g-3">
						<PageHeader
							headerTitle={"DCC | Documents Control Center"}
							isBtnShow={false}
							renderRight={() => {
								return (
									<Nav
										variant="pills"
										className="nav nav-tabs tab-body-header rounded invoice-set"
									>
										<Nav.Item>
											<Nav.Link eventKey="po">Po R.</Nav.Link>
										</Nav.Item>
										<Nav.Item>
											<Nav.Link eventKey="pc">Pc R.</Nav.Link>
										</Nav.Item>
										<Nav.Item>
											<Nav.Link eventKey="site">Site R.</Nav.Link>
										</Nav.Item>
										<Nav.Item>
											<Nav.Link eventKey="material">Material R.</Nav.Link>
										</Nav.Item>
										<Nav.Item>
											<Nav.Link eventKey="employee">Employee R.</Nav.Link>
										</Nav.Item>
										<Nav.Item>
											<Nav.Link eventKey="contract">Contract R.</Nav.Link>
										</Nav.Item>
										<Nav.Item>
											<Nav.Link eventKey="invoice">Invoice R.</Nav.Link>
										</Nav.Item>
									</Nav>
								);
							}}
						/>
					</div>
					<div className="row g-3 py-1 pb-4">
						<Tab.Content>
							<Tab.Pane eventKey="po">
								<DocumentTable<PurchaseOrderRequest>
									title={"Purchase Order Requests"}
									columns={purchaseOrderColumnT}
									data={[]}
									renderCards={true}
									renderSearch={true}
									renderDownload={true}
									selectItem={(item: PurchaseOrderRequest) => setSelectedDocument(item)}
									filterOptions={["name", "date", "code"]}
								/>
							</Tab.Pane>
							<Tab.Pane eventKey="pc">
								<DocumentTable<PettyCashRequest>
									title={"Petty cash Requests"}
									columns={pettyCashColumnT}
									data={[]}
									renderCards={true}
									renderSearch={true}
									renderDownload={true}
									selectItem={(item: PettyCashRequest) => setSelectedDocument(item)}
									filterOptions={["name", "date", "code"]}
								/>
							</Tab.Pane>
							<Tab.Pane eventKey="site">
								<DocumentTable<SiteRequest>
									title={"Site Requests"}
									columns={siteColumnT}
									data={[]}
									renderCards={true}
									renderSearch={true}
									renderDownload={true}
									selectItem={(item: SiteRequest) => setSelectedDocument(item)}
									filterOptions={["name", "date", "code"]}
								/>
							</Tab.Pane>
							<Tab.Pane eventKey="material">
								<DocumentTable<MaterialRequest>
									title={"Material Requests"}
									columns={materialColumnT}
									data={[]}
									renderCards={true}
									renderSearch={true}
									renderDownload={true}
									selectItem={(item: MaterialRequest) => setSelectedDocument(item)}
									filterOptions={["name", "date", "code"]}
								/>
							</Tab.Pane>
							<Tab.Pane eventKey="employee">
								<DocumentTable<EmployeeRequest>
									title={"Employee Requests"}
									columns={employeesRequestsColumnT}
									data={[]}
									renderCards={true}
									renderSearch={true}
									renderDownload={true}
									selectItem={(item: EmployeeRequest) => setSelectedDocument(item)}
									filterOptions={["name", "date", "code"]}
								/>
							</Tab.Pane>
							<Tab.Pane eventKey="contract">
								<DocumentTable<Contract>
									title={"Contracts"}
									columns={contractColumnT}
									data={[]}
									renderCards={true}
									renderSearch={true}
									renderDownload={true}
									filterOptions={["name", "date", "code"]}
								/>
							</Tab.Pane>
							<Tab.Pane eventKey="invoice">
								<DocumentTable<Invoice>
									title={"Payment Certificates"}
									columns={invoiceColumnT}
									data={[]}
									renderCards={true}
									renderSearch={true}
									renderDownload={true}
									selectItem={(item: Invoice) => setSelectedDocument(item)}
									filterOptions={["name", "date", "code"]}
								/>
							</Tab.Pane>
						</Tab.Content>
					</div>
				</Tab.Container>
			</div>
			{selectedDocument && selectedDocument.status !== STATUS.ARCHIVED && (
				<WorkFlowStatusModal<any>
					handleClose={handleClose}
					open={open}
					selectedDocument={selectedDocument}
				/>
			)}
		</>
	);
};

export default Dcc;

import { useEffect, useRef, useState } from "react";
import { handleServerError } from "utils/HandlingServerError";
import { useUI } from "contexts/UIContext";
import { useReactToPrint } from 'react-to-print';
import { PettyCashRequest } from "types/Pc_request";
import { PurchaseOrderRequest } from "types/Po_request";
import { EmployeeRequest } from "types/Employee_request";
import { MaterialRequest } from "types/Material_request";
import { SiteRequest } from "types/Site_request";
import { Contract } from 'types/Contract';
import { Invoice } from "types/Invoice";
import { useAuth } from "contexts/AuthContext";
import ApproveDocumentModal from "components/Modals/ApproveDocumentModal";
import RejectDocumentModal from "components/Modals/RejectDocumentModal";
import DocumentHeader from "components/Print/DocumentHeader";
import { PAGES } from "constants/pages";
import { isContractType, isEmployeeType, isInvoiceType, isMaterialType, isPettyCashType, isPurchaseOrderType, isSiteType } from "utils/CheckPropsType";
import DocumentMainInfoSec from "components/Print/DocumentMainInfoSec";
import { PrintInstallments, PrintMainInfoSec, PrintMaterials } from "types/Print";
import DocumentTable from "components/Print/DocumentTable";
import DocumentActions from "components/Print/DocumentActions";
import { useApproveDocument } from "api/Documents/approveDocument";
import { useRejectDocument } from "api/Documents/rejectDocument";

interface Props<T extends PettyCashRequest | PurchaseOrderRequest | EmployeeRequest | MaterialRequest | SiteRequest | Contract | Invoice> {
	data: T;
};

function DocumentsDetailsContent<T extends PettyCashRequest | PurchaseOrderRequest | EmployeeRequest | MaterialRequest | SiteRequest | Contract | Invoice>({ data }: Props<T>) {
	const [isRejectModal, setIsRejectModal] = useState<boolean>(false);
	const [isApproveModal, setIsApproveModal] = useState<boolean>(false);
	const componentRef = useRef<HTMLDivElement>(null);

	const { mutateAsync: approveMutation } = useApproveDocument();
	const { mutateAsync: rejectMutation } = useRejectDocument();

	const { showError, showSuccess } = useUI();
	const { session } = useAuth();

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
			// handleCloseSubModal();
			window.location.reload();
		} catch (err: any) {
			console.log(err.response?.data?.msg!)
			showError(handleServerError(err.response));
		}
	};

	const handleReject = async (note: string) => {
		try {
			await rejectMutation({ type: data.type, id: data.id, note });
			showSuccess();
			// handleCloseSubModal();
			window.location.reload();
		} catch (err: any) {
			console.log(err.response?.data?.msg!)
			showError(handleServerError(err.response));
		}
	};

	const handlePrint = useReactToPrint({
		content: () => componentRef.current!,
	});

	const handleQrCodeUrl = (): string => {
		let baseUrl = `${process.env.REACT_APP_PUBLIC_URL}`;
		if (data.id) {
			if (isPurchaseOrderType(data)) return `${baseUrl}/${PAGES.PO_REQUEST}/${data.id}`;
			else if (isPettyCashType(data)) return `${baseUrl}/${PAGES.PC_REQUEST}/${data.id}`;
			else if (isSiteType(data)) return `${baseUrl}/${PAGES.SITE_REQUEST}/${data.id}`;
			else if (isMaterialType(data)) return `${baseUrl}/${PAGES.MATERIAL_REQUEST}/${data.id}`;
			else if (isEmployeeType(data)) return `${baseUrl}/${PAGES.EMPLOYEE_REQUEST}/${data.id}`;
			else if (isContractType(data)) return `${baseUrl}/${PAGES.CONTRACT}/${data.id}`;
			else if (isInvoiceType(data)) return `${baseUrl}/${PAGES.INVOICE}/${data.id}`;
			else return '';
		}
		else return ''
	};

	const handleMainInfoSecData = (): PrintMainInfoSec[] => {
		let baseDataObj = [
			{ key: "Ref", value: data.code || '' },
			{ key: "Date", value: data.date || '' },
			{ key: "Project", value: `${!isEmployeeType(data) ? data.project_details?.name! : ""}` },
			{ key: "To", value: `${isPurchaseOrderType(data) ? data.supplier?.company_name! : ""}` },
			{ key: "To", value: `${isContractType(data) ? data.subcontractor_details?.name! : ""}` },
			{ key: "Subject", value: data.subject || '' },
			{ key: "Description", value: data.description || '' },
		];
		return baseDataObj;
	};

	let conditions: string[] = [];
	let materials: PrintMaterials[] = [];
	let installments: PrintInstallments[] = [];

	const checkIfDataHasTableInfo = () => {
		if (!isEmployeeType(data) && !isSiteType(data)) materials = data.items;
		if (isPurchaseOrderType(data)) installments = data.installments;
		if (isPurchaseOrderType(data) || isContractType(data)) conditions = data.conditions;
	};


	useEffect(() => {
		if (data) {
			checkIfDataHasTableInfo()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data])


	return (
		<>
			<div ref={componentRef}>
				<DocumentHeader logo={session?.company?.logo!} url={handleQrCodeUrl()} />
				<DocumentMainInfoSec mainInfo={handleMainInfoSecData()} />
				<div>
					{conditions && conditions.length > 0 && (
						<>
							<h2>Conditions</h2>
							<DocumentTable tableData={conditions} renderRow={(rowData) => (
								<tr>
									<td>{rowData}</td>
								</tr>
							)} />
						</>
					)}

					{materials && materials.length > 0 && (
						<>
							<h2>Materials</h2>
							<DocumentTable<PrintMaterials> tableData={materials} renderRow={(rowData) => (
								<tr>
									<td>{rowData.item}</td>
									<td>{rowData.description}</td>
									{/* Render other material properties */}
								</tr>
							)} />
						</>
					)}

					{installments && installments.length > 0 && (
						<>
							<h2>Installments</h2>
							<DocumentTable<PrintInstallments> tableData={installments} renderRow={(rowData) => (
								<tr>
									<td>{rowData.name}</td>
									<td>{rowData.percentage}</td>
									{/* Render other installment properties */}
								</tr>
							)} />
						</>
					)}
				</div>
				<DocumentActions<T> document={data} onApprove={handleOpenApproveModal} onReject={handleOpenRejectModal} onPrint={handlePrint} />
			</div>
			<ApproveDocumentModal onClose={handleModalClose} handleApprove={handleApprove} show={isApproveModal} />
			<RejectDocumentModal onClose={handleModalClose} handleReject={handleReject} show={isRejectModal} />
		</>
	);
};

export default DocumentsDetailsContent;

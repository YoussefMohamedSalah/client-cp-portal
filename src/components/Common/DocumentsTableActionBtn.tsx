import { useState } from "react";
import { handleServerError } from "@/utils/HandlingServerError";
import { useUI } from "@/contexts/UIContext";
import DeleteModal from "@/components/Modals/DeleteModal";
import useApp from "@/hooks/useApp";
import { allowEditActionBtn, allowDeleteActionBtn } from "@/utils/ActionsGuards";
import { useDeleteRequest } from "@/api/Documents/deleteRequest";
import { PAGES } from "@/constants/pages";
import PettyCashRequest from '@/types/Pc_request';
import PurchaseOrderRequest from "@/types/Po_request";
import EmployeeRequest from "@/types/Employee_request";
import MaterialRequest from "@/types/Material_request";
import SiteRequest from "@/types/Site_request";
import { Contract } from '@/types/Contract';
import Invoice from '@/types/Invoice';

interface Props<T extends PettyCashRequest | PurchaseOrderRequest | EmployeeRequest | MaterialRequest | SiteRequest | Contract | Invoice> {
	data: T;
};

function DocumentsTableActionBtn<T extends PettyCashRequest | PurchaseOrderRequest | EmployeeRequest | MaterialRequest | SiteRequest | Contract | Invoice>({ data }: Props<T>) {
	const { mutateAsync: deleteMutation } = useDeleteRequest();
	const [isModal, setIsModal] = useState<boolean>(false);
	const { showError, showSuccess } = useUI();
	const { push } = useApp();

	const handleModalClose = (reload: boolean = false) => {
		if (reload === true) window.location.reload();
		setIsModal(false)
	};

	const handleDelete = async () => {
		try {
			await deleteMutation({ type: data.type, id: data.id });
			showSuccess();
			handleModalClose(true)
		} catch (err: any) {
			console.log(err.response?.data?.msg!)
			showError(handleServerError(err.response));
		}
	};

	return (
		<>
			<div className="btn-group" role="group" aria-label="Basic outlined example">
				{allowEditActionBtn(data.user.id, data) && (
					<button type="button" className="btn btn-outline-secondary" onClick={() => push('/' + PAGES.EDIT_PC_REQUEST + '/' + data.id)}>
						<i className="icofont-edit text-success" /></button>
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
				message="Are you sure you want to delete this Pc Request?"
				modalHeader="Delete Pc Request"
			/>
		</>
	);
};

export default DocumentsTableActionBtn;

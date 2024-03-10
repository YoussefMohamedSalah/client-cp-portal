import { Nav, Tab } from "react-bootstrap";
import Attachment from "components/Common/Attachment";
import Button from "components/UI/Button";
import { downloadEmployeesCsv } from "api/Clx/DownloadEmployeesClxFile";
import {
	employeesCsvAttachmentInput,
	useUploadEmployeesCsvAttachment
} from "api/Clx/UploadEmployeesClxFile";
import { useUI } from "contexts/UIContext";
import { handleServerError } from "utils/HandlingServerError";
import { useState } from "react";

interface TabDataType {
	key: string;
	tabKey: string;
	tabName: string;
}

const DataImportingSettings = () => {
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
	const { mutateAsync: uploadCsvFileMutation } = useUploadEmployeesCsvAttachment();
	const { showError, showSuccess } = useUI();

	const tabsData: TabDataType[] = [
		{
			key: "employees",
			tabName: "Employees",
			tabKey: "employees"
		},
	];

	const handleDownload = async () => {
		try {
			const response = await downloadEmployeesCsv({});
			// Create a URL for the blob
			const url = window.URL.createObjectURL(new Blob([response?.data?.data!]));
			// Create a temporary <a> element to initiate the download
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'employees_data.csv'); // Set the filename for download
			document.body.appendChild(link);
			link.click();
			// Clean up
			link.parentNode?.removeChild(link);
			window.URL.revokeObjectURL(url);
		} catch (error) {
			console.error('Error downloading file:', error);
		}
	};


	const handleUpload = async (file: File) => {
		if (!file) return;
		setIsSubmitting(true)
		try {
			let inputData = employeesCsvAttachmentInput({
				file
			});
			await uploadCsvFileMutation(inputData);
			setIsSubmitting(false)
			showSuccess();
			window.location.reload();
		} catch (err: any) {
			setIsSubmitting(false)
			console.log(err.response?.data?.msg!)
			showError(handleServerError(err.response));
		}
	};

	return (
		<div className="container-xxl">
			<Tab.Container id="left-tabs-example" defaultActiveKey="employee">
				<div className="row">
					<div className="d-flex justify-content-center align-items-center">
						<Nav variant="pills" className="nav nav-tabs tab-body-header rounded invoice-set">
							{tabsData?.map((tab, index: number) => {
								return (
									<Nav.Item key={index}>
										<Nav.Link eventKey={tab.key}>{tab.tabName}</Nav.Link>
									</Nav.Item>
								);
							})}
						</Nav>
					</div>
				</div>
				<div className="row justify-content-center">
					<div className="col-lg-12 col-md-12">
						<Tab.Content>
							{tabsData?.map((tab) => {
								return (
									<Tab.Pane key={tab.key} eventKey={tab.key}>
										<div className="row g-3 pt-3">
											<div className="col-md-6 col-lg-6 col-xl-12">
												<div className="card">
													<div className="card-body">
														<div className=" d-flex align-content-center-center justify-content-between">
															<h5 className="card-title text-primary"><strong>Employees Data</strong></h5>
															<Button className="lift" content="Download Employee Template" onClick={handleDownload} />
														</div>
														<Attachment onUploadFile={handleUpload} isSubmitting={isSubmitting} />
													</div>
												</div>
											</div>
										</div>
									</Tab.Pane>
								);
							})}
						</Tab.Content>
					</div>
				</div>
			</Tab.Container>
		</div>
	);
};

export default DataImportingSettings;

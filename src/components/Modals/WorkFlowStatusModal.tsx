import { Modal } from "react-bootstrap";
import "./workFlow.css";
import { useState } from "react";
import TimeLineModal from "./TimeLineModal";
import { PettyCashRequest } from "types/Pc_request";
import { PurchaseOrderRequest } from "types/Po_request";
import { EmployeeRequest } from "types/Employee_request";
import { MaterialRequest } from "types/Material_request";
import { SiteRequest } from "types/Site_request";
import { Contract } from 'types/Contract';
import { Invoice } from "types/Invoice";

interface Props<T extends PettyCashRequest | PurchaseOrderRequest | EmployeeRequest | MaterialRequest | SiteRequest | Contract | Invoice> {
	open: boolean;
	handleClose: () => void;
	selectedDocument: T;
};

function WorkFlowStatusModal<T extends PettyCashRequest | PurchaseOrderRequest | EmployeeRequest | MaterialRequest | SiteRequest | Contract | Invoice>({
	open,
	handleClose,
	selectedDocument
}: Props<T>) {
	const [timeLineModal, setTimeLineModal] = useState<boolean>(false);
	return (
		<>
			<Modal centered show={open} size="xl" onHide={handleClose}>
				<Modal.Body>
					<div className="container position-relative">
						<div className="row text-center justify-content-center mb-5">
							<div className="col-xl-6 col-lg-8">
								<h2 className="font-weight-bold">Approval Work Flow</h2>
								<span
									className="position-absolute pointer"
									onClick={() => setTimeLineModal(true)}
									style={{ top: "0rem", right: "0rem" }}
								>
									<h2 className="font-weight-bold">
										<i className="icofont-clock-time" />
									</h2>
								</span>
								<p className="text-muted">
									Track your requests in real time,<br />
									Note: Request Is Approved only if all points is in{" "}
									<span style={{ color: "green" }}>Green</span> Color.<br />
									<div className="d-flex align-items-center justify-content-center gap-4 ">
										<div className="d-flex align-items-center justify-content-center gap-2">
											<div className="inner-circle-info pending " /> pending
										</div>
										<div className="d-flex align-items-center justify-content-center gap-2">
											<div className="inner-circle-info rejected" /> Rejected
										</div>
										<div className="d-flex align-items-center justify-content-center gap-2">
											<div className="inner-circle-info accepted" /> Accepted
										</div>
									</div>
								</p>
							</div>
						</div>

						<div className="row">
							<div className="col">
								<div
									className="timeline-steps aos-init aos-animate"
									data-aos="fade-up"
								>
									{selectedDocument?.work_flow! &&
										selectedDocument?.work_flow?.length! > 0 &&
										selectedDocument?.work_flow?.map((workFlow, index: number) => {
											return (
												<div className="timeline-step" key={index}>
													<div
														className="timeline-content"
														data-original-title={`${workFlow.title}`}
													>
														<div
															className={`inner-circle  ${workFlow.state ===
																false && workFlow.isRejected === false
																? "pending"
																: `${workFlow.isRejected === true
																	? "rejected"
																	: "accepted"}`} `}
														/>
														<p className="h6 mt-3 mb-1">
															{workFlow.title}
														</p>
														<p className="h6 text-muted mb-0 mb-lg-0">
															{workFlow.name}
														</p>
													</div>
												</div>
											);
										})}
								</div>
							</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>
			{/* TimeLine Modal */}
			<TimeLineModal
				open={timeLineModal}
				handleClose={() => setTimeLineModal(false)}
				timeLine={selectedDocument?.timeline! || []}
			/>
		</>
	);
};

export default WorkFlowStatusModal;
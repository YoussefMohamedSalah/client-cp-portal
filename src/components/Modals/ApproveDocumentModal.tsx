import React, { useState } from "react";
import { Modal } from "react-bootstrap";

interface Props {
	onClose: () => void;
	handleApprove: (note: string) => void;
	show: boolean;
	type?: string;
};

const ApproveDocumentModal = ({ onClose, handleApprove, show, type }: Props) => {
	const [note, setNote] = useState<string>("");

	return (
		<Modal centered show={show} size="lg" onHide={onClose}>
			<Modal.Body>
				<div className="container">
					<div className="row text-center justify-content-center mb-3">
						<div className="col-xl-12 col-lg-8">
							<h4 className="font-weight-bold">
								Are you sure you want to{" "}
								<span style={{ color: "#4DCA88" }}>Approve</span> This{" "}
								{type ? type : "Request"} ?
							</h4>
							<p className="text-muted">
								Note: You will Not be able to reverse this action
							</p>
						</div>
					</div>
					<div className="w-100 pb-3">
						<label
							htmlFor="exampleFormControlInput733"
							className="form-label d-none d-md-block"
						>
							Approval Note
						</label>
						<textarea
							className="form-control"
							id="exampleFormControlTextarea1"
							rows={2}
							value={note}
							placeholder="Approval note if exists"
							onChange={e => setNote(e.target.value)}
						/>
					</div>{" "}
					<div className="d-flex justify-content-center align-items-center gap-2">
						<button
							type="button"
							className="btn btn-success text-white"
							onClick={() => handleApprove(note)}
						>
							Approve
						</button>
						<button
							type="button"
							className="btn btn-primary"
							onClick={onClose}
						>
							Cancel
						</button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default ApproveDocumentModal;

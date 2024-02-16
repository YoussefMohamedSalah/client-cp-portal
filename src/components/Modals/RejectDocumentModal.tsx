import React, { useState } from "react";
import { Modal } from "react-bootstrap";

interface Props {
  onClose: () => void;
  handleReject: (note: string) => void;
  show: boolean;
  type?: string;
}

const RejectDocumentModal = ({ onClose, handleReject, show, type }: Props) => {
  const [note, setNote] = useState<string>("");

  return (
    <Modal centered show={show} size="lg" onHide={onClose}>
      <Modal.Body>
        <div className="container">
          <div className="row text-center justify-content-center mb-2">
            <div className="col-xl-12 col-lg-8">
              <h3 className="font-weight-bold">
                Are you sure you want to <span style={{ color: "#FC5A69" }}>Reject</span> This {type ? type : "Request"}{" "}
                ?
              </h3>
              <p className="text-muted">Note: You will Not be able to reverse this action</p>
            </div>
          </div>
          <div className="w-100 pb-3">
            <label htmlFor="exampleFormControlInput733" className="form-label d-none d-md-block">
              Rejection Reason
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={2}
              value={note}
              placeholder="Rejection Reason if exists"
              onChange={(e) => setNote(e.target.value)}
            />
          </div>{" "}
          <div className="d-flex justify-content-center align-items-center gap-2">
            <button type="button" className="btn btn-danger text-white " onClick={() => handleReject(note)}>
              Reject
            </button>
            <button type="button" className="btn btn-primary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RejectDocumentModal;

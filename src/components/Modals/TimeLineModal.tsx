import * as React from "react";
import { STATUS } from "enums/enums";
import { Modal } from "react-bootstrap";
import { formatDate, formatHours } from "utils/DateUtils";
import "./timeLine.css";
import "./workFlow.css";

interface Props {
  handleClose: () => void;
  open: boolean;
  timeLine: any[];
}

const TimeLineModal: React.FC<Props> = ({ handleClose, open, timeLine }) => {
  return (
    <>
      <Modal centered show={open} size="lg" onHide={handleClose}>
        <Modal.Body>
          <div className="row d-flex justify-content-center">
            <div>
              <div className="main-card card">
                <div className="card-body">
                  <h5 className="card-title">Request Timeline</h5>
                  <div className="vertical-timeline vertical-timeline--animate vertical-timeline--one-column">
                    {timeLine?.map((step: any, index: number) => {
                      let isApproval: boolean = step.status === STATUS.APPROVED;
                      let isEditAction: boolean = step.status !== STATUS.APPROVED && step.status !== STATUS.REJECTED;
                      return (
                        <div key={index} className="vertical-timeline-item vertical-timeline-element">
                          <div>
                            <span className="vertical-timeline-element-icon bounce-in">
                              <i className="badge badge-dot badge-dot-xl badge-warning"> </i>
                            </span>
                            <div className="vertical-timeline-element-content bounce-in">
                              <p className="p-0 m-0 text-muted">
                                <span className="fw-bold">Date : </span> {formatDate(step.date)} &nbsp;&nbsp;&nbsp;{" "}
                                <span className="fw-bold">At : </span> {formatHours(step.date)}
                              </p>
                              <h4
                                className={`timeline-title  ${isEditAction ? "" : `${isApproval ? "text-success" : "text-danger"}`} `}>
                                {step.status} By {step.name}
                              </h4>
                              <p>
                                {!isEditAction && (
                                  <span className="fw-bold">
                                    {" "}
                                    {isApproval ? "Approval Note: " : "Rejection Reason: "}{" "}
                                  </span>
                                )}
                                {step.content}
                              </p>
                              <span className="vertical-timeline-element-date">
                                <div
                                  style={{
                                    content: "",
                                    display: "inline-block",
                                    height: "3rem",
                                    width: "3rem",
                                    minWidth: "3rem",
                                    borderRadius: "6.25rem",
                                    opacity: "0.5",
                                  }}
                                  className={`inner-circle ${
                                    isEditAction ? "pending" : `${isApproval ? "accepted" : "rejected"}`
                                  } `}
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TimeLineModal;

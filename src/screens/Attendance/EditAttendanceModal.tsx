import React from "react";
import { Modal } from "react-bootstrap";

interface Props {
  show: boolean;
  onClose: () => void;
  onEdit: () => void;
  handleModelData: (key: string, value: string) => void;
  employees: any[];
}

const EditAttendanceModal: React.FC<Props> = ({ employees, show, onClose, handleModelData, onEdit }) => {

  const attendanceOptions = [
    {
      label: "Select Attendance Type",
      value: '',
    },
    {
      label: "Full Day Present",
      value: "Full Day Present",
    },
    {
      label: "Half Day Present",
      value: "Half Day Present",
    },
    {
      label: "Full Day Absence",
      value: "Full Day Absence",
    },
  ]

  return (
    <Modal centered show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Edit Attendance</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label className="form-label">Select Employee</label>
          <select
            className="form-select"
            name="value"
            onChange={(e) => handleModelData('employee', e.target.value)}
          >
            {employees?.map((option: any, i: number) => {
              return (
                <option key={"key" + i} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="deadline-form">
          <form>
            <div className="row g-3 mb-3">
              <div className="col-sm-12">
                <label htmlFor="datePicker" className="form-label">
                  Select Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="datePicker"
                  onChange={(e) => handleModelData('date', e.target.value)}
                />
              </div>
              <div className="col-sm-12">
                <label className="form-label">Attendance Type</label>
                <select
                  className="form-select"
                  name="value"
                  onChange={(e) => handleModelData('attendance_type', e.target.value)}
                >
                  {attendanceOptions?.map((option: any, i: number) => {
                    return (
                      <option key={"key" + i} value={option.value}>
                        {option.label}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </form>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea78d" className="form-label">
            Edit Reason
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea78d"
            rows={3}
            onChange={(e) => handleModelData('reason', e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-primary" onClick={onClose}>
          close
        </button>
        <button type="button" className="btn btn-primary" onClick={onEdit}>
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditAttendanceModal;

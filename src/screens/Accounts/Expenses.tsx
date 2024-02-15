import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { ExpensesData } from "components/Data/AppData";
import PageHeader from "components/Common/PageHeader";

interface Props {}
let columnsT: any[] = [];

interface IState {
  isModal: boolean;
  isEditModalData: any;
}

const INITIAlIZE_DATA: IState = {
  isModal: false,
  isEditModalData: "",
};

const Expenses: React.FC<Props> = () => {
  const [state, setState] = React.useState<IState>(INITIAlIZE_DATA);
  useEffect(() => {
    columnsT = [
      {
        name: "EXP ID",
        selector: (row: any) => row.expId,
        sortable: true,
      },
      {
        name: "ITEM",
        selector: (row: any) => row.item,
        sortable: true,
      },
      {
        name: "ORDER BY",
        selector: () => {},
        sortable: true,
        cell: (row: any) => (
          <>
            <img className="avatar rounded-circle" src={row.image} alt=""></img>
            <span className="fw-bold ms-1">{row.orderby}</span>
          </>
        ),
      },
      {
        name: "DATE",
        selector: (row: any) => row.date,
        sortable: true,
      },
      {
        name: "FROM",
        selector: (row: any) => row.from,
        sortable: true,
      },
      {
        name: "STATUS",
        selector: () => {},
        sortable: true,
        cell: (row: any) => (
          <span
            className={`badge ${
              row.status === "Completed"
                ? "bg-success"
                : row.status === "Draf"
                ? "bg-lavender-purple"
                : "bg-warning"
            }`}
          >
            {row.status}
          </span>
        ),
      },
      {
        name: "ACTION",
        selector: () => {},
        sortable: true,
        cell: (row: any) => (
          <div
            className="btn-group"
            role="group"
            aria-label="Basic outlined example"
          >
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() =>
                setState({ ...state, isModal: true, isEditModalData: row })
              }
            >
              <i className="icofont-edit text-success"></i>
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary deleterow"
            >
              <i className="icofont-ui-delete text-danger"></i>
            </button>
          </div>
        ),
      },
    ];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-xxl">
      <PageHeader
        headerTitle="Expenses"
        renderRight={() => {
          return (
            <div className="col-auto d-flex w-sm-100">
              <button
                className="btn btn-primary btn-set-task w-sm-100"
                onClick={() => {
                  setState({ ...state, isModal: true });
                }}
              >
                <i className="icofont-plus-circle me-2 fs-6"></i>Add Expenses
              </button>
            </div>
          );
        }}
      />
      <div className="row clearfix g-3">
        <div className="col-sm-12">
          <DataTable
            title={ExpensesData.title}
            columns={columnsT}
            data={ExpensesData.rows}
            defaultSortFieldId="title"
            pagination
            selectableRows={false}
            className="table myDataTable table-hover align-middle mb-0 d-row nowrap dataTable no-footer dtr-inline"
            highlightOnHover={true}
          />
        </div>
      </div>
      <Modal
        centered
        show={state.isModal}
        onHide={() => {
          setState({ ...state, isModal: false, isEditModalData: "" });
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">
            {state.isEditModalData ? "Edit" : "Add"} Expenses
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="item" className="form-label">
              Item
            </label>
            <input
              type="text"
              className="form-control"
              id="item"
              onClick={() => {}}
              value={state.isEditModalData ? state.isEditModalData.item : ""}
            />
          </div>
          <div className="deadline-form">
            <form>
              <div className="row g-3 mb-3">
                <div className="col-sm-6">
                  <label htmlFor="depone" className="form-label">
                    Order By
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="depone"
                    onClick={() => {}}
                    value={
                      state.isEditModalData ? state.isEditModalData.orderby : ""
                    }
                  />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="abc" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="abc"
                    onClick={() => {}}
                    value={
                      state.isEditModalData ? state.isEditModalData.date : ""
                    }
                  />
                </div>
              </div>
              <div className="row g-3 mb-3">
                <div className="col-sm-6">
                  <label htmlFor="deptwo" className="form-label">
                    From
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="deptwo"
                    onClick={() => {}}
                    value={
                      state.isEditModalData ? state.isEditModalData.from : ""
                    }
                  />
                </div>
                <div className="col-sm-6">
                  <label className="form-label">Status</label>
                  <select className="form-select">
                    <option>In Progress</option>
                    <option value="1">Completed</option>
                    <option value="2">Wating</option>
                    <option value="3">Decline</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setState({ ...state, isModal: false, isEditModalData: "" });
            }}
          >
            Done
          </button>
          <button type="button" className="btn btn-primary">
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Expenses;

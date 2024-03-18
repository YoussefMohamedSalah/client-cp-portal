
import React, { lazy } from "react";
import { Dropdown } from "react-bootstrap";
import AttendanceCard from "components/Employees/AttendanceCard";
import { useAttendanceQuery } from "api/Attendance/getAllAttendance";
import Loading from "components/UI/Loading";
import EditAttendanceModal from "./EditAttendanceModal";
import { useEditAttendanceForEmployee } from "api/Attendance/editAttendanceForEmployee";
import { useUI } from "contexts/UIContext";
import { handleServerError } from "utils/inputValidator";

const PageHeader = lazy(() => import("../../components/Common/PageHeader"));



interface Props { }
interface State {
  isModal: boolean;
  modelData: any;
}

const INITIAlIZE_DATA: State = {
  isModal: false,
  modelData: {}
};

const AllEmployeesAttendance: React.FC<Props> = () => {
  const [state, setState] = React.useState<State>(INITIAlIZE_DATA);
  const { isModal, modelData } = state;
  const { isLoading, error, data } = useAttendanceQuery({});
  const { mutateAsync: editAttendanceForEmployeeMutation } = useEditAttendanceForEmployee();
  const { showError, showSuccess } = useUI();


  if (isLoading) return <Loading />;
  if (error) return null;

  let attendances: any[] = data.attendances.data! || [];

  let employeesOptions = attendances.map((employee) => {
    return {
      label:
        employee.name
      ,
      value: employee.id,
    };
  });

  employeesOptions.unshift({
    label: "Select Employee",
    value: 0,
  });

  // --------------------------
  const handleModelData = (key: string, value: any) => {
    setState({
      ...state,
      modelData: {
        ...modelData,
        [key]: value,
      },
    });
  };

  const handleOpenAddModal = () => {
    setState({
      ...state,
      isModal: true,
    });
  };

  const handleModalClose = () => {
    setState({
      ...state,
      isModal: false,
    });
  };

  const handleEditAttendance = async () => {
    try {
      const createInput = {
        id: modelData.employee,
        date: modelData.date,
        reason: modelData.reason,
        attendance_type: modelData.attendance_type
      }
      await editAttendanceForEmployeeMutation(createInput);
      handleModalClose();
      showSuccess();
      window.location.reload();
    } catch (err: any) {
      console.log(err.response?.data?.msg!)
      showError(handleServerError(err.response));
    }
  }



  return (
    <>
      <div className="container-xxl">
        <PageHeader
          headerTitle="Attendance (Admin)"
          renderRight={() => {
            return (
              <div className="col-auto d-flex w-sm-100 ">
                <button
                  type="button"
                  className="btn btn-primary w-sm-100 me-2"
                  onClick={handleOpenAddModal}
                >
                  <i className="icofont-edit me-2 fs-6" /> Edit Attendance
                </button>




                <Dropdown>
                  <Dropdown.Toggle as="button" className="btn btn-primary">
                    Filter
                  </Dropdown.Toggle>
                  <Dropdown.Menu as="ul" className="dropdown-menu-end">
                    <li>
                      <a className="dropdown-item" href="#!">
                        All
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#!">
                        Today Absent
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#!">
                        Week Absent
                      </a>
                    </li>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            );
          }}
        />
        <div className="row clearfix g-3">
          <div className="col-sm-12">
            <AttendanceCard data={attendances} />
            {/* data table example */}
          </div>
        </div>

        {/* Edit Attendance Modal */}
        <EditAttendanceModal
          show={isModal}
          onClose={handleModalClose}
          onEdit={handleEditAttendance}
          employees={employeesOptions}
          handleModelData={handleModelData}
        />
      </div>
    </>
  );
};

export default AllEmployeesAttendance;

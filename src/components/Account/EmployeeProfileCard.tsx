import { SelectedEmployee } from "types/Employee";
import { ResetPasswordInput } from "types/resetPasswordSend";
import { useChangePassword } from "api/Auth/SendResetPassword_Api";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { getImageUrl } from "utils/Helpers";
import { handleServerError } from "utils/inputValidator";
import { useUI } from "contexts/UIContext";

interface Props {
  user: SelectedEmployee;
  personal?:Boolean;
}
const INITIAL_STATE: ResetPasswordInput = { oldPassword: "", newPassword1: "", newPassword2: "" };

const EmployeeProfileCard: React.FC<Props> = ({ user ,personal }) => {
  const [state, setState] = useState<ResetPasswordInput>(INITIAL_STATE);
  const [isModal, setIsModal] = useState<boolean>(false);
  const { oldPassword, newPassword1, newPassword2 } = state;
  const { mutateAsync: changePasswordMutation } = useChangePassword();
  const { showError, showSuccess } = useUI();

  const handleChange = (term: string, event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [term]: event,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      oldPassword: oldPassword,
      newPassword: newPassword1,
    };

    if (!newPassword1 || !newPassword2) {
      // setAlertText("Please Type Your New Password Twice");
      // setAlertType("error");
      return;
    }
    // if (newPassword1.length === 0 || newPassword2.length === 0) {
    //   setAlertText("Please Type Your New Password Twice");
    //   setAlertType("error");
    //   return;
    // }
    try {
      await changePasswordMutation(data);
      showSuccess();
      setIsModal(false);
    } catch (err: any) {
      console.log(err.response?.data?.msg!);
      showError(handleServerError(err.response));
    }
  };
  // console.log(user);

  return (
    <>
      <div className="card teacher-card mb-3">
        <div className="card-body d-flex teacher-fullDetail">
          <div className="profile-teacher pe-xl-4 pe-md-2 pe-sm-4 pe-4 text-center w220">
            <a href="#!">
              <img
                src={getImageUrl(user?.avatar!)}
                alt=""
                className="avatar xl rounded-circle img-thumbnail shadow-sm"
              />
            </a>
            <div className="about-info d-flex align-items-center mt-3 justify-content-center flex-column">
              <h6 className="mb-1 fw-bold d-block fs-6">{user.role}</h6>
              <span className="mb-1 text-muted small">USER ID : {user.code}</span>
              <h6 className="text-muted small">KPI : {user.kpi || 0}</h6>
            </div>
          </div>
          <div className="teacher-info border-start ps-xl-4 ps-md-4 ps-sm-4 ps-4 w-100 d-flex flex-column justify-content-evenly">
            <div>
              <h6 className="mb-0 mt-2  fw-bold d-block fs-6">{user.name}</h6>
              <span className="py-1 fw-bold small-11 mb-0 mt-1 text-muted">{user.business_title}</span>
              {/* <p className="mt-2 small">
                The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page,
                etc.) that doesn't distract from the layout. A practice not without controversy
              </p> */}
              <div className="row g-2 pt-2">
                <div className="col-xl-5">
                  <div className="d-flex align-items-center">
                    <i className="icofont-ui-touch-phone" />
                    <span className="ms-2 small">{user.phone_number ? user.phone_number : "Add Phone Number"}</span>
                  </div>
                </div>
                <div className="col-xl-5">
                  <div className="d-flex align-items-center">
                    <i className="icofont-stopwatch" />
                    <span className="ms-2 small">
                      {user.shift_start && user.shift_end ? user.shift_start + " - " + user.shift_end : "No Shifts"}
                    </span>
                  </div>
                </div>
                <div className="col-xl-5">
                  <div className="d-flex align-items-center">
                    <i className="icofont-email" />
                    <span className="ms-2 small">{user.email ? user.email : "No Email"}</span>
                  </div>
                </div>
                <div className="col-xl-5">
                  <div className="d-flex align-items-center">
                    <i className="icofont-address-book" />
                    <span className="ms-2 small">{user.address ? user.address : "No Address Data"}</span>
                  </div>
                </div>


                <div className="col-xl-5">
                  <div className="d-flex align-items-center">
                  <i className="icofont-building-alt"></i>
                  <span className="ms-2 small">
                    {user?.department_info?.name ? user?.department_info?.name  : "No department Data"}
                    </span>                   
                </div>

              </div>



                
              </div>
            </div>

            <div className="d-flex w-100 gap-3 justify-content-lg-start justify-content-center pt-3 pt-xl-0 ">
             {personal&& <button
                id="dropdown-basic"
                className="btn btn-primary dropdown-toggle"
                onClick={() => setIsModal(!isModal)}>
                Change Password
              </button>}
              <Modal centered show={isModal} size="sm" onHide={() => setIsModal(false)}>
                <Modal.Body>
                  <div className="modal-body">
                    <form className="px-2 py-2" onSubmit={(e) => handleSubmit(e)}>
                      <div className="mb-3">
                        <label htmlFor="exampleDropdownFormOldPassword1" className="form-label">
                          Old Password
                        </label>
                        <input
                          onChange={(event: any) => handleChange("oldPassword", event.target.value)}
                          type="password"
                          className="form-control"
                          id="exampleDropdownFormOldPassword1"
                          placeholder="Old Password"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleDropdownFormNewPassword1" className="form-label">
                          Password
                        </label>
                        <input
                          onChange={(event: any) => handleChange("newPassword1", event.target.value)}
                          type="password"
                          className="form-control"
                          id="exampleDropdownFormNewPassword1"
                          placeholder="New Password"
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          onChange={(event: any) => handleChange("newPassword2", event.target.value)}
                          type="password"
                          className="form-control"
                          id="exampleDropdownFormNewPassword2"
                          placeholder="New Password"
                        />
                      </div>
                      <button type="submit" className="btn btn-primary w-100">
                        Submit
                      </button>
                    </form>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item" href="#!">
                      Forgot password?
                    </a>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeProfileCard;

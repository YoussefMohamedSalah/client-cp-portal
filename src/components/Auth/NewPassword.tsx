import useApp from "hooks/useApp";
import { handleServerError } from "utils/inputValidator";
import { useUI } from "contexts/UIContext";
import { useState } from "react";
import { useCreateNewPassword } from "api/Auth/SendResetPassword_Api";

interface ResetPasswordState {
  newPassword1: string;
  newPassword2: string;
}

const INITIAL_STATE: ResetPasswordState = { newPassword1: "", newPassword2: "" };
const NewPassword: React.FC = () => {
  const [state, setState] = useState<ResetPasswordState>(INITIAL_STATE);
  const { newPassword1, newPassword2 } = state;
  const { push } = useApp();
  const { mutateAsync } = useCreateNewPassword();
  const { showError, showSuccess } = useUI();

  const handleChange = (key: string, value: string) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let email = localStorage.getItem("toResetEmail");
      if (!email) return;
      if (newPassword1 !== newPassword2 || newPassword1 === "") return;
      const data = {
        email,
        password: newPassword1,
      };
      await mutateAsync(data);
      localStorage.removeItem("toResetEmail");
      push("/");
      showSuccess();
    } catch (err: any) {
      console.log(err.response?.data?.msg!);
      showError(handleServerError(err.response));
    }
  };

  return (
    <div className="col-lg-6 d-flex justify-content-center align-items-center border-0 rounded-lg ">
      <div
        className="auth-maxWidth auth-noborder w-100 h-100 p-3 p-md-5 card border-0 bg-dark text-light justify-content-center align-items-center"
        >
        <form className="row g-1 p-3 p-md-4" onSubmit={(e) => handleSubmit(e)}>
          <div className="col-12 text-center mb-1 mb-lg-5">
            <h1>Create New Password</h1>
          </div>
          <div className="col-12">
            <div className="mb-2">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Enter Password"
                onChange={(event: any) => handleChange("newPassword1", event.target.value)}
              />
            </div>
          </div>
          <div className="col-12">
            <div className="mb-2">
              <label className="form-label">Retype Password</label>
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Retype Your Password"
                onChange={(event: any) => handleChange("newPassword2", event.target.value)}
              />
            </div>
          </div>
          <div className="col-12 text-center mt-4 g-4">
            <button type="submit" className="btn btn-lg btn-block btn-light lift text-uppercase">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;

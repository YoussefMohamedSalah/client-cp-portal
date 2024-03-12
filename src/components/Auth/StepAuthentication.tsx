import { useState } from "react";
import GoogleImg from "../../assets/images/verify.svg";
import { useOtpCodeSend, useResetPasswordSend } from "api/Auth/SendResetPassword_Api";
import { handleServerError } from "utils/inputValidator";
import { useUI } from "contexts/UIContext";
import useApp from "hooks/useApp";
import { PAGES } from "constants/pages";

interface State {
  otp1: string;
  otp2: string;
  otp3: string;
  otp4: string;
}

const INITIAlIZE_DATA: State = {
  otp1: "",
  otp2: "",
  otp3: "",
  otp4: "",
};

const StepAuthentication: React.FC = () => {
  const [state, setState] = useState<State>(INITIAlIZE_DATA);
  const { otp1, otp2, otp3, otp4 } = state;
  const { showError } = useUI();
  const { push } = useApp();
  const { mutateAsync: resetPasswordMutation } = useResetPasswordSend();
  const { mutateAsync: sendOtpMutation } = useOtpCodeSend();

  const handleResentResetPassword = async () => {
    try {
      let email = localStorage.getItem("toResetEmail");
      if (email) await resetPasswordMutation({ email });
    } catch (err: any) {
      console.log(err.response?.data?.msg!);
      showError(handleServerError(err.response));
    }
  };

  const handleData = (key: string, value: any) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  const handleSendOtp = async () => {
    if (otp1.length < 4 || otp2.length < 4 || otp3.length < 4 || otp4.length < 4) return;
    let code: string = `${otp1} - ${otp2} - ${otp3} - ${otp4}`;
    try {
      let email = localStorage.getItem("toResetEmail");
      if (email) await sendOtpMutation({ email, code });
      push("/" + PAGES.NEW_PASSWORD);
    } catch (err: any) {
      console.log(err.response?.data?.msg!);
      showError(handleServerError(err.response));
    }
  };

  return (
    <div
      className="auth-maxWidth auth-noborder w-100 h-100 p-3 p-md-5 card border-0 bg-dark text-light justify-content-center align-items-center"
    >
      <form className="row g-1 p-3 p-md-4">
        <div className="col-12 text-center mb-1 mb-lg-5">
          <img src={GoogleImg} className="w240 mb-4" alt="" />
          <h1>Verification</h1>
          <span>We sent a verification code to your email. Enter the code from the email in the field below.</span>
        </div>
        <div className="col">
          <div className="mb-2">
            <input
              type="text"
              className="form-control form-control-lg text-center"
              placeholder="-"
              value={otp1}
              onChange={(e: any) => handleData("otp1", e.target.value)}
            />
          </div>
        </div>
        <div className="col">
          <div className="mb-2">
            <input
              type="text"
              className="form-control form-control-lg text-center"
              placeholder="-"
              value={otp2}
              onChange={(e: any) => handleData("otp2", e.target.value)}
            />
          </div>
        </div>
        <div className="col">
          <div className="mb-2">
            <input
              type="text"
              className="form-control form-control-lg text-center"
              placeholder="-"
              value={otp3}
              onChange={(e: any) => handleData("otp3", e.target.value)}
            />
          </div>
        </div>
        <div className="col">
          <div className="mb-2">
            <input
              type="text"
              className="form-control form-control-lg text-center"
              placeholder="-"
              value={otp4}
              onChange={(e: any) => handleData("otp4", e.target.value)}
            />
          </div>
        </div>
        <div className="col-12 text-center mt-4">
          <a
            href="#!"
            title=""
            className="btn btn-lg btn-block btn-light lift text-uppercase"
            onClick={() => handleSendOtp()}>
            Verify my account
          </a>
        </div>
        <div className="col-12 text-center mt-4">
          <span className="text-muted">
            Haven't received it?{" "}
            <a href="#!" onClick={() => handleResentResetPassword()} className="text-secondary">
              Resend a new code.
            </a>
          </span>
        </div>
      </form>
    </div>
  );
};

export default StepAuthentication;

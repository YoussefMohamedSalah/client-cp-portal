import { Link } from "react-router-dom";
import GoogleImg from "../../assets/images/forgot-password.svg";
import useApp from "hooks/useApp";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordValidation } from "validators/Auth/resetPassword";
import { ResetPasswordSendInput } from "types/resetPasswordSend";
import { useResetPasswordSend } from "api/Auth/SendResetPassword_Api";
import { PAGES } from "constants/pages";
import { handleServerError } from "utils/inputValidator";
import { useUI } from "contexts/UIContext";
import Input from "components/UI/FormInputs/Input";

const defaultValues: ResetPasswordSendInput = { email: "" };

const PasswordReset: React.FC = () => {
  const { push } = useApp();
  const { showError, showSuccess } = useUI();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<any>({
    resolver: yupResolver(resetPasswordValidation),
    mode: "onChange",
    defaultValues,
  });
  const { mutateAsync } = useResetPasswordSend();

  const onSubmit: SubmitHandler<ResetPasswordSendInput> = async (data: ResetPasswordSendInput) => {
    try {
      let email: string = data.email;
      console.log("email", data.email, data);

      await mutateAsync({ email });
      showSuccess();
      localStorage.setItem("toResetEmail", email);
      push("/" + PAGES.VERIFY_EMAIL);
    } catch (err: any) {
      console.log(err.response?.data?.msg!);
      showError(handleServerError(err.response));
    }
  };
  return (
    <div
      className="auth-maxWidth auth-noborder w-100 h-100 p-3 p-md-5 card border-0 bg-primary text-white justify-content-center 
        align-items-center">
      <form className="row g-1 p-3 p-md-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-12 text-center mb-1 mb-lg-5">
          <img src={GoogleImg} className="w240 mb-4" alt="" />
          <h1>Forgot password?</h1>
          <span>
            Enter the email address you used when you joined and we'll send you instructions to reset your password.
          </span>
        </div>
        <div className="col-12">
          <div className="mb-2">
            <Input
              {...register("email")}
              label="email"
              type="email"
              className="form-control form-control-lg"
              placeholder="email"
              error={errors.email?.message}
            />
          </div>
        </div>
        <div className="col-12 text-center mt-4">
          <button disabled={isSubmitting} className="btn btn-lg btn-main lift text-uppercase">
            SUBMIT
          </button>
        </div>
      </form>
      <div className="col-12 text-center mt-4">
        <span className="text-muted">
          Back to{" "}
          <Link onClick={() => push("/")} to="/" title="Sign in" className="text-secondary">
            Sign in
          </Link>
        </span>
      </div>
    </div>
  );
};

export default PasswordReset;

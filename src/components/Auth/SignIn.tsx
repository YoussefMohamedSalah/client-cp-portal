import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidation } from "validators/Auth/login";
import Input from "components/UI/FormInputs/Input";
import useApp from "hooks/useApp";
import { useAuth } from "contexts/AuthContext";
import { useUI } from "contexts/UIContext";
import { PAGES } from "constants/pages";
import { useLogin } from "api/Auth/Login";
import { handleServerError } from "utils/HandlingServerError";

export interface AuthLoginInput {
  email: string;
  password: string;
}

const defaultValues: AuthLoginInput = { email: "", password: "" };

const SignIn: React.FC = () => {
  const { setSession, setCompany } = useAuth();
  const { push } = useApp();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<any>({
    resolver: yupResolver(loginValidation),
    mode: "onChange",
    defaultValues,
  });
  const { mutateAsync } = useLogin();
  const { showError } = useUI();

  const onSubmit: SubmitHandler<AuthLoginInput> = async (data: AuthLoginInput) => {
    try {
      const result = await mutateAsync(data);
      setSession(result);
      setCompany(result.company);
      localStorage.setItem("session", JSON.stringify(result));
      localStorage.setItem("company", JSON.stringify(result.company));
      localStorage.setItem("access_token", result.access);
      localStorage.setItem("view", "user");
      push("/");
    } catch (err: any) {
      console.log(err.response?.data?.msg!);
      showError(handleServerError(err.response));
    }
  };

  return (
    <div className="auth-maxWidth auth-noborder w-100 h-100 p-3 p-md-5 card border-0 bg-primary text-white justify-content-center align-items-center">
      <form className="row g-1 p-3 p-md-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-12 text-center mb-1 mb-lg-5">
          <h1>Sign in</h1>
          <span>Sign in to your Business dashboard.</span>
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
        <div className="col-12">
          <div className="mb-2">
            <div className="form-label">
              <span className="d-flex justify-content-between align-items-center">
                Password
                <Link className="text-secondary" to="password-reset">
                  Forgot Password?
                </Link>
              </span>
            </div>
            <Input
              {...register("password")}
              type="password"
              className="form-control form-control-lg"
              placeholder="***************"
              error={errors.password?.message}
            />
          </div>
        </div>
        <div className="col-12 text-center mt-4 g-4">
          <button disabled={isSubmitting} type="submit" className="btn btn-lg btn-main lift text-uppercase">
            SIGN IN
          </button>
        </div>
      </form>
      <div className="col-12 text-center mt-4">
        <span className="">
          Don't have an account?{" "}
          <span onClick={() => push("/" + PAGES.REGISTER)} title="Sign up" className="text-secondary pointer">
            &nbsp;Sign up here
          </span>
        </span>
      </div>
    </div>
  );
};

export default SignIn;

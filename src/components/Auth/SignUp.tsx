import { SubmitHandler, useForm } from "react-hook-form";
import { registerValidation } from "validators/Auth/register";
import { yupResolver } from "@hookform/resolvers/yup";
import useApp from "hooks/useApp";
import { useAuth } from "contexts/AuthContext";
import { ROLE } from "enums/enums";
import { useUI } from "contexts/UIContext";
import { useRegister } from "api/Auth/Register";
import { handleServerError } from "utils/HandlingServerError";
import Input from "components/UI/FormInputs/Input";

export interface AuthSignupInput {
  email: string;
  password: string;
  name: string;
  role: string;
}

const defaultValues: AuthSignupInput = {
  name: "",
  email: "",
  password: "",
  role: "",
};

const Signup: React.FC = () => {
  const { setSession, setCompany } = useAuth();
  const { push } = useApp();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<any>({
    resolver: yupResolver(registerValidation),
    mode: "onChange",
    defaultValues,
  });
  const { mutateAsync } = useRegister();
  const { showError } = useUI();

  const onSubmit: SubmitHandler<AuthSignupInput> = async (data: AuthSignupInput) => {
    try {
      const result = await mutateAsync({ ...data, role: ROLE.SUPERUSER });
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
    <div className="col-lg-6 d-flex justify-content-center align-items-center border-0 rounded-lg ">
      <div
        className="auth-maxWidth auth-noborder w-100 h-100 p-3 p-md-5 card border-0 bg-primary text-white justify-content-center 
        align-items-center"
   >
        <form className="row g-1 p-3 p-md-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-12 text-center mb-1 mb-lg-3">
            <h1>Create your account</h1>
            <span>Free access to our dashboard.</span>
          </div>

          <div className="col-12">
            <div className="mb-2">
              <Input
                {...register("name")}
                type="text"
                label="Full Name"
                className="form-control form-control-lg"
                placeholder="Full Name"
                error={errors.name?.message}
              />
            </div>
          </div>
          <div className="col-12">
            <div className="mb-2">
              <Input
                {...register("email")}
                type="email"
                label="Email"
                className="form-control form-control-lg"
                placeholder="example@example.com"
                error={errors.email?.message}
              />
            </div>
          </div>
          {/* ------------------------------ */}
          <div className="col-6">
            <div className="mb-2">
              <Input
                {...register("password")}
                type="password"
                label="Password"
                className="form-control form-control-lg"
                placeholder="***************"
                error={errors.password?.message}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="mb-2">
              <Input
                {...register("confirm_password")}
                type="password"
                label="Confirm Password"
                className="form-control form-control-lg"
                placeholder="***************"
                error={errors.password?.message}
              />
            </div>
          </div>
          {/* ------------------------------ */}

          <div className="col-12">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                I accept the{" "}
                <a href="#!" title="Terms and Conditions" className="text-secondary">
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>
          <div className="col-12 text-center mt-4">
            <button disabled={isSubmitting} type="submit" className="btn btn-lg btn-main lift text-uppercase">
              SIGN UP
            </button>
          </div>
          <div className="col-12 text-center mt-4">
            <span className="">
              Already have an account?{" "}
              <span onClick={() => push("/")} title="Sign in" className="text-secondary pointer">
                &nbsp;Sign in here
              </span>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

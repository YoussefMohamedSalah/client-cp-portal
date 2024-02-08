import { SubmitHandler, useForm } from "react-hook-form";
import { registerValidation } from "validators/Auth/register";
import { yupResolver } from "@hookform/resolvers/yup";
import useApp from "hooks/useApp";
import { useAuth } from "contexts/AuthContext";
import { ENUMS } from "enums/enums";
import { useUI } from "contexts/UIContext";
import { useRegister } from "api/Auth/Register";
import { handleServerError } from "utils/HandlingServerError";

export interface AuthSignupInput {
    email: string;
    password: string;
    name: string;
    role: string;
};

const defaultValues: AuthSignupInput = {
    name: "",
    email: "",
    password: "",
    role: ""
};

const Signup: React.FC = () => {
    const { setSession, setCompany } = useAuth();
    const { push } = useApp();
    const { handleSubmit, register, formState: { isSubmitting } } = useForm<any>({
        resolver: yupResolver(registerValidation),
        mode: "onChange",
        defaultValues
    });
    const { mutateAsync } = useRegister();
    const { showError } = useUI();

    const onSubmit: SubmitHandler<AuthSignupInput> = async (
        data: AuthSignupInput
    ) => {
        try {
            const result = await mutateAsync({ ...data, role: ENUMS.ROLE.SUPERUSER });
            setSession(result);
            setCompany(result.company);
            localStorage.setItem("session", JSON.stringify(result));
            localStorage.setItem("company", JSON.stringify(result.company));
            localStorage.setItem("access_token", result.access);
            localStorage.setItem("view", "user")
            push("/");
        } catch (err: any) {
            console.log(err.response?.data?.msg!);
            showError(handleServerError(err.response));
        }
    };
    return (
        <div className="col-lg-6 d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100">
            <div
                className="w-100 p-3 p-md-5 card border-0 bg-primary text-white"
                style={{ maxWidth: "35rem" }}
            >
                <form className="row g-1 p-3 p-md-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-12 text-center mb-1 mb-lg-3">
                        <h1>Create your account</h1>
                        <span>Free access to our dashboard.</span>
                    </div>

                    <div className="col-12">
                        <div className="mb-2">
                            <label className="form-label">Full Name</label>
                            <input
                                {...register("name")}
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Full Name"
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="mb-2">
                            <label className="form-label">Email address</label>
                            <input
                                {...register("email")}
                                type="email"
                                className="form-control form-control-lg"
                                placeholder="example@example.com"
                            />
                        </div>
                    </div>
                    {/* ------------------------------ */}
                    <div className="col-6">
                        <div className="mb-2">
                            <label className="form-label">Password</label>
                            <input
                                {...register("password")}
                                type="password"
                                className="form-control form-control-lg"
                                placeholder="8+ characters "
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mb-2">
                            <label className="form-label">&nbsp;</label>
                            <input
                                {...register("confirm_password")}
                                type="password"
                                className="form-control form-control-lg"
                                placeholder="Confirm Password"
                            />
                        </div>
                    </div>
                    {/* ------------------------------ */}

                    <div className="col-12">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                            />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                I accept the{" "}
                                <a
                                    href="#!"
                                    title="Terms and Conditions"
                                    className="text-secondary"
                                >
                                    Terms and Conditions
                                </a>
                            </label>
                        </div>
                    </div>
                    <div className="col-12 text-center mt-4">
                        <button
                            disabled={isSubmitting}
                            type="submit"
                            className="btn btn-lg btn-main lift text-uppercase"
                        >
                            SIGN UP
                        </button>
                    </div>
                    <div className="col-12 text-center mt-4">
                        <span className="">
                            Already have an account?{" "}
                            <span onClick={() => push('/')} title="Sign in" className="text-secondary pointer">
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

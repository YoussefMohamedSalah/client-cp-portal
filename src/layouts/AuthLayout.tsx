import { Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import { PAGES } from "constants/pages";
import Loading from "components/UI/Loading";

const Aside = lazy(() => import("../components/Auth/Aside"));
const SignIn = lazy(() => import("../components/Auth/SignIn"));
const Register = lazy(() => import("../components/Auth/SignUp"));
const PasswordReset = lazy(() => import("../components/Auth/PasswordReset"));
const StepAuthentication = lazy(() => import("../components/Auth/StepAuthentication"));
const NewPassword = lazy(() => import("../components/Auth/NewPassword"));

const AuthLayout = () => {
  let { slug } = useParams<{ slug: string }>();

  const renderContent = () => {
    switch (slug) {
      case PAGES.LOGIN:
        return <SignIn />;
      case PAGES.PASSWORD_RESET:
        return <PasswordReset />;
      case PAGES.VERIFY_EMAIL:
        return <StepAuthentication />;
      case PAGES.NEW_PASSWORD:
        return <NewPassword />;
      case PAGES.REGISTER:
        return <Register />;
      default:
        return <SignIn />;
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100">
      <div className="row g-0 justify-content-center" style={{ flex: 1 }}>
        <div className="col-lg-6 d-none d-lg-block" style={{ height: "100vh", flex: 1 }}>
          <Aside />
        </div>
        <div className="col-lg-6 col-md-12" style={{ height: "100vh", width: "100%", flex: 1 }}>
          <Suspense fallback={<Loading />}>{renderContent()}</Suspense>
        </div>
      </div>
    </div >
  );
};

export default AuthLayout;

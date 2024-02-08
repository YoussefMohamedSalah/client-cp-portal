import { Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import { PAGES } from "constants/pages";
import Loading from "components/UI/Loading";

const SignIn = lazy(() => import("../../components/Auth/SignIn"));
const Register = lazy(() => import("../../components/Auth/SignUp"));

const AuthLayout = () => {
	let { slug } = useParams<{ slug: string }>();

	const renderContent = () => {
		switch (slug) {
			case PAGES.LOGIN:
				return <SignIn />;
			case PAGES.REGISTER:
				return <Register />;
			default:
				return <SignIn />;
		}
	};

	return (
		<Suspense fallback={<Loading />}>
			{renderContent()}
		</Suspense>
	);
};

export default AuthLayout;

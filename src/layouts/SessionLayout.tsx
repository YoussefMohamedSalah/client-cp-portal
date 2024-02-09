import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
// Hooks
import { useAuth } from "contexts/AuthContext";
import Loading from "components/UI/Loading";
import DashboardLayout from "layouts/DashboardLayout";
import AuthLayout from "./AuthLayout";
import { getLocaleSession } from "utils/Session";

const SessionLayout: React.FC = () => {
	const [initialized, setInitialized] = useState<boolean>(false);
	const sessionObj = getLocaleSession();
	const { setSession } = useAuth();

	useEffect(() => {
		if (sessionObj && !initialized) {
			setSession(sessionObj ? sessionObj : null)
			setInitialized(true)
		}
		setInitialized(true)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!initialized) return <Loading />;
	return <> {sessionObj?.token! ?
		(
			<Routes>
				<Route path="/" element={<DashboardLayout session={sessionObj} />} />
				<Route path=":slug/:id/*" element={<DashboardLayout session={sessionObj} />} />
				<Route path=":slug/*" element={<DashboardLayout session={sessionObj} />} />
			</Routes>
		)
		:
		(
			<Routes>
				<Route path="/" element={<AuthLayout />} />
				<Route path=":slug/*" element={<AuthLayout />} />
			</Routes>
		)
	}</>
}

export default SessionLayout

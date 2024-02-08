import { useState, useEffect } from "react";
// Hooks
import { getLocaleSession } from "@/utils/Session";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "@/components/UI/Loading";
import DashboardLayout from "@/layouts/DashboardLayout";
import AuthLayout from "@/components/Layouts/AuthLayout";

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
	return <> {sessionObj ? <DashboardLayout session={sessionObj} /> : <AuthLayout />}</>
}

export default SessionLayout

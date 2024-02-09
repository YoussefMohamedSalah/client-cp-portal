import { ENUMS } from "enums/enums";
import { createContext, useContext, useEffect, useState } from "react";
import { Session } from "types/Session";

interface AuthContextValue {
	session: any;
	setSession: (session: any) => void;
	company: any;
	setCompany: (company: any) => void;
	isSuperUser: () => boolean;
	view: "user" | "admin",
	changeView: () => void;
};

export const AuthContext = createContext<AuthContextValue>({
	session: null,
	setSession: () => { },
	company: null,
	setCompany: () => { },
	isSuperUser: () => false,
	view: "user",
	changeView: () => { }
});

export function useAuth() {
	return useContext(AuthContext);
};

interface Props {
	children: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
	const [session, setSession] = useState<Session | null>(null);
	const [company, setCompany] = useState(null);
	const [view, setView] = useState<"admin" | "user">("user");

	useEffect(() => {
		let storedView = localStorage.getItem("view");
		if (storedView && (storedView === "user" || storedView === "admin")) {
			setView(storedView);
		}
	}, []);

	const isSuperUser = (): boolean => {
		if (session && session.user && session.user.role) {
			let role = session?.user?.role
			if (role === ENUMS.ROLE.SUPERUSER || role === ENUMS.ROLE.SUB_SUPERUSER) {
				return true
			} else return false;
		} else return false;
	}

	const changeView = () => {
		if (view === 'admin') {
			setView("user")
			localStorage.setItem("view", "user")
			window.location.reload();
		}
		else if (view === "user") {
			localStorage.setItem("view", "admin")
			setView("admin")
			window.location.reload();
		}
	}

	return (
		<AuthContext.Provider value={{ session, setSession, isSuperUser, company, setCompany, view, changeView }}>
			{children}
		</AuthContext.Provider>
	);
};

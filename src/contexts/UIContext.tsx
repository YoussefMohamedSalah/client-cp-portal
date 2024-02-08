import { createContext, useContext, useEffect, useState } from "react";
import { ErrorType } from "@/types/Error";

interface UIContextValue {
	changeTheme: (theme: string) => void;
	showError: (error: any) => void;
	hideError: () => void;
	showSuccess: () => void;
	theme: string;
	isShowError: boolean;
	isShowSuccess: boolean;
	errorsList: ErrorType[];
};

export const UIContext = createContext<UIContextValue>({
	changeTheme: () => { },
	showError: () => { },
	hideError: () => { },
	showSuccess: () => { },
	theme: "light",
	isShowError: false,
	isShowSuccess: false,
	errorsList: [],
});

export function useUI() {
	return useContext(UIContext);
};

interface Props {
	children: React.ReactNode;
};
export const UIProvider: React.FC<Props> = ({ children }) => {
	const [theme, setTheme] = useState<"light" | "dark">("light");
	const [errorsList, setErrorsList] = useState<ErrorType[]>([]);
	const [isShowError, setIsShowError] = useState<boolean>(false);
	const [isShowSuccess, setIsShowSuccess] = useState<boolean>(false);

	useEffect(() => {
		let storedTheme = localStorage.getItem("theme");
		if (storedTheme && (storedTheme === "light" || storedTheme === "dark")) {
			changeTheme(storedTheme);
		}
	}, [])

	const changeTheme = (newTheme: string) => {
		if (newTheme === "dark") {
			window.document.children[0].setAttribute("data-theme", "dark");
			setTheme("dark")
			localStorage.setItem("theme", "dark")
		} else {
			window.document.children[0].setAttribute("data-theme", "light");
			setTheme("light")
			localStorage.setItem("theme", "light")
		}
	};

	const showSuccess = () => {
		setIsShowSuccess(true);
		setErrorsList([]);
		setIsShowError(false);

		setTimeout(() => {
			setIsShowSuccess(false);
		}, 2000);
	};

	const showError = (errors: ErrorType[]) => {
		if (
			typeof errors !== "string" ||
			typeof errors !== "number" ||
			typeof errors !== "object"
		)
			if (errors && errors.length > 0) {
				setIsShowError(true);
			}
	};

	const hideError = () => {
		setErrorsList([]);
		setIsShowError(false);
	};

	return (
		<UIContext.Provider value={{ theme, isShowError, errorsList, isShowSuccess, changeTheme, showError, hideError, showSuccess }}>
			{children}
		</UIContext.Provider>
	);
};

import { ROUTES } from "@/constants/routes";
import { http } from "@/utils/Http";

interface AuthLoginInput {
	email: string;
	password: string;
};

export const loginHandler = async (userData: AuthLoginInput) => {
	const { data } = await http.post(ROUTES.LOGIN, userData);
	return data;
};
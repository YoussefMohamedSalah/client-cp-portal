import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "@/constants/routes";
import { http } from "@/utils/Http";

export const useLogout = () => {
	return useMutation<any, Error, string>(async (id: string) => {
		const { data } = await http.post(ROUTES.LOGOUT, { id });
		return data;
	});
};

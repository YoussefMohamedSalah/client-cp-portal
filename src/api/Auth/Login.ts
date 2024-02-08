import { AuthLoginInput } from "components/Auth/SignIn";
import { ROUTES } from "constants/routes";
import { useMutation } from "react-query";
import http from "utils/Http";

export const useLogin = () => {
	return useMutation<any, Error, AuthLoginInput>(async (createInput) => {
		const { data } = await http.post(ROUTES.LOGIN, createInput);
		return data;
	});
};

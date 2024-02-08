import { AuthSignupInput } from "components/Auth/SignUp";
import { ROUTES } from "constants/routes";
import { useMutation } from "react-query";
import http from "utils/Http";

export const useRegister = () => {
    return useMutation<any, Error, AuthSignupInput>(async (createInput) => {
        const { data } = await http.post(ROUTES.REGISTER, createInput);
        return data;
    });
};

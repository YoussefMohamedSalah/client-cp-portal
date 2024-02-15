import { ROUTES } from "constants/routes";
import { useMutation } from "@tanstack/react-query";
import http from "utils/Http";

export interface ResetPasswordVerifyInput {
  otp: string;
  email: string;
}

export const useResetPasswordVerify = () => {
  return useMutation<any, Error, ResetPasswordVerifyInput>(async (createInput) => {
    const { data } = await http.post(ROUTES.RESET_PASSWORD_VERIFY, createInput);

    return data;
  });
};

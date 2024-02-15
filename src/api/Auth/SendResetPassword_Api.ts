import { ROUTES } from "constants/routes";
import { useMutation } from "@tanstack/react-query";
import http from "utils/Http";

interface changePasswordType {
  oldPassword: string;
  newPassword: string;
}

interface resetPasswordType {
  email: string;
}

interface sendCodeType {
  email: string;
  code: string;
}

export const useChangePassword = () => {
  return useMutation<any, Error, changePasswordType>(async (createInput) => {
    const { data } = await http.post(ROUTES.CHANGE_PASSWORD, createInput);
    return data;
  });
};

export const useResetPasswordSend = () => {
  return useMutation<any, Error, resetPasswordType>(async (createInput) => {
    const { data } = await http.post(ROUTES.RESET_PASSWORD, { email: createInput.email });
    return data;
  });
};

export const useOtpCodeSend = () => {
  return useMutation<any, Error, sendCodeType>(async (createInput) => {
    const { data } = await http.post(ROUTES.SEND_PASSWORD_CODE, createInput);
    return data;
  });
};

export const useCreateNewPassword = () => {
  return useMutation<any, Error, any>(async (createInput) => {
    const { data } = await http.post(ROUTES.CREATE_NEW_PASSWORD, createInput);
    return data;
  });
};

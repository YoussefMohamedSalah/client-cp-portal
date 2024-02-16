import { useMutation } from "@tanstack/react-query";
import { http } from "utils/Http";
import { ROUTES } from "constants/routes";

export const useUpdateUserSign = () => {
  return useMutation<any, Error, any>(async (createInput) => {
    const data = http.put(ROUTES.USER_SIGN, createInput, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  });
};

export const userSignInput = (data: any): any => {
  const formData = new FormData();
  formData.append("sign", data.sign);
  return formData;
};

import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export const useSendDeleteCompanyCode = () => {
  return useMutation<any, Error, any>(async () => {
    const { data } = await http.delete(ROUTES.COMPANY);
    return { data: { data: data as any } };
  });
};



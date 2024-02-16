import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export const useDeleteCompany = () => {
  return useMutation<any, Error, any>(async (code) => {
    const { data } = await http.post(ROUTES.COMPANY + "final_delete", code);
    return { data: { data: data as any } };
  });
};

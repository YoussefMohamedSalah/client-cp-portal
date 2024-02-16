import { ROUTES } from "constants/routes";
import { useMutation } from "@tanstack/react-query";
import http from "utils/Http";

export const useApproveDocument = () => {
  return useMutation<any, Error, any>(async (updateInput) => {
    const { id, ...rest } = updateInput;
    const { data } = await http.post(ROUTES.APPROVE_REQUEST + id, rest);
    return { data: data as any };
  });
};

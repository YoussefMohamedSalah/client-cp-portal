import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import http from "utils/Http";

export const useRejectDocument = () => {
  return useMutation<any, Error, any>(async (updateInput) => {
    const { id, ...rest } = updateInput;
    const { data } = await http.post(ROUTES.REJECT_REQUEST + id, rest);
    return { data: data as any };
  });
};

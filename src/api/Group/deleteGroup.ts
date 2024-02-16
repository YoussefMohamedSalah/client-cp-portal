import { useMutation } from "@tanstack/react-query";
import http from "utils/Http";
import { ROUTES } from "constants/routes";

export const useDeleteGroup = () => {
  return useMutation<any, Error, any>(async (updateInput) => {
    const { data } = await http.delete(ROUTES.GROUP + updateInput.id + "/");
    return { session: { data: data as any } };
  });
};

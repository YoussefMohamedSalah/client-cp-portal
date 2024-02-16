import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import http from "utils/Http";

export const useDeleteSubcontractor = () => {
  return useMutation<any, Error, string>(async (id) => {
    const { data } = await http.delete(ROUTES.SUBCONTRACTOR + id);
    return { data: { data: data as any } };
  });
};

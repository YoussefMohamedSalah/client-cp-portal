import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export const useDeleteTask = () => {
  return useMutation<any, Error, string>(async (id) => {
    const { data } = await http.delete(ROUTES.TASK + id + "/");
    return { data: { data: data as any } };
  });
};

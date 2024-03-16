import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export const useDeleteTodo = () => {
  return useMutation<any, Error, string>(async (id) => {
    const { data } = await http.delete(ROUTES.TODO + id);
    return data;
  });
};

import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const useDeleteTodo = () => {
  return useMutation<any, Error, string>(
    async (id) => {
      const { data } = await http.delete(ROUTES.TODO + id);
      return { data: { data: data as any } };
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["todos"]);
      },
    },
  );
};

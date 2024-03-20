import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Todo } from "types/Todo";
import { http } from "utils/Http";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const useUpdateTodo = () => {
  return useMutation<any, Error, any>(
    async (updateInput) => {
      const { data } = await http.put(ROUTES.TODO + updateInput.id, updateInput);
      return { todo: { data: data as Todo } };
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["todos"]);
      },
    },
  );
};

export const todoUpdateInput = (data: Todo): any => {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    status: data.status,
  } as Todo;
};

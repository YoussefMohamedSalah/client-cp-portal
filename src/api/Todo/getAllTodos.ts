import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Todo } from "types/Todo";
import { http } from "utils/Http";

export const getAllTodos = async () => {
  const { data } = await http.get(ROUTES.CO_TODOS);
  return { todos: { data: data as Todo[] } };
};

export const useTodosQuery = (options: any) => {
  return useQuery<{ todos: { data: any } }, Error>([ROUTES.CO_TODOS, options], getAllTodos);
};

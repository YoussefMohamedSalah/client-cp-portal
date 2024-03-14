import { useMutation } from "@tanstack/react-query";
import { Todo } from "types/Todo";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export const useCreateTodo = () => {
  return useMutation<any, Error, Todo>(async (createInput) => {
    const { data } = await http.post(ROUTES.TODO, createInput);
    return { todo: { data: data as Todo } };
  });
};

export const todoInput = (data: Todo): any => {
  return {
    id: data.id,
    title: data.title,
    desc: data.desc,
    status: data.status,
  };
};

import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Task } from "types/Task";
import { http } from "utils/Http";

export const getAllTasks = async ({ queryKey }: any) => {
  const { data } = await http.get(ROUTES.CO_TASKS);
  return { tasks: { data: data as Task[] } };
};

export const useTasksQuery = (options: any) => {
  return useQuery<{ tasks: { data: Task[] } }, Error>([ROUTES.CO_TASKS, options], getAllTasks);
};

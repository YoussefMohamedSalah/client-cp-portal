import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export const getAllTasks = async ({ queryKey }: any) => {
  const { data } = await http.get(ROUTES.CO_TASKS);
  return { tasks: { data: data as any } };
};

export const useTasksQuery = (options: any) => {
  return useQuery<{ tasks: { data: any } }, Error>(
    [ROUTES.CO_TASKS, options],
    getAllTasks
  );
};

import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export const getAllProjects = async ({ queryKey }: any) => {
  const { data } = await http.get(ROUTES.CO_PROJECTS);
  return { projects: { data: data as any } };
};

export const useProjectsQuery = (options: any) => {
  return useQuery<{ projects: { data: any } }, Error>([ROUTES.CO_PROJECTS, options], getAllProjects);
};

import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export const getManagerProjects = async ({ queryKey }: any) => {
  const { data } = await http.get(ROUTES.PROJECT + ROUTES.DAILY_REPORT);
  return { projects: { data: data as any } };
};

export const useProjectsQuery = (options: any) => {
  return useQuery<{ projects: { data: any } }, Error>(
    [ROUTES.PROJECT + ROUTES.DAILY_REPORT, options],
    getManagerProjects
  );
};

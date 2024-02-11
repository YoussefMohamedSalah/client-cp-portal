import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Project } from "types/Project";
import { http } from "utils/Http";

export const getSingleProject = async ({ queryKey }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, _params] = queryKey;
  const { data } = await http.get(ROUTES.PROJECT + _params.id);
  return { project: { data: data as Project } };
};

export const useSingleProjectQuery = (options: any) => {
  return useQuery(
    [ROUTES.PROJECT, options],
    getSingleProject
  );
};

import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Project } from "types/Project";
import { http } from "utils/Http";

export const getProjectDetails = async ({ queryKey }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, _params] = queryKey;
  if (_params.id) {
    const { data } = await http.get(ROUTES.PROJECT + _params.id);
    return { project: { data: data as Project } };
  } return null;
};

export const useProjectDetailsQuery = (options: any) => {
  return useQuery(
    [ROUTES.PROJECT, options],
    getProjectDetails
  );
};

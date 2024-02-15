import { useQuery } from "@tanstack/react-query";
import { QueryOptionsType } from "types/QueryOptions";
import http from "utils/Http";
import { ROUTES } from "constants/routes";

export const getAllGroups = async ({ queryKey }: any) => {
  const { data } = await http.get(ROUTES.CO_GROUPS);
  return { groups: { data: data as any } };
};

export const useGroupQuery = (options: QueryOptionsType) => {
  return useQuery<{ groups: { data: any } }, Error>(
    [ROUTES.CO_GROUPS, options],
    getAllGroups
  );
};

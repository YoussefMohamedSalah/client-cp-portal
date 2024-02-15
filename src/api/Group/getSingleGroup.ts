import { useQuery } from "@tanstack/react-query";
import { QueryOptionsType } from "types/QueryOptions";
import http from "utils/Http";
import { ROUTES } from "constants/routes";

export const getSingleGroup = async ({ queryKey }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, _params] = queryKey;
  const { data } = await http.get(ROUTES.GROUP + _params.id);
  return { group: { data: data as any } };
};

export const useSingleGroupQuery = (options: QueryOptionsType) => {
  return useQuery([ROUTES.GROUP, options], getSingleGroup);
};

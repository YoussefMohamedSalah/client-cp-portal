import { useQuery } from "@tanstack/react-query";
import { QueryOptionsType } from "types/QueryOptions";
import http from "utils/Http";
import { ROUTES } from "constants/routes";

export const getSingleEmployee = async ({ queryKey }: any) => {
  const { data } = await http.get(ROUTES.EMPLOYEE);
  return { employee: { data: data as any } };
};

export const useSingleEmployeeQuery = (options: QueryOptionsType) => {
  return useQuery<{ employee: { data: any } }, Error>(
    [ROUTES.EMPLOYEE, options],
    getSingleEmployee
  );
};

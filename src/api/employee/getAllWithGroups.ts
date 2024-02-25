import { useQuery } from "@tanstack/react-query";
import { QueryOptionsType } from "types/QueryOptions";
import http from "utils/Http";
import { ROUTES } from "constants/routes";

export const getAllEmployeesWithGroups = async ({ queryKey }: any) => {
  const { data } = await http.get(ROUTES.EMPLOYEE_GROUPS);
  return { employees: { data: data as any } };
};

export const useEmployeesGroupsQuery = (options: QueryOptionsType) => {
  return useQuery<{ employees: { data: any } }, Error>([ROUTES.EMPLOYEE_GROUPS, options], getAllEmployeesWithGroups);
};

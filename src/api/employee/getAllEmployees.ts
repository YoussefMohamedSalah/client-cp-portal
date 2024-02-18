import { useQuery } from "@tanstack/react-query";
import { QueryOptionsType } from "types/QueryOptions";
import http from "utils/Http";
import { ROUTES } from "constants/routes";

export const getAllEmployees = async ({ queryKey }: any) => {
  const { data } = await http.get(ROUTES.CO_EMPLOYEES);
  return { employees: { data: data as any } };
};

export const useEmployeesQuery = (options: QueryOptionsType) => {
  return useQuery<{ employees: { data: any } }, Error>(
    [ROUTES.CO_EMPLOYEES, options],
    getAllEmployees
  );
};

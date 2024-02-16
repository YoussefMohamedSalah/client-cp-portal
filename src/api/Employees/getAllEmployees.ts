import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export const getAllEmployees = async ({ queryKey }: any) => {
  const { data } = await http.get(ROUTES.CO_EMPLOYEES);
  return { employees: { data: data as any } };
};

export const useEmployeesQuery = (options: any) => {
  return useQuery<{ employees: { data: any } }, Error>([ROUTES.CO_EMPLOYEES, options], getAllEmployees);
};

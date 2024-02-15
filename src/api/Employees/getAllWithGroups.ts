import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Employee } from "types/Employee";
import { http } from "utils/Http";

export const getAllEmployeesWithGroups = async ({ queryKey }: any) => {
  const { data } = await http.get(ROUTES.EMPLOYEE_GROUPS);
  return { employees: { data: data as Employee[] } };
};

export const useEmployeesGroupsQuery = (options: any) => {
  return useQuery<{ employees: { data: Employee[] } }, Error>(
    [ROUTES.EMPLOYEE_GROUPS, options],
    getAllEmployeesWithGroups
  );
};

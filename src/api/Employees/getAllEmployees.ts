import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Employee } from "types/Employee";
import { http } from "utils/Http";

export const getAllEmployees = async ({ queryKey }: any) => {
  const { data } = await http.get(ROUTES.CO_EMPLOYEES);
  return { employees: { data: data as Employee[] } };
};

export const useEmployeesQuery = (options: any) => {
  return useQuery({ queryKey: ["employees"], queryFn: getAllEmployees });
};

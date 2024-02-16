import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Employee } from "types/Employee";
import { http } from "utils/Http";

export const getEmployeeDetails = async ({ queryKey }: any) => {
  const { data } = await http.get(ROUTES.EMPLOYEE);
  return { employee: { data: data as Employee } };

  // const [_key, _params] = queryKey;
  // const { data } = await http.get(ROUTES.PC_REQUEST + _params.id);
};

export const useEmployeeDetailsQuery = (options: any) => {
  return useQuery<{ employee: { data: Employee } }, Error>([ROUTES.EMPLOYEE, options], getEmployeeDetails);
};

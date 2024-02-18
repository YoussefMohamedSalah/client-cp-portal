import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Employee } from "types/Employee";
import { http } from "utils/Http";

export const getEmployeeDetails = async ({ queryKey }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, _params] = queryKey;
  if (_params.id) {
    const { data } = await http.get(ROUTES.EMPLOYEE + _params.id);
    return { employee: { data: data as Employee } };
  }
};

export const useEmployeeDetailsQuery = (options: any) => {
  return useQuery([ROUTES.EMPLOYEE, options], getEmployeeDetails);
};

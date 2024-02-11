import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export const getAllManagers = async ({ queryKey }: any) => {
  const { data } = await http.get(ROUTES.EMPLOYEE_MANAGER);
  return { managers: { data: data as any } };
};

export const useManagerQuery = (options: any) => {
  return useQuery<{ managers: { data: any } }, Error>(
    [ROUTES.EMPLOYEE_MANAGER, options],
    getAllManagers
  );
};

import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export const getAllManagers = async ({ queryKey }: any) => {
  const { data } = await http.get(ROUTES.MANAGER);
  return { managers: { data: data as any } };
};

export const useManagersQuery = (options: any) => {
  return useQuery<{ managers: { data: any } }, Error>([ROUTES.MANAGER, options], getAllManagers);
};

import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import http from "utils/Http";

export const downloadEmployeesCsv = async ({ queryKey }: any) => {
  const { data } = await http.get(ROUTES.EMPLOYEES_CSV);
  return { data: { data: data as any } };
};

export const useDownloadEmployeesCsvQuery = (options: any) => {
  return useQuery<{ data: { data: any } }, Error>([ROUTES.EMPLOYEES_CSV, options], downloadEmployeesCsv);
};

import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export const getAllDepartments = async ({ queryKey }: any) => {
  const { data } = await http.get(ROUTES.DEPARTMENTS);
  return { departments: { data: data as any } };
};

export const useDepartmentsQuery = (options: any) => {
  return useQuery<{ departments: { data: any } }, Error>(
    [ROUTES.DEPARTMENTS, options],
    getAllDepartments
  );
};

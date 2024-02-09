import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import http from "utils/Http";

export const getAllAttendance = async ({ queryKey }: any) => {
  // this with limit query
  const { data } = await http.get(ROUTES.EMPLOYEES_ATTENDANCES);
  return { attendances: { data: data as any } };;
};

export const useAttendanceQuery = (options: any) => {
  return useQuery<{ attendances: { data: any } }, Error>(
    [ROUTES.EMPLOYEES_ATTENDANCES, options],
    getAllAttendance
  );
};

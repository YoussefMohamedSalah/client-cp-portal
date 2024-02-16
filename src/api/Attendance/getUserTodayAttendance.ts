import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import http from "utils/Http";

export const getUserTodayAttendance = async ({ queryKey }: any) => {
  const { data } = await http.get(ROUTES.ATTENDANCE_STATUS);
  return { attendance: { data: data as any } };
};

export const useAttendanceQuery = (options: any) => {
  return useQuery<{ attendance: { data: any } }, Error>([ROUTES.ATTENDANCE_STATUS, options], getUserTodayAttendance);
};

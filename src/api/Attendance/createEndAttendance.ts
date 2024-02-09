import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import http from "utils/Http";

export const useCreateEndAttendance = () => {
  return useMutation<any, Error, any>(async () => {
    const { data } = await http.post(ROUTES.ATTENDANCE_END);
    return { data: data as any };
  });
};
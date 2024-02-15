import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import http from "utils/Http";

export const useEditAttendanceForEmployee = () => {
  return useMutation<any, Error, any>(async (createInput) => {
    const { id } = createInput;
    const { data } = await http.put(ROUTES.EMPLOYEE_ATTENDANCE + id, createInput);
    return { data: data as any };
  });
};

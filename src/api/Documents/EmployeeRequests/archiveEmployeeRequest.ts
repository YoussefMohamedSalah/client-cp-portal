import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { EmployeeRequest } from "types/Employee_request";
import { http } from "utils/Http";

export const useSaveEmployeeRequestToArchive = () => {
  return useMutation<any, Error, any>(async (createInput) => {
    const { data } = await http.post(ROUTES.EMPLOYEE_REQUEST + "archive/", createInput);
    return { empRequest: { data: data as EmployeeRequest } };
  });
};

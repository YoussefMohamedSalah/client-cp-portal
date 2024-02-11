import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { EmployeeRequest } from "types/Employee_request";
import { http } from "utils/Http";

export const useCreateEmployeeRequest = () => {
  return useMutation<any, Error, any>(async createInput => {
    const { data } = await http.post(ROUTES.EMPLOYEE_REQUEST, createInput);
    return { empRequest: { data: data as EmployeeRequest } };
  });
};

export const employeeRequestInput = (data: any): any => {
  return {
    subject: data.subject ? data.subject : null,
    date: data.date ? data.date : null,
    description: data.description ? data.description : null,
  }
};

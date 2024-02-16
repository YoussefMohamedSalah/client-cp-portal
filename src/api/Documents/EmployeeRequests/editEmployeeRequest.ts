import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { EmployeeRequest } from "types/Employee_request";
import { http } from "utils/Http";

export const useEditEmployeeRequest = () => {
  return useMutation<any, Error, any>(async (updateInput) => {
    const { id } = updateInput;
    const { data } = await http.put(ROUTES.EMPLOYEE_REQUEST + id, updateInput.data);
    return { empRequest: { data: data as EmployeeRequest } };
  });
};

export const employeeEditInput = (data: any): any => {
  return {
    id: data.id ? data.id : null,
    subject: data.subject ? data.subject : null,
    date: data.date ? data.date : null,
    description: data.description ? data.description : null,
    is_archived: data.is_archived ? data.is_archived : null,
  };
};

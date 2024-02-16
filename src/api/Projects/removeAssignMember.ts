import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { SelectedEmployee } from "types/Employee";
import { http } from "utils/Http";

export const useDeleteAssignedEmployee = () => {
  return useMutation<any, Error, SelectedEmployee>(async (updateInput) => {
    const { data } = await http.delete(ROUTES.EMPLOYEE_PROJECT + updateInput.id + "/");
    return { session: { data: data as any } };
  });
};

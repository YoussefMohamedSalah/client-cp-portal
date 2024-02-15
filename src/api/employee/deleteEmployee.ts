import { useMutation } from "@tanstack/react-query";
import { http } from "utils/Http";
import { ROUTES } from "constants/routes";
import { SelectedEmployee } from "types/Employee";

export const useDeleteEmployee = () => {
  return useMutation<any, Error, SelectedEmployee>(async (createInput) => {
    const { id } = createInput;
    const { data } = await http.delete(ROUTES.EMPLOYEE + id);
    return data;
  });
};

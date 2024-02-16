import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export const useUpdateEmployee = () => {
  return useMutation<any, Error, any>(async (updateInput) => {
    const { data } = await http.post(ROUTES.EMPLOYEE + updateInput.id + "/", updateInput);
    return { session: { data: data as any } };
  });
};

export const employeeInput = (data: any): any => {
  return { project: data.project, user: data.user };
};

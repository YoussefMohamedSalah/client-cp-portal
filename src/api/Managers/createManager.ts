import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export const useCreateManager = () => {
  return useMutation<any, Error, any>(async (createInput) => {
    const { data } = await http.post(ROUTES.MANAGER, createInput);
    return { data: { data: data as any } };
  });
};

export const managerInput = (data: any): any => {
  return {
    name: data.name!,
    username: data.username!,
    email: data.email!,
    password1: data.password1!,
    password2: data.password1!,
    onboard_at: data.onboard_at!,
    employee_id: data.employee_id!,
    phone: data.phone!,
    department: data.department.id!,
    description: data.description!,
    user_permissions: data.user_permissions!,
  };
};

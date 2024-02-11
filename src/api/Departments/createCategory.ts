import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export const useCreateDepartment = () => {
  return useMutation<any, Error, any>(async createInput => {
    const { data } = await http.post(ROUTES.CATEGORY, createInput);
    return { department: { data: data as any } };
  });
};


export const departmentInput = (data: any): any => {
  return {
    name: data.name,
    base_category: data.base_category!
  };
};

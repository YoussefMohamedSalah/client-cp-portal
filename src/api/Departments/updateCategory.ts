import { useMutation } from "@tanstack/react-query";
// import { CategoryUpdateInput } from "types/category";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export const useUpdateDepartment = () => {
  return useMutation<any, Error, any>(async updateInput => {
    const { data } = await http.patch(ROUTES.CATEGORY + updateInput.id + "/", updateInput);
    return { department: { data: data as any } };
  });
};

export const departmentInput = (data: any): any => {
  return {
    id: data.id,
    name: data.name,
    base_category: data.base_category
  };
};

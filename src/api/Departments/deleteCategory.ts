import { useMutation } from "@tanstack/react-query";
// import { CategoryUpdateInput } from "types/category";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export const useDeleteDepartment = () => {
  return useMutation<any, Error, any>(async (updateInput) => {
    const { data } = await http.delete(ROUTES.CATEGORY + updateInput.id + "/");
    return { department: { data: data as any } };
  });
};

export const departmentInput = (data: any): any => {
  return {
    id: data.id,
    name: data.name,
  };
};

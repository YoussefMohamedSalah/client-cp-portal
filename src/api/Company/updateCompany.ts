import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";
import { Company } from "types/Company";

export const useCompany = () => {
  return useMutation<any, Error, Company>(async (createInput) => {
    const { data } = await http.put(ROUTES.COMPANY, createInput);
    return { company: { data: data as Company } };
  });
};

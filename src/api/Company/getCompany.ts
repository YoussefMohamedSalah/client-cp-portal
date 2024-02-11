import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Company } from "types/Company";
import { http } from "utils/Http";

export const useGetCompany = () => {
  return useMutation<any, Error, any>(async (param) => {
    const { data } = await http.get(ROUTES.COMPANY);
    if (!data) return;
    localStorage.setItem('company', JSON.stringify(data))
    return { company: { data: data as Company } };
  });
};
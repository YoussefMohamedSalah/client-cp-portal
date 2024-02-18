import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Company } from "types/Company";
import { http } from "utils/Http";

// export const getCompan2yDetails = () => {
//   return useMutation<any, Error, any>(async (param) => {
//     const { data } = await http.get(ROUTES.COMPANY);
//     if (!data) return;
//     localStorage.setItem("company", JSON.stringify(data));
//     return { company: { data: data as Company } };
//   });
// };

export const getCompanyDetails = async ({ queryKey }: any) => {
  const { data } = await http.get(ROUTES.COMPANY);
  if (data) localStorage.setItem("company", JSON.stringify(data));
  return { company: { data: data as Company } };

};

export const useCompanyDetailsQuery = (options: any) => {
  return useQuery([ROUTES.COMPANY, options], getCompanyDetails);
};

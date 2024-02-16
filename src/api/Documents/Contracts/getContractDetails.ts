import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";
import { Contract } from "types/Contract";

export const getContractDetails = async ({ queryKey }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, _params] = queryKey;
  const { data } = await http.get(ROUTES.CONTRACT + _params.id);
  return { contractDetails: { data: data as Contract } };
};

export const useContractDetailsQuery = (options: any) => {
  return useQuery([ROUTES.CONTRACT, options], getContractDetails);
};

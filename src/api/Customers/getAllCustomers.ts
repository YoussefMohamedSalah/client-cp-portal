import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Customer } from "types/Customer";
import http from "utils/Http";

export const getAllCustomers = async ({ queryKey }: any) => {
  const { data } = await http.get(ROUTES.CO_CUSTOMERS);
  return { customers: { data: data as Customer[] } };
};

export const useCustomersQuery = (options: any) => {
  return useQuery<{ customers: { data: any } }, Error>(
    [ROUTES.CO_CUSTOMERS, options],
    getAllCustomers
  );
};

import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Customer } from "types/Customer";
import http from "utils/Http";

export const getCustomerDetails = async ({ queryKey }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, _params] = queryKey;
  if (_params.id) {
    const { data } = await http.get(ROUTES.CUSTOMER + _params.id);
    return { customer: { data: data as Customer } };
  } else return null;
};

export const useCustomerDetailsQuery = (options: any) => {
  return useQuery([ROUTES.CUSTOMER, options], getCustomerDetails);
};

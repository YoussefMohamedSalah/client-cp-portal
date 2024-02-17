import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Supplier } from "types/Supplier";
import { http } from "utils/Http";

export const getSupplierDetails = async ({ queryKey }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, _params] = queryKey;
  if (_params.id) {
    const { data } = await http.get(ROUTES.SUPPLIER + _params.id);
    return { supplier: { data: data as Supplier } };
  } else return null;
};

export const useSupplierDetailsQuery = (options: any) => {
  return useQuery([ROUTES.SUPPLIER, options], getSupplierDetails);
};

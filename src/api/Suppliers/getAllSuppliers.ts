import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Supplier } from "types/Supplier";
import { http } from "utils/Http";

export const getAllSuppliers = async ({ queryKey }: any) => {
  const { data } = await http.get(ROUTES.CO_SUPPLIERS);
  return { suppliers: { data: data as Supplier[] } };
};

export const useSuppliersQuery = (options: any) => {
  return useQuery({ queryKey: ["suppliers"], queryFn: getAllSuppliers });
};

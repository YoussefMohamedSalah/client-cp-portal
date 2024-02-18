import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Supplier } from "types/Supplier";
import { http } from "utils/Http";

export const useGetSupplier = () => {
  return useMutation<any, Error, Supplier>(async (createInput) => {
    const { id } = createInput;
    const { data } = await http.get(ROUTES.SUPPLIER + id);
    return { supplier: { data: data as Supplier } };
  });
};

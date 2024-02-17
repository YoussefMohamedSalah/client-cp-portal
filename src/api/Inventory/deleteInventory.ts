import { useMutation } from "@tanstack/react-query";
import { Inventory } from "types/Inventory";
import { http } from "utils/Http";
import { ROUTES } from "constants/routes";

export const useDeleteInventory = () => {
  return useMutation<any, Error, Inventory>(async (createInput) => {
    const { id } = createInput;
    const { data } = await http.delete(ROUTES.INVENTORY + id);
    return { data: { data: data as any } };
  });
};

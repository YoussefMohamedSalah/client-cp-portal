import { useMutation } from "@tanstack/react-query";
import { InventoryItem } from "types/Inventory";
import { http } from "utils/Http";
import { ROUTES } from "constants/routes";

export const useDeleteInventoryItem = () => {
  return useMutation<any, Error, InventoryItem>(async (createInput) => {
    const { id } = createInput;
    const { data } = await http.delete(ROUTES.INVENTORY_ITEM + id);
    return { data: { data: data as any } };
  });
};

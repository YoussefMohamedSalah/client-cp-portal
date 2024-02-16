import { useMutation } from "@tanstack/react-query";
import { InventoryItem } from "types/Inventory";
import { http } from "utils/Http";
import { ROUTES } from "constants/routes";

export const useGetAllInventoryItems = () => {
  return useMutation<any, Error, InventoryItem>(async (createInput) => {
    const { id } = createInput;
    const { data } = await http.get(
      ROUTES.INVENTORY + ROUTES.INVENTORY_ITEM + id
    );
    // !ERROR this should take type InventoryItem[]
    // !    return { inventoryItems: { data: data as InventoryItem[] } };
    return data;
  });
};

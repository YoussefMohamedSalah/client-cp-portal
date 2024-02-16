import { useMutation } from "@tanstack/react-query";
import { InventoryItem } from "types/Inventory";
import http from "utils/Http";
import { ROUTES } from "constants/routes";

export const useUpdateInventoryItem = () => {
  return useMutation<any, Error, any>(async (updateInput) => {
    const { data } = await http.put(
      ROUTES.INVENTORY_ITEM + updateInput.id,
      updateInput.data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return { inventoryItem: { data: data as any } };
  });
};

export const inventoryItemUpdateInput = (data: InventoryItem): any => {
  if (!data.thumbnail) {
    return {
      id: data.id,
      name: data.name,
      price: data.price,
      count: data.count,
    } as InventoryItem;
  }
  const formData = new FormData();
  formData.append("name", data?.name!);
  formData.append("price", String(data?.price!));
  formData.append("count", String(data?.count!));
  if (!data.thumbnail) return formData;
  formData.append("thumbnail", data.thumbnail);
  return formData;
};

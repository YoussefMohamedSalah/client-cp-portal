import { useMutation } from "@tanstack/react-query";
import { InventoryItem } from "types/Inventory";
import http from "utils/Http";
import { ROUTES } from "constants/routes";

export const useCreateInventoryItem = () => {
  return useMutation<any, Error, any>(async (createInput) => {
    const { data } = await http.post(
      ROUTES.INVENTORY_ITEM + createInput.inventoryId,
      createInput.data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return { inventoryItem: { data: data as InventoryItem } };
  });
};

export const inventoryItemInput = (data: InventoryItem): any => {
  if (!data.thumbnail?.length) {
    return {
      id: data.id,
      name: data.name,
      count: data.count,
      price: data.price,
    } as InventoryItem;
  }

  const formData = new FormData();
  data.id && formData.append("id", data.id);
  data.name && formData.append("name", data.name);
  data.price && formData.append("price", String(data.price));
  data.count && formData.append("count", String(data.count));
  if (!data.thumbnail) return formData;
  formData.append("thumbnail", data.thumbnail);
  return formData;
};

import { useQuery } from "@tanstack/react-query";
import { QueryOptionsType } from "types/QueryOptions";
import http from "utils/Http";
import { ROUTES } from "constants/routes";

export const getSingleItem = async ({ queryKey }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, _params] = queryKey;
  const { data } = await http.get(ROUTES.INVENTORY_ITEM + _params.id);
  // !ERROR this should take type InventoryItem
  // !    return { inventoryItem: { data: data as InventoryItem } };
  return data;
};

export const useGetSingleItemQuery = (options: QueryOptionsType) => {
  return useQuery([ROUTES.INVENTORY_ITEM, options], getSingleItem);
};

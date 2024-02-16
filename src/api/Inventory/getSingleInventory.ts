import { useQuery } from "@tanstack/react-query";
import { QueryOptionsType } from "types/QueryOptions";
import http from "utils/Http";
import { ROUTES } from "constants/routes";

export const getSingleInventory = async ({ queryKey }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, _params] = queryKey;
  const { data } = await http.get(ROUTES.INVENTORY_ITEMS + _params.id);
  return data;
};

export const useSingleInventoryQuery = (options: QueryOptionsType) => {
  return useQuery([ROUTES.INVENTORY_ITEMS, options], getSingleInventory);
};

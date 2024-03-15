import { useQuery } from "@tanstack/react-query";
import { http } from "utils/Http";
import { ROUTES } from "constants/routes";
import { QueryOptionsType } from "types/QueryOptions";
import { Inventory } from "types/Inventory";

export const getAllInventories = async ({ queryKey }: any) => {
  const { data } = await http.get(ROUTES.CO_INVENTORIES);
  return { inventories: { data: data as Inventory[] } };
};

export const useInventoriesQuery = (options: QueryOptionsType) => {
  return useQuery({ queryKey: ["inventory"], queryFn: getAllInventories });
};

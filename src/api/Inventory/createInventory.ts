import { useMutation } from "@tanstack/react-query";
import { Inventory } from "types/Inventory";
import { http } from "utils/Http";
import { ROUTES } from "constants/routes";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const useCreateInventory = () => {
  return useMutation<any, Error, Inventory>(
    async (createInput) => {
      const { data } = await http.post(ROUTES.INVENTORY, createInput);
      return { inventory: { data: data as Inventory } };
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["inventory"]);
      },
    },
  );
};

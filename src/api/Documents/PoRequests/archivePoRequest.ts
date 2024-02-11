import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";
import { PurchaseOrderRequest } from "types/Po_request";

export const useSavePoRequestToArchive = () => {
  return useMutation<any, Error, any>(async createInput => {
    const { data } = await http.post(ROUTES.PO_REQUEST + 'archive/', createInput, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { poRequest: { data: data as PurchaseOrderRequest } };
  });
};
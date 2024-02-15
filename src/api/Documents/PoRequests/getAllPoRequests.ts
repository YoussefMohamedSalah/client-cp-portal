import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";
import { PurchaseOrderRequest } from "types/Po_request";

export const getAllPoRequests = async () => {
  const { data } = await http.get(ROUTES.PO_REQUESTS);
  return { poRequests: { data: data as PurchaseOrderRequest[] } };
};

export const useGetAllPoRequestsQuery = () => {
  return useQuery({ queryKey: ["poRequests"], queryFn: getAllPoRequests });
};

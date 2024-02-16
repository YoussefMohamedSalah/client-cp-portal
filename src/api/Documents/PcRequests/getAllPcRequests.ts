import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";
import { PettyCashRequest } from "types/Pc_request";

export const getAllPcRequests = async () => {
  const { data } = await http.get(ROUTES.PC_REQUESTS);
  return { pcRequests: { data: data as PettyCashRequest[] } };
};

export const useGetAllPcRequestsQuery = () => {
  return useQuery({ queryKey: ["pcRequests"], queryFn: getAllPcRequests });
};

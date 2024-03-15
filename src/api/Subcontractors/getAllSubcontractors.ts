import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Subcontractor } from "types/Subcontractor";
import http from "utils/Http";

export const getAllSubcontractor = async ({ queryKey }: any) => {
  const { data } = await http.get(ROUTES.CO_SUBCONTRACTORS);
  return { subcontractors: { data: data as Subcontractor[] } };
};

export const useSubcontractorsQuery = (options: any) => {
  return useQuery({ queryKey: ["subcontractors"], queryFn: getAllSubcontractor });
};

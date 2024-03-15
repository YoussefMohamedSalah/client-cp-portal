import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export const getAllTenders = async ({ queryKey }: any) => {
  const { data } = await http.get(ROUTES.CO_TENDERS);
  return { tenders: { data: data as any } };
};

export const useTendersQuery = (options: any) => {
  return useQuery({ queryKey: ["tenders"], queryFn: getAllTenders });
};

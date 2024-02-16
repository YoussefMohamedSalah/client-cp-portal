import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Subcontractor } from "types/Subcontractor";
import http from "utils/Http";

export const getSubcontractorDetails = async ({ queryKey }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, _params] = queryKey;
  const { data } = await http.get(ROUTES.SUBCONTRACTOR + _params.id);
  return { subcontractor: { data: data as Subcontractor } };
};

export const useSubcontractorDetailsQuery = (options: any) => {
  return useQuery([ROUTES.SUBCONTRACTOR, options], getSubcontractorDetails);
};

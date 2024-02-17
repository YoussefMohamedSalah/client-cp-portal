import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Tender } from "types/Tender";
import { http } from "utils/Http";

export const getTenderDetails = async ({ queryKey }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, _params] = queryKey;
  if (_params.id) {
    const { data } = await http.get(ROUTES.TENDER + _params.id);
    return { tender: { data: data as Tender } };
  } else return null;
};

export const useTenderDetailsQuery = (options: any) => {
  return useQuery([ROUTES.TENDER, options], getTenderDetails);
};

import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export const getSingleEmployee = async ({ queryKey }: any) => {
  const [_params] = queryKey;
  const { data } = await http.post(ROUTES.EMPLOYEE + _params.id + "/");
  return { manager: { data: data as any } };
};

export const useSingleEmployee = (options: any) => {
  return useQuery<{ manager: { data: any } }, Error>(
    [ROUTES.EMPLOYEE, options],
    getSingleEmployee
  );
};

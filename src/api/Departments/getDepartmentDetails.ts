import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export const getDepartmentDetails = async ({ queryKey }: any) => {
  const [_params] = queryKey;
  const { data } = await http.post(ROUTES.CATEGORY + _params.id + "/");
  return { department: { data: data as any } };
};

export const useDepartmentDetails = (options: any) => {
  return useQuery<{ department: { data: any } }, Error>(
    [ROUTES.CATEGORY, options],
    getDepartmentDetails
  );
};

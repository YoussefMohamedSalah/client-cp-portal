import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Department } from "types/Department";
import { http } from "utils/Http";

export const getDepartmentDetails = async ({ queryKey }: any) => {
  const [_params] = queryKey;
  if(_params.id){
    const { data } = await http.post(ROUTES.CATEGORY + _params.id + "/");
  return { department: { data: data as Department } };
  }
  return null;
  
};

export const useDepartmentDetails = (options: any) => {
  return useQuery([ROUTES.CATEGORY, options], getDepartmentDetails);
};

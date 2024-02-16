import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";
import { MaterialRequest } from "types/Material_request";

export const getMaterialRequestDetails = async ({ queryKey }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, _params] = queryKey;
  if (_params.id) {
    const { data } = await http.get(ROUTES.MATERIAL_REQUEST + _params.id);
    return { materialRequestDetails: { data: data as MaterialRequest } };
  } else return null;
};

export const useMaterialRequestDetailsQuery = (options: any) => {
  return useQuery([ROUTES.MATERIAL_REQUEST, options], getMaterialRequestDetails);
};

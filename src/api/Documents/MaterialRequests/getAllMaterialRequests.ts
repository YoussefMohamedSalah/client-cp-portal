import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "@/constants/routes";
import { http } from "@/utils/Http";
import MaterialRequest from "@/types/Material_request";

export const getAllMaterialRequests = async () => {
    const { data } = await http.get(ROUTES.MATERIAL_REQUESTS);
    return { materialRequests: { data: data as MaterialRequest[] } };
};

export const useGetAllMaterialRequestsQuery = () => {
    return useQuery({ queryKey: ['materialRequests'], queryFn: getAllMaterialRequests })
};

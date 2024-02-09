import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";
import { PurchaseOrderRequest } from "types/Po_request";

export const getPoRequestDetails = async ({ queryKey }: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_key, _params] = queryKey;
    const { data } = await http.get(ROUTES.PO_REQUEST + _params.id);
    return { poRequestDetails: { data: data as PurchaseOrderRequest } };
};

export const usePoRequestDetailsQuery = (options: any) => {
    return useQuery(
        [ROUTES.PO_REQUEST, options],
        getPoRequestDetails
    );
};

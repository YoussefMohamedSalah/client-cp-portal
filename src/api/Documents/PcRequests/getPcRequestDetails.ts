import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";
import { PettyCashRequest } from "types/Pc_request";

export const getPcRequestDetails = async ({ queryKey }: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_key, _params] = queryKey;
    const { data } = await http.get(ROUTES.PC_REQUEST + _params.id);
    return { pcRequestDetails: { data: data as PettyCashRequest } };
};

export const usePcRequestDetailsQuery = (options: any) => {
    return useQuery(
        [ROUTES.PC_REQUEST, options],
        getPcRequestDetails
    );
};

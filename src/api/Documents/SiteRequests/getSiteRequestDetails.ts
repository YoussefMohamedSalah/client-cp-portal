import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";
import { SiteRequest } from "types/Site_request";

export const getSiteRequestDetails = async ({ queryKey }: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_key, _params] = queryKey;
    const { data } = await http.get(ROUTES.SITE_REQUEST + _params.id);
    return { siteRequestDetails: { data: data as SiteRequest } };
};

export const useSiteRequestDetailsQuery = (options: any) => {
    return useQuery(
        [ROUTES.SITE_REQUEST, options],
        getSiteRequestDetails
    );
};

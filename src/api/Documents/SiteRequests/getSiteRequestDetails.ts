import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";
import { SiteRequest } from "types/Site_request";

export const getSiteRequestDetails = async ({ queryKey }: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_key, _params] = queryKey;
    if (_params.id) {
        const { data } = await http.get(ROUTES.SITE_REQUEST + _params.id);
        return { siteRequestDetails: { data: data as SiteRequest } };
    } else return null;
};

export const useSiteRequestDetailsQuery = (options: any) => {
    return useQuery(
        [ROUTES.SITE_REQUEST, options],
        getSiteRequestDetails
    );
};

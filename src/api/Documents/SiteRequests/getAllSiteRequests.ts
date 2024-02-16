import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";
import { SiteRequest } from "types/Site_request";

export const getAllSiteRequests = async () => {
  const { data } = await http.get(ROUTES.SITE_REQUESTS);
  return { siteRequests: { data: data as SiteRequest[] } };
};

export const useGetAllSiteRequestsQuery = () => {
  return useQuery({ queryKey: ["siteRequests"], queryFn: getAllSiteRequests });
};

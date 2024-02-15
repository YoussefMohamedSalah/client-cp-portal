import { useMutation } from "@tanstack/react-query";
import http from "utils/Http";
import { ROUTES } from "constants/routes";
import { SiteRequest } from "types/Site_request";

export const useCreateSiteRequest = () => {
  return useMutation<any, Error, any>(async (createInput) => {
    const { projectId } = createInput;
    const { data } = await http.post(ROUTES.SITE_REQUEST, { ...createInput, projectId });
    return { siteRequest: { data: data as SiteRequest } };
  });
};

export const siteRequestInput = (data: any): any => {
  return {
    subject: data.subject ? data.subject : null,
    date: data.date ? data.date : null,
    description: data.description ? data.description : null,
  };
};

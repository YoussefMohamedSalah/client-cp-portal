import { useMutation } from "@tanstack/react-query";
import http from "utils/Http";
import { ROUTES } from "constants/routes";
import { SiteRequest } from "types/Site_request";

export const useEditSiteRequest = () => {
  return useMutation<any, Error, any>(async (updateInput) => {
    const { id } = updateInput;
    const { data } = await http.put(ROUTES.SITE_REQUEST + id, updateInput.data);
    return { siteRequest: { data: data as SiteRequest } };
  });
};

export const siteEditInput = (data: any): any => {
  return {
    id: data.id ? data.id : null,
    subject: data.subject ? data.subject : null,
    date: data.date ? data.date : null,
    description: data.description ? data.description : null,
    is_archived: data.is_archived ? data.is_archived : null,
  };
};

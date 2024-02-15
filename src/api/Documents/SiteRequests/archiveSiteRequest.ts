import { useMutation } from "@tanstack/react-query";
import http from "utils/Http";
import { ROUTES } from "constants/routes";
import { SiteRequest } from "types/Site_request";

export const useSaveSiteRequestToArchive = () => {
  return useMutation<any, Error, any>(async (createInput) => {
    const { id } = createInput;
    const { data } = await http.post(
      ROUTES.SITE_REQUEST + "archive/",
      { ...createInput.data, projectId: id },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return { siteREquest: { data: data as SiteRequest } };
  });
};

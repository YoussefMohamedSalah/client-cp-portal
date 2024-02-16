import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";
import { PettyCashRequest } from "types/Pc_request";

export const useCreatePcRequest = () => {
  return useMutation<any, Error, any>(async (createInput) => {
    const { data } = await http.post(ROUTES.PC_REQUEST, createInput, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { pcRequests: { data: data as PettyCashRequest } };
  });
};

export const pcRequestInput = (data: any): any => {
  if (!data.files || data.files.length === 0) {
    return {
      id: data.id ? data.id : null,
      subject: data.subject ? data.subject : null,
      date: data.date ? data.date : null,
      description: data.description ? data.description : null,
      total: data.total ? data.total : null,
      items: data.items ? data.items : null,
      projectId: data.projectId ? data.projectId : "",
    };
  }

  const formData = new FormData();
  data.id && formData.append("id", data.id);
  data.subject && formData.append("subject", data.subject);
  data.date && formData.append("date", data.date);
  data.description && formData.append("description", data.description);
  data.total && formData.append("total", data.total);
  data.items && formData.append("items", data?.items!);
  data.projectId && formData.append("projectId", data.projectId);
  data.filesNameSet && formData.append("filesNameSet", data.filesNameSet);
  for (let file of data.files) {
    formData.append("files", file);
  }
  return formData;
};

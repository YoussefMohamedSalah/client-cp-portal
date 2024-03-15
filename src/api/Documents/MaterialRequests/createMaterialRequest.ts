import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";
import { MaterialRequest } from "types/Material_request";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const useCreateMaterialRequest = () => {
  return useMutation<any, Error, any>(async (createInput) => {
    const { data } = await http.post(ROUTES.MATERIAL_REQUEST, createInput, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { materialRequest: { data: data as MaterialRequest } };
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(["materialRequests"]);
    }
  });
};

export const materialRequestInput = (data: any): any => {
  if (!data.files || data.files.length === 0) {
    return {
      id: data.id ? data.id : null,
      subject: data.subject ? data.subject : null,
      description: data.description ? data.description : null,
      date: data.date ? data.date : null,
      items: data.items ? data.items : null,
      projectId: data.projectId ? data.projectId : "",
    };
  }

  const formData = new FormData();
  data.id && formData.append("id", data.id);
  data.subject && formData.append("subject", data.subject);
  data.description && formData.append("description", data.description);
  data.items && formData.append("items", data?.items!);
  data.date && formData.append("date", data.date);
  data.projectId && formData.append("projectId", data.projectId);
  data.filesNameSet && formData.append("filesNameSet", data.filesNameSet);
  for (let file of data.files) {
    formData.append("files", file);
  }
  return formData;
};

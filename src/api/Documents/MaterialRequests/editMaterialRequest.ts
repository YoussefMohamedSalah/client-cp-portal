import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";
import { MaterialRequest } from "types/Material_request";

export const useEditMaterialRequest = () => {
  return useMutation<any, Error, any>(async updateInput => {
    const { id } = updateInput;
    const { data } = await http.put(ROUTES.MATERIAL_REQUEST + id, updateInput.data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { materialRequest: { data: data as MaterialRequest } };
  });
};

export const materialEditInput = (data: any): any => {
  if (!data.files || data.files.length === 0) {
    return {
      id: data.id ? data.id : null,
      subject: data.subject ? data.subject : null,
      description: data.description ? data.description : null,
      date: data.date ? data.date : null,
      items: data.items ? data.items : null,
      removedFilesNameSet: data.removedFilesNameSet ? data.removedFilesNameSet : [],
      addedFilesNameSet: data.addedFilesNameSet ? data.addedFilesNameSet : [],
      is_archived: data.is_archived ? data.is_archived : null,
    };
  }

  const formData = new FormData();
  (data.id) && formData.append("id", data.id);
  (data.subject) && formData.append("subject", data.subject);
  (data.description) && formData.append("description", data.description);
  (data.items) && formData.append("items", data?.items!);
  (data.date) && formData.append("date", data.date);
  (data.removedFilesNameSet) && formData.append("removedFilesNameSet", data.removedFilesNameSet);
  (data.addedFilesNameSet) && formData.append("addedFilesNameSet", data.addedFilesNameSet);
  (data.is_archived) && formData.append("is_archived", data.is_archived);
  for (let file of data.files) {
    formData.append("files", file);
  }
  return formData;
};


import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";
import { Contract } from "types/Contract";

export const useEditContract = () => {
  return useMutation<any, Error, any>(async updateInput => {
    const { id } = updateInput;
    const { data } = await http.put(ROUTES.CONTRACT + id, updateInput.data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { contract: { data: data as Contract } };
  });
};

export const editContractInput = (data: any): any => {
  if (!data.uploadedFiles || data.uploadedFiles.length === 0) {
    return {
      subcontractorId: data.subcontractor.id,
      items: data.items,
      conditions: data.conditions,
      default_conditions: data.default_conditions ? data.default_conditions : null,
      date: data.date,
      removedFilesNameSet: data.removedFilesNameSet ? data.removedFilesNameSet : '[]',
      addedFilesNameSet: data.addedFilesNameSet ? data.addedFilesNameSet : '[]',
      is_archived: data.is_archived ? data.is_archived : null,
      // --------
      sub_total: data.sub_total ? data.sub_total : null,
      vat: data.vat ? data.vat : null,
      discount: data.discount ? data.discount : null,
      total: data.total ? data.total : null,
    } as any;
  }


  const formData = new FormData();
  (data.sub_total) && formData.append("sub_total", data?.sub_total! || 0);
  (data.vat) && formData.append("vat", data.vat || 0);
  (data.discount) && formData.append("discount", data?.discount! || 0);
  (data.total) && formData.append("total", data.total || 0);
  (data.projectId) && formData.append("projectId", data.projectId);
  (data.date) && formData.append("date", data.date);
  (data.items) && formData.append("items", data?.items!);
  (data.conditions) && formData.append("conditions", data.conditions);
  (data.default_conditions) && formData.append("default_conditions", data.default_conditions);
  (data.subcontractorId) && formData.append("subcontractor", data.subcontractor.id);
  (data.removedFilesNameSet) && formData.append("removedFilesNameSet", data.removedFilesNameSet);
  (data.addedFilesNameSet) && formData.append("addedFilesNameSet", data.addedFilesNameSet);
  (data.is_archived) && formData.append("is_archived", data.is_archived);
  for (let file of data.uploadedFiles) {
    formData.append("files", file);
  }
  return formData;
};


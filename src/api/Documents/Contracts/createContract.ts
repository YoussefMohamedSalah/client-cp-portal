import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";
import { Contract } from "types/Contract";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const useCreateContract = () => {
  return useMutation<any, Error, any>(
    async (createInput) => {
      const { projectId } = createInput;
      const { data } = await http.post(ROUTES.CONTRACT + projectId, createInput.data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return { contract: { data: data as Contract } };
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["contracts"]);
      },
    },
  );
};

export const contractInput = (data: any): any => {
  if (!data.files || data.files.length === 0) {
    return {
      subcontractorId: data.subcontractor!,
      items: data.items,
      subject: data.subject,
      conditions: data.conditions,
      default_conditions: data.default_conditions ? data.default_conditions : null,
      date: data.date,
      // --------
      sub_total: data.sub_total ? data.sub_total : 0,
      vat: data.vat ? data.vat : 0,
      discount: data.discount ? data.discount : 0,
      total: data.total ? data.total : 0,
    } as any;
  }

  const formData = new FormData();
  data.sub_total && formData.append("sub_total", data?.sub_total!);
  data.vat && formData.append("vat", data.vat!);
  data.discount && formData.append("discount", data?.discount!);
  data.total && formData.append("total", data.total!);
  data.date && formData.append("date", data.date);
  data.subject && formData.append("subject", data.subject!);
  data.items && formData.append("items", data?.items!);
  data.conditions && formData.append("conditions", data.conditions);
  data.default_conditions && formData.append("default_conditions", data.default_conditions);
  data.subcontractor && formData.append("subcontractorId", data.subcontractor!);
  data.filesNameSet && formData.append("filesNameSet", data.filesNameSet);
  for (let file of data.files) {
    formData.append("files", file);
  }
  return formData;
};

import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";
import { PurchaseOrderRequest } from "types/Po_request";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const useCreatePoRequest = () => {
  return useMutation<any, Error, any>(
    async (createInput) => {
      const { data } = await http.post(ROUTES.PO_REQUEST, createInput, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return { poRequest: { data: data as PurchaseOrderRequest } };
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["poRequests"]);
      },
    },
  );
};

export const poRequestInput = (data: any): any => {
  if (!data.files || data.files.length === 0) {
    return {
      id: data.id ? data.id : null,
      subject: data.subject ? data.subject : null,
      transportation: data.transportation ? data.transportation : null,
      date: data.date ? data.date : null,
      delivery_date: data.delivery_date ? data.delivery_date : null,
      material_availability: data.material_availability ? data.material_availability : null,
      description: data.description ? data.description : null,
      supplierId: data.supplier ? data.supplier.id : null,
      projectId: data.projectId ? data.projectId : "",
      // --------
      items: data.items ? data.items : null,
      conditions: data.conditions ? data.conditions : null,
      default_conditions: data.default_conditions ? data.default_conditions : null,
      installments: data.installments ? data.installments : null,
      payment_type: data.payment_type ? data.payment_type : "cash",
      // --------
      sub_total: data.sub_total ? data.sub_total : 0,
      vat: data.vat ? data.vat : 0,
      discount: data.discount ? data.discount : 0,
      total: data.total ? data.total : 0,
    };
  }

  const formData = new FormData();
  data.id && formData.append("id", data.id);
  data.sub_total && formData.append("sub_total", data?.sub_total! || 0);
  data.vat && formData.append("vat", data.vat || 0);
  data.discount && formData.append("discount", data?.discount! || 0);
  data.total && formData.append("total", data.total || 0);
  // --
  data.items && formData.append("items", data?.items!);
  data.conditions && formData.append("conditions", data.conditions);
  data.default_conditions && formData.append("default_conditions", data.default_conditions);
  data.installments && formData.append("installments", data?.installments!);
  data.payment_type && formData.append("payment_type", data?.payment_type!);
  !data.payment_type && formData.append("payment_type", "cash");
  // --
  data.transportation && formData.append("transportation", data.transportation);
  data.delivery_date && formData.append("delivery_date", data.delivery_date);
  data.material_availability && formData.append("material_availability", data.material_availability);
  data.supplier && formData.append("supplierId", data.supplier.id);
  data.subject && formData.append("subject", data.subject);
  data.description && formData.append("description", data.description);
  data.date && formData.append("date", data.date);
  data.filesNameSet && formData.append("filesNameSet", data.filesNameSet);
  data.projectId && formData.append("projectId", data.projectId);
  for (let file of data.files) {
    formData.append("files", file);
  }
  return formData;
};

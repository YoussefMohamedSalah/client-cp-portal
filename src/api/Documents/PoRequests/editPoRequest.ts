import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";
import { PurchaseOrderRequest } from "types/Po_request";

export const useEditPoRequest = () => {
  return useMutation<any, Error, any>(async (updateInput) => {
    const { id } = updateInput;
    const { data } = await http.put(ROUTES.PO_REQUEST + id, updateInput.data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { poRequest: { data: data as PurchaseOrderRequest } };
  });
};

export const poEditInput = (data: any): any => {
  // discount
  if (!data.files || data.files.length === 0) {
    return {
      id: data.id ? data.id : null,
      subject: data.subject ? data.subject : null,
      transportation: data.transportation ? data.transportation : null,
      delivery_date: data.delivery_date ? data.delivery_date : null,
      material_availability: data.material_availability ? data.material_availability : null,
      supplierId: data.supplierId ? data.supplierId : null,
      description: data.description ? data.description : null,
      date: data.date ? data.date : null,
      removedFilesNameSet: data.removedFilesNameSet ? data.removedFilesNameSet : [],
      addedFilesNameSet: data.addedFilesNameSet ? data.addedFilesNameSet : [],
      is_archived: data.is_archived ? data.is_archived : null,
      // --------
      items: data.items ? data.items : null,
      conditions: data.conditions ? data.conditions : null,
      default_conditions: data.default_conditions ? data.default_conditions : null,
      installments: data.installments ? data.installments : null,
      payment_type: data.payment_type ? data.payment_type : null,
      // --------
      sub_total: data.sub_total ? data.sub_total : null,
      vat: data.vat ? data.vat : null,
      discount: data.discount ? data.discount : null,
      total: data.total ? data.total : null,
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
  data.supplierId && formData.append("supplierId", data.supplierId);
  data.subject && formData.append("subject", data.subject);
  data.description && formData.append("description", data.description);
  data.date && formData.append("date", data.date);
  data.is_archived && formData.append("is_archived", data.is_archived);
  data.removedFilesNameSet && formData.append("removedFilesNameSet", data.removedFilesNameSet);
  data.addedFilesNameSet && formData.append("addedFilesNameSet", data.addedFilesNameSet);
  for (let file of data.files) {
    formData.append("files", file);
  }
  return formData;
};

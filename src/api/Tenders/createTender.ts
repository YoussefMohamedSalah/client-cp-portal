import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Tender, SelectedTender } from "types/Tender";
import { http } from "utils/Http";

export const useCreateTender = () => {
  return useMutation<any, Error, FormData>(async (createInput) => {
    const { data } = await http.post(ROUTES.TENDER, createInput, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { tender: { data: data as Tender } };
  });
};

export const tenderInput = (data: Tender): any => {
  if (!data.thumbnail?.size) {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      latitude: data.latitude,
      longitude: data.longitude,
      bid_value: data.bid_value,
      total_budget: data.total_budget,
      po_budget: data.po_budget,
      pc_budget: data.pc_budget,
      staff_budget: data.staff_budget,
      subcontractor_budget: data.subcontractor_budget,
      contract_date: data.contract_date,
      delivery_date: data.delivery_date,
      duration: data.duration,
      sites_count: data.sites_count ? data.sites_count : 0,
      buildings_count: data.buildings_count ? data.buildings_count : 0,
      floors_count: data.floors_count ? data.floors_count : 0,
      contract_number: data.contract_number,
      manager: data.manager,
      assistants: data.assistants ? data.assistants : [],
      tender_status: data.tender_status,
      members: data.members,
      customerId: data.customer,
    } as SelectedTender;
  }

  const formData = new FormData();
  data.id && formData.append("id", data.id);
  data.name && formData.append("name", data.name);
  data.description && formData.append("description", data?.description!);
  data.latitude && formData.append("latitude", `${data?.latitude!}`);
  data.longitude && formData.append("longitude", `${data?.longitude!}`);
  data.bid_value && formData.append("bid_value", `${data?.bid_value!}`);
  data.total_budget && formData.append("total_budget", `${data?.total_budget!}`);
  data.po_budget && formData.append("po_budget", `${data?.po_budget!}`);
  data.pc_budget && formData.append("pc_budget", `${data?.pc_budget!}`);
  data.staff_budget && formData.append("staff_budget", `${data?.staff_budget!}`);
  data.subcontractor_budget && formData.append("subcontractor_budget", `${data?.subcontractor_budget!}`);
  data.contract_date && formData.append("contract_date", data?.contract_date!);
  data.delivery_date && formData.append("delivery_date", data?.delivery_date!);
  data.duration && formData.append("duration", `${data?.duration!}`);
  formData.append("sites_count", `${data.sites_count ? data.sites_count : 0}`);
  formData.append("buildings_count", `${data.buildings_count ? data.buildings_count : 0}`);
  formData.append("floors_count", `${data.floors_count ? data.floors_count : 0}`);
  data.contract_number && formData.append("contract_number", `${data?.contract_number!}`);
  data.manager && formData.append("manager", `${data?.manager!}`);
  data.assistants && formData.append("assistants", `${data.assistants!}`);
  data.tender_status && formData.append("tender_status", `${data?.tender_status!}`);
  data.members && formData.append("members", `${data?.members!}`);
  data.customer && formData.append("customerId", `${data?.customer!}`);
  if (!data.thumbnail) return formData;
  formData.append("thumbnail", data.thumbnail);
  return formData;
};

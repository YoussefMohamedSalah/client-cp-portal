import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Project } from "types/Project";
import { http } from "utils/Http";

export const useUpdateProject = () => {
  return useMutation<any, Error, any>(async (updateInput) => {
    const { data } = await http.put(ROUTES.PROJECT + updateInput.id, updateInput.data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { project: { data: data as any } };
  });
};

export const projectUpdateInput = (data: Project): any => {
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
      managerId: data.manager,
      assistants: data.assistants ? data.assistants : [],
      project_status: data.project_status,
      comments: data.comments,
      members: data.members,
      tasks: data.tasks,
    } as any;
  }

  const formData = new FormData();
  formData.append("name", data?.name!);
  formData.append("description", data?.description!);
  formData.append("latitude", `${data?.latitude!}`);
  formData.append("longitude", `${data?.longitude!}`);
  formData.append("bid_value", `${data?.bid_value!}`);
  formData.append("total_budget", `${data?.total_budget!}`);
  formData.append("po_budget", `${data?.po_budget!}`);
  formData.append("pc_budget", `${data?.pc_budget!}`);
  formData.append("staff_budget", `${data?.staff_budget!}`);
  formData.append("subcontractor_budget", `${data?.subcontractor_budget!}`);
  formData.append("contract_date", data?.contract_date!);
  formData.append("delivery_date", data?.delivery_date!);
  formData.append("duration", `${data?.duration!}`);
  formData.append("sites_count", `${data.sites_count ? data.sites_count : 0}`);
  formData.append("buildings_count", `${data.buildings_count ? data.buildings_count : 0}`);
  formData.append("floors_count", `${data.floors_count ? data.floors_count : 0}`);
  formData.append("contract_number", `${data?.contract_number!}`);
  formData.append("managerId", `${data?.manager!}`);
  formData.append("assistants", `${data?.assistants!}`);
  formData.append("project_status", `${data?.project_status!}`);
  formData.append("comments", `${data?.comments!}`);
  formData.append("members", `${data?.members!}`);
  formData.append("tasks", `${data?.tasks!}`);
  if (!data.thumbnail) return formData;
  formData.append("thumbnail", data.thumbnail);
  return formData;
};

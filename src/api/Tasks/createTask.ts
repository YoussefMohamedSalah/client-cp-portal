import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Task } from "types/Task";
import { http } from "utils/Http";

export const useCreateTask = () => {
  return useMutation<any, Error, FormData>(async (createInput) => {
    const { data } = await http.post(ROUTES.TASK, createInput, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { task: { data: data as Task } };
  });
};

export const taskInput = (data: Task): any => {
  if (!data.thumbnail?.size) {
    return {
      name: data.name,
      description: data.description,
      task_type: data.task_type,
      task_priority: data.task_priority,
      assigned_to: data.assigned_to,
      project: data.project.id,
      start_at: data.start_at,
      end_at: data.end_at,
    } as any;
  }

  const formData = new FormData();
  data.name && formData.append("name", data.name);
  data.description && formData.append("description", data?.description!);
  data.task_type && formData.append("task_type", `${data?.task_type!}`);
  data.task_priority &&
    formData.append("task_priority", `${data?.task_priority!}`);
  data.assigned_to && formData.append("assigned_to", `${data?.assigned_to!}`);
  data.project && formData.append("project", `${data?.project?.id!}`);
  data.start_at && formData.append("start_at", `${data?.start_at!}`);
  data.end_at && formData.append("end_at", `${data?.end_at!}`);

  if (!data.thumbnail) return formData;
  formData.append("thumbnail", data.thumbnail);
  return formData;
};

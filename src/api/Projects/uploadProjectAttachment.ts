import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { ProjectAttachment } from "types/Project";
import { http } from "utils/Http";

export const useUploadProjectAttachment = () => {
  return useMutation<any, Error, FormData>(async (createInput) => {
    const { data } = await http.post(ROUTES.PROJECT_ATTACHMENT, createInput, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { project: { data: data as any } };
  });
};

export const projectAttachmentInput = (data: ProjectAttachment): FormData => {
  const formData = new FormData();
  formData.append("project", `${data.project}`);
  for (let file of data.files) {
    formData.append("files", file);
  }
  return formData;
};

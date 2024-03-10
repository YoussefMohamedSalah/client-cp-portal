import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import http from "utils/Http";

export interface Attachment {
  file: File;
}

export const useAddEmployeesByCsvFile = () => {
  return useMutation<any, Error, FormData>(async (createInput) => {
    const { data } = await http.post(ROUTES.EMPLOYEES_CSV + "add", createInput, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { data: { data: data as any } };
  });
};

export const useReplaceEmployeesByCsvFile = () => {
  return useMutation<any, Error, FormData>(async (createInput) => {
    const { data } = await http.post(ROUTES.EMPLOYEES_CSV + "replace", createInput, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { data: { data: data as any } };
  });
};

export const useUpdateEmployeesByCsvFile = () => {
  return useMutation<any, Error, FormData>(async (createInput) => {
    const { data } = await http.post(ROUTES.EMPLOYEES_CSV + "update", createInput, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { data: { data: data as any } };
  });
};

export const useDeleteEmployeesByCsvFile = () => {
  return useMutation<any, Error, FormData>(async (createInput) => {
    const { data } = await http.post(ROUTES.EMPLOYEES_CSV + "delete", createInput, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { data: { data: data as any } };
  });
};

export const employeesCsvAttachmentInput = (data: Attachment): FormData => {
  const formData = new FormData();
  formData.append("file", data.file);
  return formData;
};

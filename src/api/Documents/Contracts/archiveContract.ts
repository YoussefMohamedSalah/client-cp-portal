import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";
import { Contract } from "types/Contract";

export const useSaveContractToArchive = () => {
  return useMutation<any, Error, any>(async createInput => {
    const { projectId } = createInput;
    const { data } = await http.post(ROUTES.CONTRACT + 'archive/' + projectId, createInput.data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { contract: { data: data as Contract } };
  });
};
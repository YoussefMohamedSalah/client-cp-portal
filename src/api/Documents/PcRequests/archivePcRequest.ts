import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";
import { PettyCashRequest } from "types/Pc_request";


export const useSavePcRequestToArchive = () => {
  return useMutation<any, Error, any>(async createInput => {
    const { data } = await http.post(ROUTES.PC_REQUEST + 'archive/', createInput, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { pcRequest: { data: data as PettyCashRequest } };
  });
};
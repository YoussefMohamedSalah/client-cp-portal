import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";
import { MaterialRequest } from "types/Material_request";

export const useSaveMaterialRequestToArchive = () => {
  return useMutation<any, Error, any>(async (createInput) => {
    const { data } = await http.post(ROUTES.MATERIAL_REQUEST + "archive/", createInput, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { materialRequest: { data: data as MaterialRequest } };
  });
};

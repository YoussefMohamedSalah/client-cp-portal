import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Subcontractor } from "types/Subcontractor";
import http from "utils/Http";

export const useGetSubcontractor = () => {
  return useMutation<any, Error, Subcontractor>(async (createInput) => {
    const { id } = createInput;
    const { data } = await http.get(ROUTES.SUBCONTRACTOR + id);
    return { subcontractor: { data: data as Subcontractor } };
  });
};

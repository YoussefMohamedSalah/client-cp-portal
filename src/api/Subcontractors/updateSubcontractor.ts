import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { SelectedSubcontractor, Subcontractor } from "types/Subcontractor";
import http from "utils/Http";

export const useUpdateSubcontractor = () => {
  return useMutation<any, Error, any>(async updateInput => {
    const { data } = await http.put(ROUTES.SUBCONTRACTOR + updateInput.id, updateInput.data);
    return { subcontractor: { data: data as Subcontractor } };
  });
};

export const subcontractorUpdateInput = (data: SelectedSubcontractor): any => {
  return {
    id: data.id,
    subcontractor_type: data.subcontractor_type,
    company_name: data.company_name,
    vat_on: data.vat_on,
    representative: data.representative,
    phone_number: data.phone_number,
    email: data.email,
    country: data.country,
    city: data.city,
    area: data.area,
    street: data.street,
    building_number: data.building_number,
    postal_code: data.postal_code,
  } as SelectedSubcontractor;
};
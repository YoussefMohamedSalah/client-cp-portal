import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Subcontractor } from "types/Subcontractor";
import http from "utils/Http";

export const useCreateSubcontractor = () => {
  return useMutation<any, Error, Subcontractor>(async createInput => {
    const { data } = await http.post(ROUTES.SUBCONTRACTOR, createInput);
    return { subcontractor: { data: data as Subcontractor } };
  });
};

export const subcontractorInput = (data: Subcontractor): any => {
  return {
    company_name: data.company_name,
    phone_number: data.phone_number,
    email: data.email,
    subcontractor_type: data.subcontractor_type,
    vat_on: data.vat_on,
    name: data.name,
    country: data.country,
    city: data.city,
    area: data.area,
    street: data.street,
    building_number: data.building_number,
    postal_code: data.postal_code,
  }
};
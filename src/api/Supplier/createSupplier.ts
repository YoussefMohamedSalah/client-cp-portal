import { useMutation } from "@tanstack/react-query";
import { Supplier } from "types/Supplier";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export const useCreateSupplier = () => {
  return useMutation<any, Error, Supplier>(async createInput => {
    const { data } = await http.post(ROUTES.SUPPLIER, createInput);
    return { data: data as any };
  });
};

export const supplierInput = (data: Supplier): any => {
  return {
    company_name: data.company_name,
    phone_number: data.phone_number,
    email: data.email,
    supplier_type: data.supplier_type,
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
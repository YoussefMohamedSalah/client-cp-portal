import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { createSupplierInput } from "types/Supplier";
import { http } from "utils/Http";

export const useCreateSupplier = () => {
  return useMutation<any, Error, createSupplierInput>(async createInput => {
    const { data } = await http.post(ROUTES.SUPPLIER, createInput);
    return { data: data as any };
  });
};

export const supplierInput = (data: createSupplierInput): any => {
  return {
    company_name: data.company_name,
    phone_number: data.phone_number,
    email: data.email,
    supplier_type: data.supplier_type,
    vat_on: data.vat_on,
    representative: data.representative,
    country: data.country,
    city: data.city,
    area: data.area,
    street: data.street,
    building_number: data.building_number,
    postal_code: data.postal_code,
  }
};
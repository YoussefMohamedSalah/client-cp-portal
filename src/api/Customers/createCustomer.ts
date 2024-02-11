import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Customer } from "types/Customer";
import http from "utils/Http";

export const useCreateCustomer = () => {
  return useMutation<any, Error, Customer>(async createInput => {
    const { data } = await http.post(ROUTES.CUSTOMER, createInput);
    return { customer: { data: data as Customer } };
  });
};

export const customerInput = (data: Customer): any => {
  return {
    company_name: data.company_name,
    phone_number: data.phone_number,
    email: data.email,
    customer_type: data.customer_type,
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
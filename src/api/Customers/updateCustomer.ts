import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Customer } from "types/Customer";
import http from "utils/Http";

export const useUpdateCustomer = () => {
  return useMutation<any, Error, any>(async updateInput => {
    const { data } = await http.put(ROUTES.CUSTOMER + updateInput.id, updateInput.data);
    return { customer: { data: data as Customer } };
  });
};

export const customerUpdateInput = (data: Customer): any => {
  return {
    id: data.id,
    customer_type: data.customer_type,
    company_name: data.company_name,
    vat_on: data.vat_on,
    name: data.name,
    phone_number: data.phone_number,
    email: data.email,
    country: data.country,
    city: data.city,
    area: data.area,
    street: data.street,
    building_number: data.building_number,
    postal_code: data.postal_code,
  } as Customer;
};
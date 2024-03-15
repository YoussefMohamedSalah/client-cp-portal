import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";
import { Company } from "types/Company";

export const useCompany = () => {
  return useMutation<any, Error, FormData>(async (createInput) => {
    console.log(createInput)
    const { data } = await http.put(ROUTES.COMPANY, createInput, {
      headers: {
        'Content-Type': "multipart/form-data"
      },
    });
    return { company: { data: data as Company } };
  });
};

export const companyInput = (data: any): any => {
  if (!data.logo?.size!) {
    return {
      name: data.name,
      size: data.size,
      address: data.address,
      email: data.email,
      phone_number: data.phone_number,
      shift_start: data.shift_start,
      shift_end: data.shift_end,
      vat: data.vat,
      currency: data.currency,
    } as any;
  }
  const formData = new FormData();
  if (data.name) formData.append("name", `${data.name}`);
  if (data.size) formData.append("size", data?.size!);
  if (data.address) formData.append("address", data?.address!);
  if (data.email) formData.append("email", data?.email!);
  if (data.phone_number) formData.append("phone_number", data?.phone_number!);
  if (data.shift_start) formData.append("shift_start", data?.shift_start!);
  if (data.shift_end) formData.append("shift_end", data?.shift_end!);
  if (data.vat) formData.append("vat", data?.vat!);
  if (data.currency) formData.append("currency", data?.currency!);
  if (!data.logo) return formData;
  formData.append("logo", data.logo);
  return formData;
};
import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Employee } from "types/Employee";
import { http } from "utils/Http";

export const useUpdateEmployee = () => {
  return useMutation<any, Error, any>(async (updateInput) => {
    const { data } = await http.put(ROUTES.EMPLOYEE + updateInput.id, updateInput.data);
    return { employee: { data: data as Employee } };
  });
};

export const employeeUpdateInput = (data: Employee): any => {
  return {
    id: data.id,
    address: data.address,
    business_title: data.business_title,
    contract_date: data.contract_date,
    contract_ex: data.contract_ex,
    department: data.department,
    email: data.email,
    gender: data.gender,
    iban_number: data.iban_number,
    id_ex_date: data.id_ex_date,
    id_number: data.id_number,
    joining_date: data.joining_date,
    name: data.name,
    nationality: data.nationality,
    phone_number: data.phone_number,
    projects: data.projects,
    // renewal_of_residence: data.renewal_of_residence,
    residence_number: data.residence_number,
    role: data.role,
    salary_per_month: data.salary_per_month,
    shift_start: data.shift_start,
    shift_end: data.shift_end,
    site_job: data.site_job,
    site_role: data.site_role,
  };
};

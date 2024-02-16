import { useMutation } from "@tanstack/react-query";
import { Employee } from "types/Employee";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export const useCreateEmployee = () => {
  return useMutation<any, Error, Employee>(async (createInput) => {
    const { data } = await http.post(ROUTES.EMPLOYEE, createInput, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { employee: { data: data as Employee } };
  });
};

export const employeeInput = (data: Employee): any => {
  if (!data.avatar?.size) {
    return {
      name: data.name,
      email: data.email,
      password: data.password!,
      phone_number: data.phone_number,
      departmentId: data.department,
      projects: data.projects,
      // manager: data.manager,
      business_title: data.business_title ? data.business_title : "Engineer",
      // is_manager: data.is_manager,
      gender: data.gender,
      shift_start: data.shift_start,
      shift_end: data.shift_end,
      id_number: data.id_number,
      id_ex_date: data.id_ex_date,
      contract_date: data.contract_date,
      contract_ex: data.contract_ex,
      salary_per_month: data.salary_per_month,
      role: data.role,
      residence_number: data.residence_number,
      nationality: data.nationality,
      site_role: data.site_role,
      site_job: data.site_job,
      joining_date: data.joining_date,
      iban_number: data.iban_number,
    };
  }

  const formData = new FormData();
  data.name && formData.append("name", data.name);
  data.email && formData.append("email", data?.email!);
  data.password && formData.append("password", data?.password!);
  data.phone_number && formData.append("phone_number", `${data?.phone_number!}`);
  data.department && formData.append("departmentId", `${data?.department!}`);
  data.projects && formData.append("projects", `${data?.projects!}`);
  // (data.manager) && formData.append("manager", `${data?.manager!}`);
  data.business_title && formData.append("business_title", `${data?.business_title!}`);
  // (data.is_manager) && formData.append("is_manager", `${data?.is_manager!}`);
  data.gender && formData.append("gender", `${data?.gender!}`);
  data.shift_start && formData.append("shift_start", `${data?.shift_start!}`);
  data.shift_end && formData.append("shift_end", data?.shift_end!);
  data.id_number && formData.append("id_number", data?.id_number!);
  data.id_ex_date && formData.append("id_ex_date", `${data?.id_ex_date!}`);
  data.contract_date && formData.append("contract_date", `${data?.contract_date!}`);
  data.contract_ex && formData.append("contract_ex", `${data?.contract_ex!}`);
  data.salary_per_month && formData.append("salary_per_month", `${data?.salary_per_month!}`);
  data.residence_number && formData.append("residence_number", `${data?.residence_number!}`);
  data.nationality && formData.append("nationality", `${data?.nationality!}`);
  data.site_role && formData.append("site_role", `${data?.site_role!}`);
  data.site_job && formData.append("site_job", `${data?.site_job!}`);
  data.joining_date && formData.append("joining_date", `${data?.joining_date!}`);
  data.iban_number && formData.append("iban_number", `${data?.iban_number!}`);

  data.role && formData.append("role", `${data?.role!}`);
  if (!data.avatar) return formData;
  formData.append("avatar", data.avatar);
  return formData;
};

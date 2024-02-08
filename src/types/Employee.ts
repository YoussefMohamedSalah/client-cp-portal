import { ENUMS } from "@/enums/enums";
import { Project } from "./Project";

export interface Employee {
    id: string;
    code: string;
    name: string;
    email: string;
    phone_number: string;
    business_title?: string;
    gender: string;
    shift_start: string;
    shift_end: string;
    id_number: string;
    id_ex_date: string;
    contract_date: string;
    contract_ex: string;
    salary_per_month: number;
    role: typeof ENUMS.ROLE;
    sign: string;
    avatar: string;
    is_verified: boolean;
    department?: string;
    department_info?: { id: string, name: string };
    projects?: Project[];
    permissions?: string[];
    company_info: { id: string, name: string }
    residence_number: string;
    nationality: string;
    site_role: string;
    site_job: string;
    joining_date: string;
    iban_number: number;
};

export interface SelectedEmployee {
    id: string;
    name: string;
    code?: string;
    email?: string;
    role?: string;
    phone_number?: string;
    address?: string;
    avatar?: string;
    kpi?: number;
    department?: string;
    department_info?: { id: string, name: string };
    projects_info?: Array<{ id: string, name: string, longitude: number, latitude: number }>;
    business_title?: string;
    is_manager?: boolean;
    gender?: string;
    sign?: string;
    shift_start?: string;
    shift_end?: string;
    id_number?: string;
    id_ex_date?: string;
    contract_date?: string;
    contract_ex?: string;
    salary_per_month?: string;
    projects?: any[];
    groups?: any[];
    residence_number?: string;
    nationality?: string;
    site_role?: string;
    site_job?: string;
    joining_date?: string;
    iban_number?: number;
}

export interface CreateEmployeeInput {
    name?: string;
    email?: string;
    password?: string;
    phone_number?: string;
    department?: string;
    manager?: string;
    business_title?: string;
    is_manager?: boolean;
    gender?: string;
    shift_start?: string;
    shift_end?: string;
    id_number?: string;
    id_ex_date?: string;
    contract_date?: string;
    contract_ex?: string;
    salary_per_month?: string;
    projects?: any[];
    avatar?: File;
    role?: string;
    residence_number?: string;
    nationality?: string;
    site_role?: string;
    site_job?: string;
    joining_date?: string;
    iban_number?: number;
}

export interface UpdateEmployeeInput {
    id?: string;
    name?: string;
    email?: string;
    phone_number?: string;
    department?: string;
    manager?: string;
    business_title?: string;
    is_manager?: boolean;
    gender?: string;
    shift_start?: string;
    shift_end?: string;
    id_number?: string;
    id_ex_date?: string;
    contract_date?: string;
    contract_ex?: string;
    salary_per_month?: string;
    projects?: any[];
    avatar?: File;
    role?: string;
    residence_number?: string;
    nationality?: string;
    site_role?: string;
    site_job?: string;
    joining_date?: string;
    iban_number?: number;
}



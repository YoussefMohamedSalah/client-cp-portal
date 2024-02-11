import { SUPPLIER_TYPE } from 'enums/enums';
import { Company } from './Company';
import { Project } from './Project';

export interface Customer {
    id: string;
    customer_type: SUPPLIER_TYPE;
    code: string;
    company_name: string | null;
    vat_on: number;
    representative: string | null;
    phone_number: string | null;
    email: string | null;
    country: string | null;
    city: string | null;
    area: string | null;
    street: string | null;
    building_number: string | null;
    postal_code: number | null;
    company: Company;
    projects: Project[];
    createdAt: Date;
    updatedAt: Date;
};

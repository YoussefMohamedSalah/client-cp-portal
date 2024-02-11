import { SUBCONTRACTOR_TYPE } from "enums/enums";

export interface Subcontractor {
    id: string;
    code: string;
    subcontractor_type: SUBCONTRACTOR_TYPE;
    company_name: string;
    vat_on: number;
    representative: string;
    phone_number: string;
    email: string;
    country: string;
    city: string;
    area: string;
    street: string;
    building_number: string;
    postal_code: number | null;
};

export interface SelectedSubcontractor {
    id: string;
    subcontractor_type?: SUBCONTRACTOR_TYPE;
    company_name?: string;
    vat_on?: number;
    representative?: string;
    phone_number?: string;
    email?: string;
    country?: string;
    city?: string;
    area?: string;
    street?: string;
    building_number?: string;
    postal_code?: number;
};
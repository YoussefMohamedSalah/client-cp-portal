import { ENUMS } from "@/enums/enums";

export interface Subcontractor {
    id: string;
    subcontractor_type: typeof ENUMS.CONTRACT_TYPE;
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
    postal_code: number;
};

export interface SelectedSubcontractor {
    id: string;
    subcontractor_type?: typeof ENUMS.CONTRACT_TYPE;
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
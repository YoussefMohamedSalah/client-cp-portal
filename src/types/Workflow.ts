import { Company } from './Company';

export interface WorkFlow {
    userId: string;
    name: string;
    title: string;
    state: boolean;
    isRejected: boolean;
    index: number;
    sign: string;
};

export interface CompanyWorkFlow {
    id: string;
    site_request_flow: { userId: string; name: string; title: string; state: boolean; isRejected: boolean; index: number; sign: string }[];
    petty_cash_request_flow: { userId: string; name: string; title: string; state: boolean; isRejected: boolean; index: number; sign: string }[];
    material_request_flow: { userId: string; name: string; title: string; state: boolean; isRejected: boolean; index: number; sign: string }[];
    purchase_order_flow: { userId: string; name: string; title: string; state: boolean; isRejected: boolean; index: number; sign: string }[];
    employee_request_flow: { userId: string; name: string; title: string; state: boolean; isRejected: boolean; index: number; sign: string }[];
    default_po_conditions: string[];
    contract_flow: { userId: string; name: string; title: string; state: boolean; isRejected: boolean; index: number; sign: string }[];
    default_contract_conditions: string[];
    invoice_flow: { userId: string; name: string; title: string; state: boolean; isRejected: boolean; index: number; sign: string }[];
    company: Company;
};
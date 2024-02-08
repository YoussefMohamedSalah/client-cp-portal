import { Company } from './Company';
import { ENUMS } from 'enums/enums';
import PurchaseOrderRequest from './Po_request';

export interface Supplier {
    id: string;
    supplier_type: typeof ENUMS.SUPPLIER_TYPE;
    code: string | null;
    company_name: string | null;
    vat_on: number | null;
    representative: string | null;
    name: string | null;
    phone_number: string | null;
    email: string | null;
    country: string | null;
    city: string | null;
    area: string | null;
    street: string | null;
    building_number: string | null;
    postal_code: number | null;
    company: Company;
    po_requests: PurchaseOrderRequest[];
    createdAt: Date;
    updatedAt: Date;
}


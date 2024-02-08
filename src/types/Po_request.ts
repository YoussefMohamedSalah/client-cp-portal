import { STATUS, DOCUMENT_TYPE } from '@/enums/enums';
import { Supplier } from './Supplier';
import { Project } from './Project';
import { Company } from './Company';

interface PurchaseOrderRequest {
    id: string;
    type: DOCUMENT_TYPE.PURCHASE_ORDER;
    code: string | null;
    rev_num: number;
    currency: string;
    date: string;
    delivery_date: string;
    user: { id: string; name: string };
    forwarded_by: { id: string; name: string };
    project_details: { id: string; name: string };
    supplier_details: { id: string; name: string };
    subject: string | null;
    description: string | null;
    material_availability: string | null;
    transportation: string | null;
    vat_percentage: number;
    sub_total: number;
    vat: number;
    discount: number;
    total: number;
    paid_amount: number;
    payment_type: string;
    installments: { name: string; percentage: number; value: number; details: string; date: string }[];
    default_conditions: string[];
    conditions: string[];
    status: STATUS;
    items: { description: string; item: string; count: number; price: number; total: number }[];
    work_flow: { userId: string; name: string; title: string; state: boolean; isRejected: boolean; sign: string }[];
    files: { name: string; url: string }[];
    timeline: { name: string; content: string; date: Date; status: string }[];
    rejection_reason: string | null;
    project: Project;
    supplier: Supplier;
    company: Company;
    createdAt: Date;
    updatedAt: Date;
}

export default PurchaseOrderRequest;

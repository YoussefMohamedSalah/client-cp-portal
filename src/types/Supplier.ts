import { Company } from "./Company";
import { SUPPLIER_TYPE } from "enums/enums";
import { PurchaseOrderRequest } from "./Po_request";

export interface Supplier {
  id: string;
  supplier_type: SUPPLIER_TYPE;
  code: string;
  company_name: string | null;
  vat_on: number | null;
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

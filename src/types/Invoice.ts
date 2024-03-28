import { Project } from "./Project";
import { Company } from "./Company";
import { Subcontractor } from "./Subcontractor";
import { Contract } from "./Contract";
import { STATUS, DOCUMENT_TYPE, FINANCE_STATUS } from "enums/enums";

export interface Invoice {
  id: string;
  code: string | null;
  rev_num: number;
  date: string;
  type: DOCUMENT_TYPE.INVOICE;
  total_amount: number | null;
  paid_amount: number | null;
  remaining_amount: number | null;
  subject: string | null;
  description: string | null;
  items: Array<{
    item: string;
    description: string;
    count: number;
    price: number;
    total: number;
    payed_amount: number;
    payed_percentage: number;
    prev_count: number;
    current_count: number;
  }>;
  vat: number | null;
  contract_id?: string;
  files: string[];
  user: { id: string; name: string };
  project_details: { id: string; name: string };
  work_flow: Array<{ userId: string; name: string; title: string; state: boolean; isRejected: boolean; sign: string }>;
  timeline: Array<{ name: string; content: string; date: Date; status: string }>;
  rejection_reason: string | null;
  project: Project;
  status: STATUS;
  finance_state: FINANCE_STATUS;
  contract: Contract;
  subcontractor: Subcontractor;
  company: Company;
  createdAt: Date;
  updatedAt: Date;
}

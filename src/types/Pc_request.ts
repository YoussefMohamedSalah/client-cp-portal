import { Project } from "./Project";
import { Company } from "./Company";
import { STATUS, DOCUMENT_TYPE, FINANCE_STATUS } from "enums/enums";

export interface PettyCashRequest {
  id: string;
  type: DOCUMENT_TYPE.PETTY_CASH;
  code: string;
  rev_num: number;
  currency: string | null;
  date: string;
  transaction_date: string;
  paid_amount: number | null;
  balance_payment: number | null;
  total: number | null;
  user: { id: string; name: string };
  forwarded_by: { id: string; name: string };
  project_details: { id: string; name: string };
  subject: string | null;
  description: string | null;
  status: STATUS;
  finance_state: FINANCE_STATUS;
  items: Array<{ description: string; item: string; count: number; price: number; total: number }>;
  work_flow: Array<{ userId: string; name: string; title: string; state: boolean; isRejected: boolean; sign: string }>;
  files: Array<{ name: string; url: string }>;
  timeline: Array<{ name: string; content: string; date: Date; status: string }>;
  rejection_reason: string | null;
  project: Project;
  company: Company;
  createdAt: Date;
  updatedAt: Date;
}

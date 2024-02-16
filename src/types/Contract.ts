import { Company } from "./Company";
import { Invoice } from "./Invoice";
import { Project } from "./Project";
import { Subcontractor } from "./Subcontractor";
import { STATUS, DOCUMENT_TYPE } from "enums/enums";

export interface Contract {
  id: string;
  type: DOCUMENT_TYPE.CONTRACT;
  code: string | null;
  rev_num: number;
  date: string;
  default_conditions: string[];
  conditions: string[];
  items: ContractItem[];
  vat_percentage: number;
  sub_total: number;
  vat: number;
  total: number;
  discount: number;
  paid_amount: number;
  remaining_amount: number;
  subject: string | null;
  description: string | null;
  user: { id: string; name: string };
  project_details: { id: string; name: string };
  subcontractor_details: { id: string; name: string };
  status: STATUS;
  payment_type: string;
  installments: Array<{ name: string; percentage: number; value: number; details: string; date: string }>;
  work_flow: Array<{ userId: string; name: string; title: string; state: boolean; isRejected: boolean; sign: string }>;
  files: Array<{ name: string; url: string }>;
  comments: Array<{ id: number; userId: string; userName: string; comment: string; createdAt: string }>;
  comments_count: number;
  rejection_reason: string | null;
  currency: string;
  timeline: Array<{ name: string; content: string; date: Date; status: string }>;
  project: Project;
  invoices: Invoice[];
  subcontractor: Subcontractor;
  company: Company;
  createdAt: Date;
  updatedAt: Date;
}

interface ContractItem {
  description: string;
  item: string;
  count: number;
  price: number;
  total: number;
}

export interface SelectedContract {
  id: string;
  date?: string;
  total_value?: number;
  status?: any;
  items?: any;
  conditions?: any;
  sub_total?: number;
  vat?: number;
  total?: number;
  paid_amount?: number;
  remaining_amount?: number;
  invoices?: Invoice[];
  files?: string[];
  subcontractor_details?: { id: string; name: string };
  project_details?: { id: string; name: string };
}

export interface CreateContract {
  id: string;
  date?: string;
  total?: string;
  sub_total?: string;
  vat?: string;
  discount?: string;
  files?: File[];
  items?: string;
  conditions?: string;
  default_conditions?: string;
  subcontractor?: any;
  projectId?: string;
  filesNameSet?: string;
}

import { Project } from "./Project";
import { Company } from "./Company";
import { STATUS, DOCUMENT_TYPE, FINANCE_STATUS } from "enums/enums";
import { FileType } from "./FileType";

export interface MaterialRequest {
  id: string;
  type: DOCUMENT_TYPE.MATERIAL;
  code: string | null;
  rev_num: number;
  user: { id: string; name: string };
  project_details: { id: string; name: string };
  date: string;
  description: string | null;
  subject: string | null;
  status: STATUS;
  finance_state: FINANCE_STATUS;
  items: Array<{
    description: string;
    item: string;
    count: string | number;
    price: string | number;
    total: string | number;
  }>;
  work_flow: Array<{ userId: string; name: string; title: string; state: boolean; isRejected: boolean; sign: string }>;
  files: Array<{ name: string; url: string }> | Array<FileType>;
  timeline: Array<{ name: string; content: string; date: Date; status: string }>;
  is_approved: boolean;
  rejection_reason: string | null;
  project: Project;
  company: Company;
  createdAt: Date;
  updatedAt: Date;
}

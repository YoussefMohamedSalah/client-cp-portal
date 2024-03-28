import { DOCUMENT_TYPE, FINANCE_STATUS, STATUS } from "enums/enums";

export interface EmployeeRequest {
  id: string;
  type: DOCUMENT_TYPE.EMPLOYEE;
  code: string | null;
  rev_num: number;
  user: { id: string; name: string };
  date: string;
  subject: string | null;
  description: string | null;
  status: STATUS;
  finance_state: FINANCE_STATUS;
  work_flow: Array<{ userId: string; name: string; title: string; state: boolean; isRejected: boolean; sign: string }>;
  files: Array<{ name: string; url: string }>;
  timeline: Array<{ name: string; content: string; date: Date; status: string }>;
  is_approved: boolean;
  rejection_reason: string | null;
  employee: { id: string; name: string };
  company: { id: string; name: string };
  createdAt: Date;
  updatedAt: Date;
}

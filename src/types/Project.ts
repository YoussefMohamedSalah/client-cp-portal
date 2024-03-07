import { Company } from "./Company";
import { Customer } from "./Customer";
import { SiteRequest } from "./Site_request";
import { PettyCashRequest } from "./Pc_request";
import { MaterialRequest } from "./Material_request";
import { PurchaseOrderRequest } from "./Po_request";
// import { Group } from './Group';
import { Inventory } from "./Inventory";
import { User } from "./User";
import { Contract } from "./Contract";
import { Invoice } from "./Invoice";
import { Employee } from "./Employee";
import { DailyReport } from "./Daily_report";

export interface Project {
  id: string;
  name: string;
  description: string | null;
  customer_details: { id: string; name: string };
  kpi: number;
  longitude: number | null;
  latitude: number | null;
  thumbnail?: File;
  bid_value: number;
  duration: number | null;
  project_status: string;
  delivery_date: string;
  contract_date: string;
  contract_number: string | null;
  sites_count: number;
  buildings_count: number;
  floors_count: number;
  total_budget: number;
  po_budget: number;
  po_expenses: number;
  pc_budget: number;
  pc_expenses: number;
  staff_budget: number;
  staff_expenses: number;
  subcontractor_budget: number;
  subcontractor_expenses: number;
  comments: { id: number; userId: string; userName: string; comment: string; createdAt: string }[];
  comments_count: number | null;
  members_count: number | null;
  manager: { id: string; name: string };
  daily_report_groups: { groupId: string; groupName: string; employees: string[] }[];
  company: Company;
  assistants?: Employee[];
  members: any[];
  managers: Employee[];
  users: Employee[];
  customer: Customer;
  tasks?: any[];
  progress?: { date: string; percentage: number }[];
  total_progress_percentage: number;
  inventory: Inventory;
  SiteRequests: SiteRequest[];
  PettyCashRequests: PettyCashRequest[];
  MaterialRequests: MaterialRequest[];
  PurchaseOrderRequests: PurchaseOrderRequest[];
  Contracts: Contract[];
  invoices: Invoice[];
  daily_reports: DailyReport[];
  kpi_records: ProjectKpi[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SelectedProject {
  id: string;
  name?: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  bid_value?: number;
  total_budget?: number;
  po_budget?: number;
  po_expenses?: number;
  pc_budget?: number;
  pc_expenses?: number;
  staff_budget?: number;
  staff_expenses?: number;
  subcontractor_budget?: number;
  subcontractor_expenses?: number;
  contract_date?: string;
  delivery_date?: string;
  duration?: number;
  customer?: any;
  sites_count?: number;
  buildings_count?: number;
  floors_count?: number;
  contract_number?: string;
  manager?: { id: string; name: string };
  assistants?: { label: string; value: string }[];
  managers?: Employee[];
  customer_details?: { id: string; name: string };
  comments?: Comment[];
  tasks?: any[];
  file?: any;
  files?: File[];
  group?: any;
  attachment_count?: number;
  members_count?: number;
  comments_count?: number;
  tasks_count?: number;
  thumbnail?: any;
  members?: any[];
  project_status?: string;
  projectfile_set?: any[];
}

export interface ProjectKpi {
  id: string;
  date: string;
  total_kpi: number;
  project: Project;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectAttachment {
  id?: number;
  files: File[];
  project?: number;
  task?: number;
}

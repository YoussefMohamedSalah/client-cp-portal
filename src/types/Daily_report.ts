import { Company } from "./Company";
import { Project } from "./Project";
import User from "./User";

export interface DailyReportGroupKpi {
    id: string;
    date: string;
    total_kpi: number;
    group: DailyReportGroup;
    createdAt: Date;
    updatedAt: Date;
}

export interface DailyReportGroup {
    id: string;
    name: string;
    kpi: number;
    default_score: number;
    daily_report: DailyReport;
    group_users: User[];
    kpi_records: DailyReportGroupKpi[];
    createdAt: Date;
    updatedAt: Date;
}

export interface DailyReport {
    id: string;
    date: string;
    code: string | null;
    working_area: string | null;
    today_working_spot: string | null;
    total_workers_count: number | null;
    notes: string | null;
    work_flow: Array<{ userId: string; name: string; title: string; state: boolean; isRejected: boolean; sign: string }>;
    files: Array<{ name: string; url: string }>;
    users: Array<{ userId: string; name: string; score: string }>;
    project_details: { id: string; name: string };
    supervisor: { id: string; name: string };
    project: Project;
    company: Company;
    daily_report_groups: DailyReportGroup[];
    createdAt: Date;
    updatedAt: Date;
}

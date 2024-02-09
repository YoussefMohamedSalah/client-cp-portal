import { Project } from './Project';
import { Company } from './Company';
import { STATUS, DOCUMENT_TYPE } from 'enums/enums';

export interface SiteRequest {
    id: string;
    type: DOCUMENT_TYPE.SITE;
    code: string | null;
    rev_num: number;
    project_details: { id: string, name: string };
    user: { id: string, name: string };
    date: string;
    description: string | null;
    subject: string | null;
    status: STATUS;
    work_flow: { userId: string, name: string, title: string, state: boolean, isRejected: boolean, sign: string }[];
    timeline: { name: string, content: string, date: Date, status: string }[];
    rejection_reason: string | null;
    project: Project;
    company: Company;
    createdAt: Date;
    updatedAt: Date;
};
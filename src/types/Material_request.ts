import { Project } from "./Project";
import { Company } from "./Company";
import { STATUS, DOCUMENT_TYPE } from 'enums/enums';

interface MaterialRequest {
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
    items: Array<{ description: string; item: string; count: number; price: number; total: number }>;
    work_flow: Array<{ userId: string; name: string; title: string; state: boolean; isRejected: boolean; sign: string }>;
    files: Array<{ name: string; url: string }>;
    timeline: Array<{ name: string; content: string; date: Date; status: string }>;
    is_approved: boolean;
    rejection_reason: string | null;
    project: Project;
    company: Company;
    createdAt: Date;
    updatedAt: Date;
};

export default MaterialRequest;

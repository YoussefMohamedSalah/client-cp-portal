import { Company } from './Company';
import { ENUMS } from '@/enums/enums';

interface Tender {
    id: string;
    code: string | null;
    status: typeof ENUMS.STATUS;
    description: string | null;
    user: { id: string, name: string };
    date: string;
    hand_over: string;
    files: string[];
    comments: { id: number, userId: string, name: string, comment: string }[];
    company: Company;
    createdAt: Date;
    updatedAt: Date;
}

export default Tender;

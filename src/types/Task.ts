import { Company } from './Company';
// import { Group } from './Group';
import { User } from './User';
import { PRIORITY, PROGRESS, TASK_TYPE } from 'enums/enums';

interface Task {
    id: string;
    task_type: TASK_TYPE;
    name: string | null;
    description: string | null;
    task_priority: PRIORITY;
    status: string | null;
    task_progress: PROGRESS;
    creator: { id: string, name: string };
    files: string[];
    start_at: string;
    end_at: string | null;
    company: Company;
    group: string;
    users: User[];
    createdAt: Date;
    updatedAt: Date;
}

export default Task;

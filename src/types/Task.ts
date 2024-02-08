import { Company } from './Company';
import { Group } from './Group';
import { User } from './User';
import { TaskPriority, TaskProgressType, taskType } from '../enums/enums';

interface Task {
    id: string;
    task_type: taskType;
    name: string | null;
    description: string | null;
    task_priority: TaskPriority;
    status: string | null;
    task_progress: TaskProgressType;
    creator: { id: string, name: string };
    files: string[];
    start_at: string;
    end_at: string | null;
    company: Company;
    group: Group;
    users: User[];
    createdAt: Date;
    updatedAt: Date;
}

export default Task;

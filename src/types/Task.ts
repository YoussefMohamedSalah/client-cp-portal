import { Company } from "./Company";
// import { Group } from './Group';
import { User } from "./User";
import { PRIORITY, PROGRESS, TASK_TYPE } from "enums/enums";

export interface Task {
  id: string;
  name: string;
  description: string;
  task_priority: string;
  files?: File[];
  projectId: string;
  start_at?: string;
  end_at?: string;
  assigned_to?: string;
  task_type: string;
  thumbnail?: File;
}

export interface SelectedTask {
  id: string;
  name?: string;
  description?: string;
  task_priority?: string;
  task_progress?: string;
  created_at?: string;
  user?: { id: string; name: string };
  projectId?: string;
  start_at?: string;
  end_at?: string;
  assigned_to?: string;
  task_type?: string;
  files?: any[];
}

import { Project } from "./Project";
import { PRIORITY, PROGRESS, TASK_TYPE } from "enums/enums";

export interface Task {
  id: string;
  name: string;
  description: string;
  files?: File[];
  project: Project;
  start_at?: string;
  end_at?: string;
  assigned_to?: string;
  user?: { id: string; name: string };
  task_priority?: PRIORITY;
  task_progress?: PROGRESS;
  task_type: TASK_TYPE;
  thumbnail?: File;
};
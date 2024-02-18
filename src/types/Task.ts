import { Project } from "./Project";

export interface Task {
  id: string;
  name: string;
  description: string;
  task_priority: string;
  files?: File[];
  start_at?: string;
  end_at?: string;
  assigned_to?: string;
  task_type: string;
  thumbnail?: File;
  project: Project;
}
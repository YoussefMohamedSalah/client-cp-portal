import { Project } from "./Project";

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
  project: Project;
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

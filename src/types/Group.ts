import { Employee } from "./Employee";

export interface Group {
  id: string;
  name: string;
  description: string;
  members?: Employee[];
  managers?: Employee[];
  members_count: number;
  tasks_count: number;
  tasks: any[];
  project: any;
}

export interface CreateGroup {
  name: string;
  description?: string;
  members?: string[];
  managers?: string[];
}

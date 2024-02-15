import { SelectedEmployee } from "./Employee";

export interface CreateGroup {
  name: string;
  description?: string;
  members?: SelectedEmployee[];
  managers?: SelectedEmployee[],
}



export interface SelectedGroup {
  id: string;
  name?: string;
  description?: string;
  members?: SelectedEmployee[];
  managers?: SelectedEmployee[],
  members_count?: number;
  tasks_count?: number;
  tasks?: any[];
  project?: any;
}



export interface Group {
  id: string;
  name: string;
  description: string;
  members?: SelectedEmployee[];
  managers?: SelectedEmployee[],
  members_count: number;
  tasks_count: number;
  tasks: any[];
  project: any;
}
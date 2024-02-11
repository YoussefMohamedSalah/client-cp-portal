export enum TaskKeys {
  NAME = 'name',
  DESCRIPTION = 'description',
  TASK_PRIORITY = 'task_priority',
  START_DATE = "start_at",
  END_DATE = "end_at",
  GROUP = "group",
  FILES = "files",
  PROJECT = 'project',
};

export const TaskNumKeys = [];

export const TaskStrKeys = [
  TaskKeys.NAME,
  TaskKeys.DESCRIPTION,
  TaskKeys.TASK_PRIORITY,
];

export const TaskRequiredKeys = [
  TaskKeys.NAME,
  TaskKeys.DESCRIPTION,
];
export enum DailyReportKeys {
  DATE = "date",
  WORKING_AREA = "working_area",
  TODAYS_WORKING_SPOT = "today_working_spot",
  SUPERVISOR_NAME = "supervisor",
  NOTES = "notes",
  ENGINEER_NAME = "",
  TOTAL_EMPLOYEES = "total_workers_count",

  GROUPS_COUNT = "",
  WORKING_PRODUCTIVITY = "",
  FILES = "files",
  FILE = "file",
}

export const GroupNumKeys = [];
export const GroupStrKeys = [DailyReportKeys.WORKING_AREA, DailyReportKeys.TODAYS_WORKING_SPOT];
export const GroupRequiredKeys = [DailyReportKeys.WORKING_AREA, DailyReportKeys.TODAYS_WORKING_SPOT];

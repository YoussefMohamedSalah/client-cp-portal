export enum EmployeeRequestKeys {
  SUBJECT = "subject",
  DESCRIPTION = "description",
  DATE = "date",
}

export const EmployeeRequestNumKeys = [];

export const EmployeeRequestStrKeys = [EmployeeRequestKeys.DATE, EmployeeRequestKeys.SUBJECT];

export const EmployeeRequestRequiredKeys = [EmployeeRequestKeys.DATE, EmployeeRequestKeys.SUBJECT];

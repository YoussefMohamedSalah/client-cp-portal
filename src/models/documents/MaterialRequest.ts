export enum MaterialRequestKeys {
  SUBJECT = "subject",
  PROJECT = "project",
  DESCRIPTION = "description",
  DATE = "date",
  FILES = "files",
  FILE = "file",
}

export const MaterialRequestNumKeys = [];

export const MaterialRequestStrKeys = [MaterialRequestKeys.DATE, MaterialRequestKeys.SUBJECT];

export const MaterialRequestRequiredKeys = [
  MaterialRequestKeys.SUBJECT,
  MaterialRequestKeys.DATE,
  MaterialRequestKeys.PROJECT,
];

export const MaterialRequestPreviewTable = {
  materials: ["item", "description", "count", "price", "prev count", "current count"],
};

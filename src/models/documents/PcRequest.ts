export enum PcRequestKeys {
  SUBJECT = "subject",
  PROJECT = "project",
  DATE = "date",
  DESCRIPTION = "description",
  FILES = 'files',
  FILE = 'file',
};

export const PcRequestNumKeys = [];

export const PcRequestStrKeys = [
  PcRequestKeys.DATE,
  PcRequestKeys.PROJECT,
];

export const PcRequestRequiredKeys = [
  PcRequestKeys.DATE,
  PcRequestKeys.PROJECT,
  PcRequestKeys.SUBJECT,
];
export enum CompanyKeys {
  NAME = "name",
  ADDRESS = "address",
  SIZE = 'size',
  LOGO = 'logo',
  SHIFT_START = 'shift_start',
  SHIFT_END = 'shift_end',
};

export const CompanyNumKeys = [];

export const CompanyStrKeys = [
  CompanyKeys.NAME,
  CompanyKeys.ADDRESS,
  CompanyKeys.SIZE,
  CompanyKeys.SHIFT_START,
  CompanyKeys.SHIFT_END,
  CompanyKeys.LOGO,
];

export const CompanyRequiredKeys = [
  CompanyKeys.NAME,
  CompanyKeys.ADDRESS,
];
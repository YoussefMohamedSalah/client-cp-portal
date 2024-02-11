export enum ContractKeys {
  DATE = 'date',
  PROJECT = "project",
  ITEMS = 'items',
  CONDITIONS = 'conditions',
  FILES = 'files',
  SUB_CONTRACTOR = 'subcontractor',
  VAT = "vat",
  TOTAL = 'total',
};

export const ContractNumKeys = [
  ContractKeys.VAT,
  ContractKeys.TOTAL,
];

export const ContractStrKeys = [
  ContractKeys.DATE,
  ContractKeys.PROJECT,
];

export const ContractRequiredKeys = [
  ContractKeys.DATE,
  // ContractKeys.CONDITIONS,
  ContractKeys.PROJECT,
  ContractKeys.SUB_CONTRACTOR,
];
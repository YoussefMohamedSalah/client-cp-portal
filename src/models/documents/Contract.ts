export enum ContractKeys {
  SUBJECT = "subject",
  PROJECT = "project",
  SUB_CONTRACTOR = "subcontractor",
  DESCRIPTION = "description",
  DATE = "date",
  ITEMS = "items",
  CONDITIONS = "conditions",
  PAYMENT_TYPE = "payment_type",
  INSTALLMENTS = "installments",
  DISCOUNT = "discount",
  VAT = "vat",
  TOTAL = "total",
  FILES = "files",
  FILE = "file",
}

export const ContractNumKeys = [ContractKeys.VAT, ContractKeys.TOTAL];

export const ContractStrKeys = [ContractKeys.DATE, ContractKeys.PROJECT];

export const ContractRequiredKeys = [
  ContractKeys.DATE,
  // ContractKeys.CONDITIONS,
  ContractKeys.PROJECT,
  ContractKeys.SUB_CONTRACTOR,
];

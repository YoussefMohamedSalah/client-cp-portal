export enum InvoiceKeys {
  SUBJECT = "subject",
  DATE = 'date',
  DESCRIPTION = "description",
  ITEMS = "items",
};
export const InvoiceNumKeys = [];

export const InvoiceStrKeys = [
  InvoiceKeys.SUBJECT,
  InvoiceKeys.DATE,
  InvoiceKeys.DESCRIPTION,
];

export const InvoiceRequiredKeys = [
  InvoiceKeys.SUBJECT,
  InvoiceKeys.DATE,
  InvoiceKeys.DESCRIPTION,
  InvoiceKeys.ITEMS,
];
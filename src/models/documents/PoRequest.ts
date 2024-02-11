export enum PoRequestKeys {
  SUBJECT = "subject",
  PROJECT = "project",
  SUPPLIER = "supplier",
  DATE = "date",
  DELIVERY_DATE = 'delivery_date',
  AVAILABILITY = 'material_availability',
  TRANSPORTATION = 'transportation',
  DESCRIPTION = "description",
  CONDITIONS = "conditions",
  INSTALLMENTS = "installments",
  PAYMENT_TYPE = "payment_type",
  ITEMS = 'items',
  VAT = "vat",
  TOTAL = 'total',
  DISCOUNT = "discount",
  FILES = 'files',
  FILE = 'file',
};

export const PoRequestNumKeys = [];

export const PoRequestStrKeys = [
  PoRequestKeys.DATE,
  PoRequestKeys.DELIVERY_DATE,
  PoRequestKeys.AVAILABILITY,
  PoRequestKeys.SUBJECT,
];

export const PoRequestRequiredKeys = [
  PoRequestKeys.SUBJECT,
  PoRequestKeys.DATE,
  PoRequestKeys.PROJECT,
  PoRequestKeys.SUPPLIER,
  PoRequestKeys.AVAILABILITY,
  PoRequestKeys.TRANSPORTATION,
  PoRequestKeys.DELIVERY_DATE,
];
export enum PoRequestKeys {
  SUBJECT = "subject",
  PROJECT = "project",
  DESCRIPTION = "description",
  DATE = "date",
  SUPPLIER = "supplier",
  DELIVERY_DATE = 'delivery_date',
  AVAILABILITY = 'material_availability',
  TRANSPORTATION = 'transportation',
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
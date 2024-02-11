export enum SupplierKeys {
  NAME = 'name',
  COMPANY_NAME = 'company_name',
  PHONE_NUMBER = "phone_number",
  EMAIL = "email",
  SUPPLIER_TYPE = 'supplier_type',
  VAT_ON = 'vat_on',
  COUNTRY = 'country',
  CITY = 'city',
  AREA = 'area',
  STREET = 'street',
  BUILDING_NUMBER = 'building_number',
  POSTAL_CODE = 'postal_code',
};


export const SupplierNumKeys = [
  SupplierKeys.VAT_ON,
  SupplierKeys.POSTAL_CODE,
];

export const SupplierStrKeys = [
  SupplierKeys.CITY,
  SupplierKeys.COMPANY_NAME,
  SupplierKeys.NAME,
  SupplierKeys.EMAIL,
  SupplierKeys.SUPPLIER_TYPE,
  SupplierKeys.COUNTRY,
  SupplierKeys.STREET,
];

export const SupplierRequiredKeys = [
  SupplierKeys.SUPPLIER_TYPE,
  SupplierKeys.NAME,
  SupplierKeys.COMPANY_NAME,
  SupplierKeys.COUNTRY,
  SupplierKeys.CITY,
  SupplierKeys.PHONE_NUMBER,
  SupplierKeys.EMAIL,
];
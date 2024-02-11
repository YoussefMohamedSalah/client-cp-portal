export enum CustomerKeys {
  REPRESENTATIVE = 'representative',
  COMPANY_NAME = 'company_name',
  PHONE_NUMBER = "phone_number",
  EMAIL = "email",
  CUSTOMER_TYPE = 'customer_type',
  VAT_ON = 'vat_on',
  COUNTRY = 'country',
  CITY = 'city',
  AREA = 'area',
  STREET = 'street',
  BUILDING_NUMBER = 'building_number',
  POSTAL_CODE = 'postal_code',
};

export const CustomerNumKeys = [
  CustomerKeys.VAT_ON,
  CustomerKeys.POSTAL_CODE,
];

export const CustomerStrKeys = [
  CustomerKeys.AREA,
  // CustomerKeys.BUILDING_NUMBER,
  CustomerKeys.CITY,
  CustomerKeys.COMPANY_NAME,
  // CustomerKeys.PHONE_NUMBER,
  CustomerKeys.REPRESENTATIVE,
  CustomerKeys.EMAIL,
  CustomerKeys.CUSTOMER_TYPE,
  CustomerKeys.COUNTRY,
  CustomerKeys.STREET,
];

export const CustomerRequiredKeys = [
  CustomerKeys.CUSTOMER_TYPE,
  CustomerKeys.REPRESENTATIVE,
  CustomerKeys.COMPANY_NAME,
  CustomerKeys.COUNTRY,
  CustomerKeys.CITY,
  CustomerKeys.PHONE_NUMBER,
  CustomerKeys.EMAIL,
];
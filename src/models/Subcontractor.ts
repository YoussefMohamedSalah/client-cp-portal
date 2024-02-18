export enum SubcontractorKeys {
  NAME = "name",
  COMPANY_NAME = "company_name",
  PHONE_NUMBER = "phone_number",
  EMAIL = "email",
  SUBCONTRACTOR_TYPE = "subcontractor_type",
  VAT_ON = "vat_on",
  COUNTRY = "country",
  CITY = "city",
  AREA = "area",
  STREET = "street",
  BUILDING_NUMBER = "building_number",
  POSTAL_CODE = "postal_code",
}

export const SubcontractorNumKeys = [SubcontractorKeys.VAT_ON, SubcontractorKeys.POSTAL_CODE];

export const SubcontractorStrKeys = [
  SubcontractorKeys.AREA,
  SubcontractorKeys.CITY,
  SubcontractorKeys.COMPANY_NAME,
  SubcontractorKeys.NAME,
  SubcontractorKeys.EMAIL,
  SubcontractorKeys.SUBCONTRACTOR_TYPE,
  SubcontractorKeys.COUNTRY,
  SubcontractorKeys.STREET,
];

export const SubcontractorRequiredKeys = [
  SubcontractorKeys.SUBCONTRACTOR_TYPE,
  SubcontractorKeys.NAME,
  SubcontractorKeys.COMPANY_NAME,
  SubcontractorKeys.COUNTRY,
  SubcontractorKeys.CITY,
  SubcontractorKeys.PHONE_NUMBER,
  SubcontractorKeys.EMAIL,
];

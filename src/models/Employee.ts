export enum EmployeeKeys {
  NAME = "name",
  EMAIL = "email",
  PASSWORD = "password",
  ROLE = 'role',
  PHONE_NUMBER = "phone_number",
  DEPARTMENT = "department",
  MANAGER = "manager",
  // BUSINESS_TITLE = "business_title",
  IS_MANAGER = "is_manager",
  IS_FEMALE = 'is_female',
  IS_MALE = 'is_male',
  SHIFT_START = 'shift_start',
  SHIFT_END = 'shift_end',
  ID_NUMBER = 'id_number',
  ID_EX_DATE = 'id_ex_date',
  CONTRACT_DATE = 'contract_date',
  CONTRACT_EX_DATE = 'contract_ex',
  SALARY = 'salary_per_month',
  PROJECT = 'projects',
  GENDER = 'gender',
  AVATAR = 'avatar',
  USER_PERMISSIONS = "user_permissions",
  RESIDENCE_NUMBER = 'residence_number',
  NATIONALITY = 'nationality',
  SITE_ROLE = 'site_role',
  SITE_JOB = 'site_job',
  JOINING_DATE = 'joining_date',
  IBAN_NUMBER = 'iban_number',


};

export const EmployeeNumKeys = [
  EmployeeKeys.SALARY
];

export const EmployeeStrKeys = [
  EmployeeKeys.NAME,
  EmployeeKeys.EMAIL,
  EmployeeKeys.ROLE,
  // EmployeeKeys.PHONE_NUMBER,
  EmployeeKeys.DEPARTMENT,
  // EmployeeKeys.BUSINESS_TITLE,
  EmployeeKeys.SHIFT_START,
  EmployeeKeys.SHIFT_END,
  // EmployeeKeys.ID_NUMBER,
  EmployeeKeys.ID_EX_DATE,
  EmployeeKeys.CONTRACT_DATE,
  EmployeeKeys.CONTRACT_EX_DATE,
  EmployeeKeys.GENDER,
  EmployeeKeys.AVATAR,

  EmployeeKeys.NATIONALITY,
  EmployeeKeys.SITE_ROLE,
  EmployeeKeys.SITE_JOB,
  EmployeeKeys.JOINING_DATE,

];

export const EmployeeRequiredKeys = [
  EmployeeKeys.NAME,
  EmployeeKeys.EMAIL,
  EmployeeKeys.ROLE,
  EmployeeKeys.PHONE_NUMBER,
  EmployeeKeys.DEPARTMENT,
  // EmployeeKeys.BUSINESS_TITLE,
  EmployeeKeys.SHIFT_START,
  EmployeeKeys.SHIFT_END,
  EmployeeKeys.GENDER,
  EmployeeKeys.NATIONALITY,

];

export const EmployeeUpdateRequiredKeys = [
  EmployeeKeys.NAME,
  EmployeeKeys.EMAIL,
  EmployeeKeys.ROLE,
  EmployeeKeys.PHONE_NUMBER,
  EmployeeKeys.DEPARTMENT,
  // EmployeeKeys.BUSINESS_TITLE,
  // EmployeeKeys.SHIFT_START,
  // EmployeeKeys.SHIFT_END,
  EmployeeKeys.GENDER,
];
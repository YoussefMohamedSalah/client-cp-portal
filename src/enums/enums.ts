export enum ENV {
  PRODUCTION = "production",
  DEVELOPMENT = "development",
}

export enum GENDER {
  MALE = "Male",
  FEMALE = "Female",
}

export enum DEPARTMENTS {
  PROJECTS = "Projects",
  HR = "HR",
  FINANCE = "Finance",
  MARKETING = "Marketing",
  TENDER = "Tender",
  PROCUREMENT = "Procurement",
}

export enum PERMISSIONS {
  ADD_PROJECT = "add_project",
  CHANGE_PROJECT = "change_project",
  DELETE_PROJECT = "delete_project",
  VIEW_PROJECT = "view_project",
  ADD_TASK = "add_task",
  CHANGE_TASK = "change_task",
  DELETE_TASK = "delete_task",
  VIEW_TASK = "view_task",
  ADD_USER = "add_user",
  CHANGE_USER = "change_user",
  DELETE_USER = "delete_user",
  VIEW_USER = "view_user",
}

export enum STATUS {
  PENDING = "Pending",
  APPROVED = "Approved",
  REJECTED = "Rejected",
  ARCHIVED = "Archived",
}

// used
export enum FINANCE_STATUS {
  APPROVED = "Approved",
  PENDING = "Pending",
  REJECTED = "Rejected",
}

export enum ProjectStatus {
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
  SUSPEND = "Suspend",
  PENDING = "Pending",
}

export enum INVENTORY_TYPE {
  MASTER = "master_inventory",
  PROJECT = "project_inventory",
}

export enum DOCUMENT_TYPE {
  PURCHASE_ORDER = "purchase_order_request",
  PETTY_CASH = "petty_cash_request",
  SITE = "site_request",
  MATERIAL = "material_request",
  CONTRACT = "contract",
  INVOICE = "invoice",
  EMPLOYEE = "employee_request",
}

export enum TASK_TYPE {
  GENERAL_TASK = "general_task",
  GROUP_TASK = "group_task",
  INDIVIDUAL_TASK = "individual_task",
}

export enum PROGRESS {
  TODO = "ToDo",
  ON_PROGRESS = "ON PROGRESS",
  ON_REVIEW = "REVIEW",
  COMPLETED = "COMPLETE",
}

export enum PRIORITY {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
  CRITICAL = "Critical",
}

export enum ROLE {
  SUPERUSER = "Superuser",
  SUB_SUPERUSER = "Sub_Superuser",
  USER = "User",
  MANAGER = "Manager",
  DIRECTOR = "Director",
}

export enum SUPPLIER_TYPE {
  COMPANY = "Company",
  INDIVIDUAL = "Individual",
}

export enum CUSTOMER_TYPE {
  COMPANY = "Company",
  INDIVIDUAL = "Individual",
}

export enum SUBCONTRACTOR_TYPE {
  COMPANY = "Company",
  INDIVIDUAL = "Individual",
}

export enum CONTRACT_TYPE {
  COMPANY = "Company",
  INDIVIDUAL = "Individual",
}
export enum TODO {
  TODO = "ToDo",
  ON_PROGRESS = "On Progress",
  PENDING = "Pending",
  DONE = "Done",
}

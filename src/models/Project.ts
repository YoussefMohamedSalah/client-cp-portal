export enum ProjectKeys {
  NAME = "name",
  LATITUDE = "latitude",
  LONGITUDE = "longitude",
  DESCRIPTION = "description",
  BID_VALUE = "bid_value",
  TOTAL_BUDGET = "total_budget",
  PO_BUDGET = "po_budget",
  PC_BUDGET = "pc_budget",
  STAFF_BUDGET = "staff_budget",
  SUBCONTRACTOR_BUDGET = "subcontractor_budget",
  CONTRACT_DATE = "contract_date",
  DELIVERY_DATE = "delivery_date",
  DURATION = "duration",
  SITES_COUNT = "sites_count",
  BUILDINGS_COUNT = "buildings_count",
  FLOORS_COUNT = "floors_count",
  PROJECT_STATUS = "project_status",
  CONTRACT_NUMBER = "contract_number",
  MANAGER = "manager",
  ASSISTANTS = "assistants",
  CUSTOMER = "customer",
  THUMBNAIL = "thumbnail",
  FILES = "files"
}

export const ProjectNumKeys = [
  ProjectKeys.LATITUDE,
  ProjectKeys.LONGITUDE,
  ProjectKeys.BID_VALUE,
  ProjectKeys.TOTAL_BUDGET,
  ProjectKeys.PO_BUDGET,
  ProjectKeys.PC_BUDGET,
  ProjectKeys.STAFF_BUDGET,
  ProjectKeys.SUBCONTRACTOR_BUDGET,
  ProjectKeys.SITES_COUNT,
  ProjectKeys.BUILDINGS_COUNT,
  ProjectKeys.FLOORS_COUNT,
  ProjectKeys.DURATION,
];

export const ProjectStrKeys = [
  ProjectKeys.NAME,
  ProjectKeys.DESCRIPTION,
  ProjectKeys.CONTRACT_DATE,
  ProjectKeys.DELIVERY_DATE,
  ProjectKeys.PROJECT_STATUS,
];

export const ProjectRequiredKeys = [
  ProjectKeys.NAME,
  ProjectKeys.DESCRIPTION,
  ProjectKeys.CONTRACT_DATE,
  ProjectKeys.DELIVERY_DATE,
  ProjectKeys.BID_VALUE,
  ProjectKeys.TOTAL_BUDGET,
  ProjectKeys.PO_BUDGET,
  ProjectKeys.PC_BUDGET,
  ProjectKeys.STAFF_BUDGET,
  ProjectKeys.SUBCONTRACTOR_BUDGET,
];

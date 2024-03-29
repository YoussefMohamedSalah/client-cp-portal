export enum ROUTES {
  // !----- User Endpoints ------
  LOGIN = "auth/login",
  LOGOUT = "auth/logout",
  REGISTER = "auth/register",
  TOKEN_REFRESH = "auth/refresh",
  RESET_PASSWORD = "auth/password/reset",
  CHANGE_PASSWORD = "auth/password/change",
  SEND_PASSWORD_CODE = "auth/password/code",
  CREATE_NEW_PASSWORD = "auth/password/create-password",

  // !----- Company Endpoints ------
  COMPANY = "company/",
  USER = "user/",
  USER_SIGN = "user/sign/",
  CO_SUPERUSERS = "company/superusers",
  SUPERUSER = "superuser/",
  CO_SUPPLIERS = "company/supplier",
  CO_CUSTOMERS = "company/customer",
  CO_TENDERS = "company/tender",
  CO_INVENTORIES = "company/inventory",
  CO_PROJECTS = "company/project",
  DEPARTMENTS = "company/department",
  CO_EMPLOYEES = "company/employee",
  CO_GROUPS = "company/group",
  CO_TASKS = "company/task",
  CO_SUBCONTRACTORS = "company/subcontractor",
  INVOICE = "invoice/",
  DAILY_REPORT = "daily_report/",
  DAILY_REPORT_INITIAL_DATA = "daily_report/initial/",
  TODO = "todo/",

  // !----- All Endpoints ------
  SUPPLIER = "supplier/",
  CUSTOMER = "customer/",
  TENDER = "tender/",
  TENDER_ADD = "group/tender/add/",
  TENDER_REMOVE = "group/tender/remove/",
  INVENTORY = "inventory/",
  INVENTORY_ITEMS = "inventory/items/",
  INVENTORY_ITEM = "inventory_item/",
  PROJECT = "project/",
  PROJECT_ADD = "group/project/add/",
  PROJECT_REMOVE = "group/project/remove/",
  DEPARTMENT = "department/",
  TASK = "task/",
  EMPLOYEE_TASKS = "employee/task/",
  PROJECT_TASKS = "project/tasks/",
  GROUP_TASKS = "group/tasks/",
  EMPLOYEE = "employee/",
  MANAGER = "employee/manager/",
  DEPARTMENT_EMPLOYEES = "employee/department/",
  EMPLOYEE_GROUPS = "employee/groups/",
  GROUP = "group/",
  GROUP_ADD = "group/add/",
  GROUP_REMOVE = "group/remove/",
  COMMENT = "comment/",
  PROJECT_EMPLOYEES = "project/employees/",
  WORKFLOW = "workflow/",
  DEFAULT_CONDITIONS = "workflow/conditions/",
  SUBCONTRACTOR = "subcontractor/",
  CONTRACT_INVOICES = "contract/invoices/",
  // !----- Requests Endpoints ----

  PO_REQUESTS = "request/po/",
  PC_REQUESTS = "request/pc/",
  SITE_REQUESTS = "request/site/",
  MATERIAL_REQUESTS = "request/material/",
  EMPLOYEE_REQUESTS = "request/employee/",
  CONTRACTS = "company/contract",
  INVOICES = "company/invoices",

  DCC_PO_REQUESTS = "dcc/po/",
  DCC_PC_REQUESTS = "dcc/pc/",
  DCC_SITE_REQUESTS = "dcc/site/",
  DCC_MATERIAL_REQUESTS = "dcc/material/",
  DCC_EMPLOYEE_REQUESTS = "dcc/employee/",
  DCC_CONTRACT_REQUESTS = "dcc/contract/",
  DCC_INVOICE_REQUESTS = "dcc/invoice/",



  FINANCE_PO_REQUESTS = "finance/po/",
  FINANCE_PC_REQUESTS = "finance/pc/",
  FINANCE_SITE_REQUESTS = "finance/site/",
  FINANCE_MATERIAL_REQUESTS = "finance/material/",
  FINANCE_EMPLOYEE_REQUESTS = "finance/employee/",
  FINANCE_CONTRACT_REQUESTS = "finance/contract/",
  FINANCE_INVOICE_REQUESTS = "finance/invoice/",

  PO_REQUEST = "request/po/",
  PC_REQUEST = "request/pc/",
  MATERIAL_REQUEST = "request/material/",
  SITE_REQUEST = "request/site/",
  EMPLOYEE_REQUEST = "request/employee/",
  CONTRACT = "contract/",

  APPROVE_REQUEST = "request/utils/approve/",
  REJECT_REQUEST = "request/utils/reject/",
  APPROVE_CONTRACT = "contract/approve/",
  REJECT_CONTRACT = "contract/reject/",

  // !----- STEPPER Endpoints -----
  STEPPER_POSITION = "stepper/user",
  STEPPER_OTP = "stepper/otp",
  STEPPER_COMPANY = "stepper/company",

  // !----- Attendance Endpoints -----
  ATTENDANCE_STATUS = "attendance/status",
  ATTENDANCE_START = "attendance/start",
  ATTENDANCE_END = "attendance/end",

  // !----- Notifications Endpoints -----
  NOTIFICATIONS = "notifications/",

  // !-----  Admin Dashboard Endpoints -----
  ADMIN_DASHBOARD = "dashboard/attendance",

  DOWNLOAD_FILE = "/download/file/",
  EMPLOYEES_CSV = "/csv/employees/",

  // NEW CHAT
  ALL_DUAL_CHATS = "chat/dual/chats/",
  ALL_GROUP_CHATS = "chat/group/chats/",
  SINGLE_CHAT = "chat/chat/",
  CREATE_CHAT = "chat/dual/create/",
  SEND_MESSAGE = "websocket/chat/send/",

  // not yet
  PERMISSION = "user/utils/permissions/",
  POSITION = "user/info/position/",
  // CHANGE_PASSWORD = "user/auth/password/change/",
  RESET_PASSWORD_CHANGE = "user/auth/password/reset/change/",
  RESET_PASSWORD_SEND = "user/auth/password/reset/send/",
  RESET_PASSWORD_VERIFY = "user/auth/password/reset/verify/",
  ACTIVATE_ACCOUNT = "user/utils/activate/{otp}/{user_id}",
  PROMOTE = "user/utils/user/promote/",
  PROMOTE_DETAILS = "user/utils/user/promote/",
  TASK_ATTACHMENT = "/management/files/task/",
  TASK_ATTACHMENT_DELETE = "/management/files/task/",
  PROJECT_ATTACHMENT = "/management/files/project/",
  PROJECT_ATTACHMENT_DELETE = "/management/files/project/",
  CATEGORY = "category/",
  EMPLOYEE_CREATE = "user/auth/register/",
  EMPLOYEE_PROJECT = "management/employee/",
  /**  Attendance */
  ATTENDANCE = "attendance/daily",
  EMPLOYEES_ATTENDANCES = "attendance/employees",
  EMPLOYEE_ATTENDANCE = "attendance/employee/",
}

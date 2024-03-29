export const superUserMenuData: any[] = [
  // PROJECTS
  {
    name: "Projects Sec",
    routerLink: ["/"],
    identifier: "Projects Sec",
    iconClass: "icofont-file-spreadsheet",
    breadcrumbMessage: "",
    isCategory: false,
    isApp: true,
    children: [
      {
        name: "Projects",
        routerLink: ["/projects"],
        identifier: "Projects",
        iconClass: "icofont-briefcase",
        breadcrumbMessage: "",
        isCategory: false,
        isApp: false,
        children: [],
        roles: ["Superuser", "Sub_Superuser"],
      },
      {
        name: "Suppliers",
        routerLink: ["/suppliers"],
        identifier: "Suppliers",
        iconClass: "icofont-business-man-alt-1",
        breadcrumbMessage: "",
        isCategory: false,
        isApp: true,
        children: [],
        roles: ["Superuser", "Sub_Superuser"],
      },
      {
        name: "Subcontractors",
        routerLink: ["/subcontractors"],
        identifier: "Subcontractors",
        iconClass: "icofont-business-man-alt-1",
        breadcrumbMessage: "",
        isCategory: false,
        isApp: true,
        children: [],
        roles: ["Superuser", "Sub_Superuser"],
        departments: ["Projects", "HR"],
      },
      {
        name: "Po Requests",
        routerLink: ["/po_requests"],
        identifier: "PO_requests",
        iconClass: "icofont-users-alt-1",
        breadcrumbMessage: "",
        isCategory: false,
        isApp: true,
        children: [],
        roles: ["Superuser", "Sub_Superuser"],
      },
      {
        name: "Pc Requests",
        routerLink: ["/pc_requests"],
        identifier: "pc_requests",
        iconClass: "icofont-file-spreadsheet",
        breadcrumbMessage: "",
        isCategory: false,
        isApp: true,
        children: [],
        roles: ["Superuser", "Sub_Superuser"],
      },
      {
        name: "Site Requests",
        routerLink: ["/site_requests"],
        identifier: "Site_Requests",
        iconClass: "icofont-file-spreadsheet",
        breadcrumbMessage: "",
        isCategory: false,
        isApp: true,
        children: [],
        roles: ["Superuser", "Sub_Superuser"],
      },
      {
        name: "Material Requests",
        routerLink: ["/material_requests"],
        identifier: "Material_Requests",
        iconClass: "icofont-file-spreadsheet",
        breadcrumbMessage: "",
        isCategory: false,
        isApp: true,
        children: [],
        roles: ["Superuser", "Sub_Superuser"],
      },
      {
        name: "Employee Requests",
        routerLink: ["/employee_requests"],
        identifier: "Employee_requests",
        iconClass: "icofont-users-alt-1",
        breadcrumbMessage: "",
        isCategory: false,
        isApp: true,
        children: [],
        roles: ["Superuser", "Sub_Superuser"],
      },
      {
        name: "Contracts",
        routerLink: ["/contracts"],
        identifier: "Contracts",
        iconClass: "icofont-briefcase",
        breadcrumbMessage: "",
        isCategory: false,
        isApp: false,
        children: [],
        roles: ["Superuser", "Sub_Superuser"],
        departments: ["Projects"],
      },
    ],
    roles: ["Superuser", "Sub_Superuser"],
  },
  // HR
  {
    name: "HR Sec",
    routerLink: ["/"],
    identifier: "HR Sec",
    iconClass: "icofont-users-alt-1",
    breadcrumbMessage: "",
    isCategory: false,
    isApp: true,
    children: [
      {
        name: "Managers",
        routerLink: ["/managers"],
        identifier: "Managers",
        iconClass: "icofont-users-alt-1",
        breadcrumbMessage: "",
        isCategory: false,
        isApp: true,
        children: [],
        roles: ["Superuser", "Sub_Superuser"],
      },
      {
        name: "Employees",
        routerLink: ["/employees"],
        identifier: "Employees",
        iconClass: "icofont-users-alt-1",
        breadcrumbMessage: "",
        isCategory: false,
        isApp: true,
        children: [],
        roles: ["Superuser", "Sub_Superuser"],
      },
      {
        name: "Customers",
        routerLink: ["/customers"],
        identifier: "Customers",
        iconClass: "icofont-business-man-alt-1",
        breadcrumbMessage: "",
        isCategory: false,
        isApp: true,
        children: [],
        roles: ["Superuser", "Sub_Superuser"],
      },
      {
        name: "Attendance",
        routerLink: ["/attendance"],
        identifier: "Attendance",
        iconClass: "icofont-file-spreadsheet",
        breadcrumbMessage: "",
        isCategory: false,
        isApp: true,
        children: [],
        roles: ["Superuser", "Sub_Superuser"],
      },
      {
        name: "Salaries",
        routerLink: ["/salaries"],
        identifier: "Salaries",
        iconClass: "icofont-file-spreadsheet",
        breadcrumbMessage: "",
        isCategory: false,
        isApp: true,
        children: [],
        roles: ["Superuser", "Sub_Superuser"],
      },
    ],
    roles: ["Superuser", "Sub_Superuser"],
  },

  // FINANCE
  {
    name: "Finance Sec",
    routerLink: ["/"],
    identifier: "Finance Sec",
    iconClass: "icofont-money-bag",
    breadcrumbMessage: "",
    isCategory: false,
    isApp: false,
    children: [
      {
        name: "FCC",
        routerLink: ["/finance-approval"],
        identifier: "FCC ",
        iconClass: "icofont-checked",
        breadcrumbMessage: "",
        isCategory: false,
        isApp: true,
        children: [],
      },
      // this will be all invoices created.
      {
        name: "Payment Certificates",
        routerLink: ["/invoices"],
        identifier: "Payment Certificates",
        iconClass: "",
        breadcrumbMessage: "",
        isCategory: false,
        isApp: false,
        children: [],
      },
      // this will be all payments created
      {
        name: "Payments",
        routerLink: ["/payments"],
        identifier: "Payments",
        iconClass: "",
        breadcrumbMessage: "",
        isCategory: false,
        isApp: false,
        children: [],
      },
      // this will be the statistics for all expenses
      {
        name: "Expenses",
        routerLink: ["/expenses"],
        identifier: "Expenses",
        iconClass: "",
        breadcrumbMessage: "",
        isCategory: false,
        isApp: false,
        children: [],
      },
    ],
    roles: ["Superuser", "Sub_Superuser"],
  },
  // Procurement
  {
    name: "Procurement Sec",
    routerLink: ["/"],
    identifier: "Procurement Sec",
    iconClass: "icofont-worker",
    breadcrumbMessage: "",
    isCategory: false,
    isApp: true,
    children: [
      {
        name: "Procurement",
        routerLink: ["/procurement"],
        identifier: "Procurement",
        iconClass: "icofont-file-spreadsheet",
        breadcrumbMessage: "",
        isCategory: false,
        isApp: true,
        children: [],
        roles: ["Superuser", "Sub_Superuser"],
      },
    ],
    roles: ["Superuser", "Sub_Superuser"],
  },

  // Marketing
  {
    name: "Marketing Sec",
    routerLink: ["/"],
    identifier: "Marketing Sec",
    iconClass: "icofont-unique-idea",
    breadcrumbMessage: "",
    isCategory: false,
    isApp: true,
    children: [
      {
        name: "Marketing",
        routerLink: ["/marketing"],
        identifier: "Marketing",
        iconClass: "icofont-unique-idea",
        breadcrumbMessage: "",
        isCategory: false,
        isApp: true,
        children: [],
        roles: ["Superuser", "Sub_Superuser"],
      },
    ],
    roles: ["Superuser", "Sub_Superuser"],
  },

  // Tender
  {
    name: "Tender Sec",
    routerLink: ["/"],
    identifier: "Tender Sec",
    iconClass: "icofont-ui-calculator",
    breadcrumbMessage: "",
    isCategory: false,
    isApp: true,
    children: [
      {
        name: "Tenders",
        routerLink: ["/tenders"],
        identifier: "Tenders",
        iconClass: "icofont-file-spreadsheet",
        breadcrumbMessage: "",
        isCategory: false,
        isApp: true,
        children: [],
        roles: ["Superuser", "Sub_Superuser"],
      },
    ],
    roles: ["Superuser", "Sub_Superuser"],
  },

  {
    name: "Dcc",
    routerLink: ["/dcc"],
    identifier: "Dcc",
    iconClass: "icofont-file-spreadsheet",
    breadcrumbMessage: "",
    isCategory: false,
    isApp: false,
    children: [],
    roles: ["Superuser", "Sub_Superuser"],
  },
  {
    name: "Daily Reports",
    routerLink: ["/daily_reports"],
    identifier: "Daily Reports",
    iconClass: "icofont-file-alt",
    breadcrumbMessage: "",
    isCategory: false,
    isApp: false,
    children: [],
    roles: ["Superuser", "Sub_Superuser"],
  },

  {
    name: "Inventory",
    routerLink: ["/inventory"],
    identifier: "Inventory",
    iconClass: "icofont-tools-bag",
    breadcrumbMessage: "",
    isCategory: false,
    isApp: false,
    children: [],
    roles: ["Superuser", "Sub_Superuser"],
  },

  // CHAT
  {
    name: "Chat",
    routerLink: ["/chat"],
    identifier: "Chat",
    iconClass: "icofont-chat",
    breadcrumbMessage: "",
    isCategory: false,
    isApp: true,
    children: [],
    roles: ["Superuser", "Sub_Superuser"],
  },

  // Calendar
  {
    name: "Calendar",
    routerLink: ["/calendar"],
    identifier: "Calendar",
    iconClass: "icofont-calendar",
    breadcrumbMessage: "",
    isCategory: false,
    isApp: true,
    children: [],
    roles: ["Superuser", "Sub_Superuser"],
  },

  // SETTINGS
  {
    name: "Settings",
    routerLink: ["/settings"],
    identifier: "Settings",
    iconClass: "icofont-settings-alt",
    breadcrumbMessage: "",
    isCategory: false,
    isApp: true,
    children: [],
    roles: ["Superuser", "Sub_Superuser"],
  },

  {
    name: "Groups",
    routerLink: ["/groups"],
    identifier: "Groups",
    iconClass: "icofont-briefcase",
    breadcrumbMessage: "",
    isCategory: false,
    isApp: false,
    children: [],
    roles: ["Superuser", "Sub_Superuser"],
  },
  {
    name: "Tasks",
    routerLink: ["/tasks"],
    identifier: "Tasks",
    iconClass: "icofont-tasks-alt",
    breadcrumbMessage: "",
    isCategory: false,
    isApp: false,
    children: [],
    roles: ["Superuser", "Sub_Superuser"],
  },
];

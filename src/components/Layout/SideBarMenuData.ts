export const SideBarMenuData: any[] = [
  // ******************************** With Children Menus
  // Projects
  {
    name: "Projects",
    routerLink: ["/"],
    identifier: "Projects",
    iconClass: "icofont-briefcase",
    breadcrumbMessage: "",
    isCategory: false,
    isApp: false,
    children: [
      {
        name: "Suppliers",
        routerLink: ["/suppliers"],
        identifier: "Suppliers",
        iconClass: "icofont-business-man-alt-1",
        breadcrumbMessage: "",
        isCategory: false,
        isApp: true,
        children: [],
        roles: ["Superuser", "User", "Manager", "Director"],
        departments: ["Projects", "Finance", "HR", "Procurement", "Tender"]
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
        roles: ["Superuser", "User", "Manager", "Director"],
        departments: ["Projects", "Finance", "HR", "Procurement", "Tender"]
      },
      {
        name: "Subcontractors",
        routerLink: ["/subcontractor"],
        identifier: "Subcontractors",
        iconClass: "icofont-business-man-alt-1",
        breadcrumbMessage: "",
        isCategory: false,
        isApp: true,
        children: [],
        roles: ["Superuser", "User", "Manager", "Director"],
        departments: ["Projects", "Finance", "HR", "Procurement", "Tender"]
      },
    ],
    roles: ["Superuser", "User", "Manager", "Director"],
    departments: ["Projects", "Finance", "Procurement", "Tender", "HR"]
  },
  // Requests
  {
    name: "Requests",
    routerLink: ["/"],
    identifier: "PO_requests",
    iconClass: "icofont-users-alt-1",
    breadcrumbMessage: "",
    isCategory: false,
    isApp: true,
    children: [
      {
        name: "Employee Requests",
        routerLink: ["/employee_requests"],
        identifier: "Employee_requests",
        iconClass: "icofont-users-alt-1",
        breadcrumbMessage: "",
        isCategory: false,
        isApp: true,
        children: [],
        roles: ["Superuser", "User", "Manager", "Director"],
        departments: ["Projects", "Procurement", "Tender", "Finance", "HR"]
      },
      {
        name: "PO Requests",
        routerLink: ["/po_requests"],
        identifier: "PO_requests",
        iconClass: "icofont-users-alt-1",
        breadcrumbMessage: "",
        isCategory: false,
        isApp: true,
        children: [],
        roles: ["Superuser", "User", "Manager", "Director"],
        departments: ["Projects", "Procurement", "Tender", "Finance"]
      },
      {
        name: "PC Requests",
        routerLink: ["/pc_requests"],
        identifier: "pc_requests",
        iconClass: "icofont-file-spreadsheet",
        breadcrumbMessage: "",
        isCategory: false,
        isApp: true,
        children: [],
        roles: ["Superuser", "User", "Manager", "Director"],
        departments: ["Projects", "Procurement", "Tender", "Finance"]
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
        roles: ["Superuser", "User", "Manager", "Director"],
        departments: ["Projects", "Procurement", "Tender", "Finance"]
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
        roles: ["Superuser", "User", "Manager", "Director"],
        departments: ["Projects", "Procurement", "Tender", "Finance"]
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
        roles: ["Superuser", "User", "Manager", "Director"],
        departments: ["Projects", "Procurement", "Tender", "Finance"]
      },
    ],
    roles: ["Superuser", "User", "Manager", "Director"],
    departments: ["Projects", "Finance", "Procurement", "Tender", "HR"]
  },
  // Finances
  {
    name: "Finances",
    routerLink: ["/"],
    identifier: "Finances",
    iconClass: "icofont-users-alt-1",
    breadcrumbMessage: "",
    isCategory: false,
    isApp: true,
    children: [
      {
        name: "Invoices",
        routerLink: ["/invoices"],
        identifier: "Invoices",
        iconClass: "",
        breadcrumbMessage: "",
        isCategory: false,
        isApp: false,
        children: [],
        roles: ["Superuser", "User", "Director", "Manager"],
        departments: ["Finance"]
      },
      {
        name: "Project INV",
        routerLink: ["/project_inv"],
        identifier: "Project INV",
        iconClass: "icofont-briefcase",
        breadcrumbMessage: "",
        isCategory: false,
        isApp: false,
        children: [],
        roles: ["Superuser", "User", "Director", "Manager"],
        departments: ["Finance"]
      },
      {
        name: "Cost Center",
        routerLink: ["/cost_center"],
        identifier: "Cost Center",
        iconClass: "icofont-briefcase",
        breadcrumbMessage: "",
        isCategory: false,
        isApp: false,
        children: [],
        roles: ["Superuser", "User", "Manager", "Director"],
        departments: ["Finance"]
      },
      {
        name: "Payments",
        routerLink: ["/payments"],
        identifier: "Payments",
        iconClass: "icofont-briefcase",
        breadcrumbMessage: "",
        isCategory: false,
        isApp: false,
        children: [],
        roles: ["Superuser", "User", "Director", "Manager"],
        departments: ["Finance"]
      },
      {
        name: "Expenses",
        routerLink: ["/expenses"],
        identifier: "Expenses",
        iconClass: "icofont-briefcase",
        breadcrumbMessage: "",
        isCategory: false,
        isApp: false,
        children: [],
        roles: ["Superuser", "User", "Director", "Manager"],
        departments: ["Finance"]
      },
    ],
    roles: ["Superuser", "User", "Manager", "Director"],
    departments: ["Finance"]
  },
  // HR Only
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
        roles: ["Superuser", "Director", "Manager", "User"]
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
        roles: ["Superuser", "Director", "Manager", "User"]
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
        roles: ["Superuser", "Director", "Manager", "User"]
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
        roles: ["Superuser", "User", "Manager", "Director"],
      },
      {
        name: "Job Offer",
        routerLink: ["/job_offer"],
        identifier: "Job Offer",
        iconClass: "icofont-file-spreadsheet",
        breadcrumbMessage: "",
        isCategory: false,
        isApp: true,
        children: [],
        roles: ["Superuser", "User", "Manager", "Director"],
      },
    ],
    roles: ["Superuser", "User", "Manager", "Director"],
    departments: ["HR"]
  },
  // HR for all
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
        roles: ["Superuser", "Director", "Manager"]
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
        roles: ["Superuser", "Director", "Manager"]
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
        roles: ["Superuser", "Director", "Manager"]
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
        roles: ["Superuser", "Director", "Manager"]
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
        roles: ["Superuser", "Director", "Manager"]
      },
    ],
    roles: ["Superuser", "User", "Manager", "Director"],
    departments: ["Projects", "Finance", "Procurement", "Tender"]
  },


  // ******************************** Without Children Menus
  // Procurement Plan
  {
    name: "Procurement Plan",
    routerLink: ["/procurement_plan"],
    identifier: "Procurement Plan",
    iconClass: "icofont-briefcase",
    breadcrumbMessage: "",
    isCategory: false,
    isApp: false,
    children: [],
    roles: ["Superuser", "Manager", "Director"],
    departments: ["Projects", "Procurement", "Tender", "Finance"]
  },
  // Construction Plan
  {
    name: "Construction Plan",
    routerLink: ["/construction_plan"],
    identifier: "Construction Plan",
    iconClass: "icofont-briefcase",
    breadcrumbMessage: "",
    isCategory: false,
    isApp: false,
    children: [],
    roles: ["Superuser", "Manager", "Director"],
    departments: ["Projects", "Procurement", "Tender", "Finance"]
  },
  // Inventory
  {
    name: "Inventory",
    routerLink: ["/inventory"],
    identifier: "Inventory",
    iconClass: "icofont-briefcase",
    breadcrumbMessage: "",
    isCategory: false,
    isApp: false,
    children: [],
    roles: ["Superuser", "User", "Manager", "Director"],
    departments: ["Projects", "Procurement", "Tender"]
  },










  // *************************************************************
  // <Tender Department>
  {
    name: "Tenders",
    routerLink: ["/tenders"],
    identifier: "Tenders",
    iconClass: "icofont-file-spreadsheet",
    breadcrumbMessage: "",
    isCategory: false,
    isApp: true,
    children: [],
    roles: ["Superuser", "User", "Manager", "Director"],
    departments: ["Tender", "Finance", "HR"]
  },
  // <Marketing Department>
  {
    name: "Marketing",
    routerLink: ["/marketing"],
    identifier: "Marketing",
    iconClass: "icofont-unique-idea",
    breadcrumbMessage: "",
    isCategory: false,
    isApp: true,
    children: [],
    roles: ["Superuser", "User", "Manager", "Director"],
    departments: ["Marketing"]
  },

  // *************************************************************
  // <Open For All Departments>
  {
    name: "DCC",
    routerLink: ["/dcc"],
    identifier: "DCC",
    iconClass: "icofont-briefcase",
    breadcrumbMessage: "",
    isCategory: false,
    isApp: false,
    children: [],
    roles: ["Superuser", "User", "Manager", "Director"],
    departments: [
      "Projects",
      "HR",
      "Finance",
      "Marketing",
      "Tender",
      "Procurement"
    ]
  },
  // {
  //   name: "Reports",
  //   routerLink: ["/reports"],
  //   identifier: "Reports",
  //   iconClass: "icofont-briefcase",
  //   breadcrumbMessage: "",
  //   isCategory: false,
  //   isApp: false,
  //   children: [],
  //   roles: ["Superuser","User", "Manager", "Director"],
  //   departments: [
  //     "Projects",
  //     "HR",
  //     "Finance",
  //     "Marketing",
  //     "Tender",
  //     "Procurement"
  //   ]
  // },
  // {
  //   name: "Groups",
  //   routerLink: ["/groups"],
  //   identifier: "Groups",
  //   iconClass: "icofont-briefcase",
  //   breadcrumbMessage: "",
  //   isCategory: false,
  //   isApp: false,
  //   children: [],
  //   roles: ["Superuser","User", "Manager", "Director"],
  //   departments: [
  //     "Projects",
  //     "HR",
  //     "Finance",
  //     "Marketing",
  //     "Tender",
  //     "Procurement"
  //   ]
  // },
  {
    name: "Tasks",
    routerLink: ["/tasks"],
    identifier: "Tasks",
    iconClass: "icofont-tasks-alt",
    breadcrumbMessage: "",
    isCategory: false,
    isApp: false,
    children: [],
    roles: ["Superuser", "User", "Manager", "Director"],
    departments: [
      "Projects",
      "HR",
      "Finance",
      "Marketing",
      "Tender",
      "Procurement"
    ]
  },
  {
    name: "Chat",
    routerLink: ["/chat"],
    identifier: "Chat",
    iconClass: "icofont-chat",
    breadcrumbMessage: "",
    isCategory: false,
    isApp: true,
    children: [],
    roles: ["Superuser", "User", "Manager", "Director"],
    departments: [
      "Projects",
      "HR",
      "Finance",
      "Marketing",
      "Tender",
      "Procurement"
    ]
  },
  {
    name: "Calendar",
    routerLink: ["/calendar"],
    identifier: "Calendar",
    iconClass: "icofont-calendar",
    breadcrumbMessage: "",
    isCategory: false,
    isApp: true,
    children: [],
    roles: ["Superuser", "Manager", "Director"],
    departments: [
      "HR",
      "Finance",
      "Marketing",
      "Tender",
      "Procurement"
    ]
  }
];

import { PAGES } from "constants/pages";
import { lazy } from "react";
import Todos from "screens/Todos/Todos";

const Dashboard = lazy(() => import("../screens/Dashboard/Dashboard"));
const Tenders = lazy(() => import("../screens/Tenders/Tenders"));
const Settings = lazy(() => import("../screens/Settings/Settings"));
const Dcc = lazy(() => import("../screens/Documents/Dcc/Dcc"));

const TaskDetails = lazy(() => import("../screens/Tasks/TaskDetails"));
const TaskFormPage = lazy(() => import("../screens/Tasks/TaskFormPage"));
const Tasks = lazy(() => import("../screens/Tasks/Tasks"));
const TenderDetails = lazy(() => import("../screens/Tenders/TenderDetails"));

// const Dcc = lazy(() => import("../Dcc/Dcc"));

// TABLES DATA //
const PoRequests = lazy(() => import("../screens/Documents/PoRequests/PoRequests"));
const PcRequests = lazy(() => import("../screens/Documents/PcRequests/PcRequests"));
const SiteRequests = lazy(() => import("../screens/Documents/SiteRequests/SiteRequests"));
const MaterialRequests = lazy(() => import("../screens/Documents/MaterialRequests/MaterialRequests"));
const EmployeeRequests = lazy(() => import("../screens/Documents/EmployeeRequests/EmployeeRequests"));
const Contracts = lazy(() => import("../screens/Documents/Contracts/Contracts"));
const Invoices = lazy(() => import("../screens/Documents/Invoices/Invoices"));
// ---
const Customers = lazy(() => import("../screens/Customers/Customers"));
const Suppliers = lazy(() => import("../screens/Suppliers/Suppliers"));
const Employees = lazy(() => import("../screens/Employees/Employees"));
const Subcontractors = lazy(() => import("../screens/Subcontractors/Subcontractors"));
const Projects = lazy(() => import("../screens/Projects/Projects"));

// DOCUMENT PAGE DETAILS //
const PoRequestDetails = lazy(() => import("../screens/Documents/PoRequests/PoRequestDetails"));
const PcRequestDetails = lazy(() => import("../screens/Documents/PcRequests/PcRequestDetails"));
const SiteRequestDetails = lazy(() => import("../screens/Documents/SiteRequests/SiteRequestDetails"));
const MaterialRequestDetails = lazy(() => import("../screens/Documents/MaterialRequests/MaterialRequestDetails"));
const EmployeeRequestDetails = lazy(() => import("../screens/Documents/EmployeeRequests/EmployeeRequestDetails"));
const ContractDetails = lazy(() => import("../screens/Documents/Contracts/ContractDetails"));
const InvoiceDetails = lazy(() => import("../screens/Documents/Invoices/InvoiceDetails"));
// ---
const CustomerDetails = lazy(() => import("../screens/Customers/CustomerDetails"));
const SupplierDetails = lazy(() => import("../screens/Suppliers/SupplierDetails"));
const EmployeeDetails = lazy(() => import("../screens/Employees/EmployeeDetails"));
const SubcontractorDetails = lazy(() => import("../screens/Subcontractors/SubcontractorDetails"));
const ProjectDetails = lazy(() => import("../screens/Projects/ProjectDetails"));

// CREATE //
const PoFormPage = lazy(() => import("../screens/Documents/PoRequests/PoFormPage"));
const PcFormPage = lazy(() => import("../screens/Documents/PcRequests/PcFormPage"));
const SiteFormPage = lazy(() => import("../screens/Documents/SiteRequests/SiteFormPage"));
const MaterialFormPage = lazy(() => import("../screens/Documents/MaterialRequests/MaterialFormPage"));
const EmployeeRequestFormPage = lazy(() => import("../screens/Documents/EmployeeRequests/EmployeeRequestFormPage"));
const ContractFormPage = lazy(() => import("../screens/Documents/Contracts/ContractFormPage"));
// const InvoiceFormPage = lazy(() => import("../screens/Documents/Invoices/InvoiceFormPage"));
// ---
const CustomerFormPage = lazy(() => import("../screens/Customers/CustomerFormPage"));
const SupplierFormPage = lazy(() => import("../screens/Suppliers/SupplierFormPage"));
const EmployeeFormPage = lazy(() => import("../screens/Employees/EmployeeFormPage"));
const SubcontractorFormPage = lazy(() => import("../screens/Subcontractors/SubcontractorFormPage"));
const ProjectFormPage = lazy(() => import("../screens/Projects/ProjectFormPage"));
const TenderFormPage = lazy(() => import("../screens/Tenders/TenderFormPage"));

const PersonalProfileDetails = lazy(() => import("../screens/Profile/PersonalProfileDetails"));

// // EDIT //
// const PoRequestEditPage = lazy(() => import("../PoRequests/PoRequestEditPage"));
// const PcRequestEditPage = lazy(() => import("../PcRequests/PcRequestEditPage"));
// const SiteRequestEditPage = lazy(() => import("../SiteRequests/SiteRequestEditPage"));
// const MaterialRequestEditPage = lazy(() => import("../MaterialRequests/MaterialRequestEditPage"));
// const EmployeeRequestEditPage = lazy(() => import("../EmployeeRequest/EmployeeRequestFormPage"));
// const ContractEditPage = lazy(() => import("../Contracts/ContractEditPage"));
// const InvoiceEditPage = lazy(() => import("../Invoices/InvoiceFormPage"));

// ********************************************************************************************

// const MaterialForwardingPage = lazy(() => import("../MaterialRequests/MaterialForwardingPage"));

const DailyReportDetails = lazy(() => import("../screens/DailyReports/DailyReportDetails"));
const DailyReportFormPage = lazy(() => import("../screens/DailyReports/DailyReportFormPage"));
const DailyReports = lazy(() => import("../screens/DailyReports/DailyReports"));
const Notifications = lazy(() => import("../screens/Notifications/Notifications"));
const InventoryItemDetails = lazy(() => import("../screens//Inventory/InventoryItemDetails"));
// const ContractDetails = lazy(() => import("../Contracts/ContractDetails"));

const InventoryDetails = lazy(() => import("../screens/Inventory/InventoryDetails"));
const Inventory = lazy(() => import("../screens/Inventory/Inventory"));
// const Tasks = lazy(() => import("../Tasks/Tasks"));
// const Tickets = lazy(() => import("../Tickets/TicketsView"));
// const ChatApp = lazy(() => import("../Chat/ChatApp"));
// const Calendar = lazy(() => import("../App/Calendar"));
// const AllEmployeesAttendance = lazy(() => import("../Attendance/AllEmployeesAttendance"));
// const ProjectDetails = lazy(() => import("../Projects/ProjectDetails"));
// const TaskDetails = lazy(() => import("../Tasks/TaskDetails"));
// const Categories = lazy(() => import("../Category/Category"));
// const Managers = lazy(() => import("../Manager/Managers"));
const Groups = lazy(() => import("../screens/Groups/Groups"));
// const EmployeeProfile = lazy(() => import("../Profile/EmployeeProfile"));
const FinanceApproval = lazy(() => import("../screens/Finance/FinanceApproval/FinanceApproval"));

// const EnquiresDetail = lazy(() => import("../Tickets/TicketsDetail"));

export interface PagesRenderProps {
  slug: string | null;
  id?: string;
}

export const PagesRender = ({ slug, id }: PagesRenderProps): React.ReactNode => {
  if (id) {
    switch (slug) {
      // case PAGES.PROJECTS:
      // 	return <ProjectDetails id={id} />;
      // case PAGES.TASKS:
      // 	return <TaskDetails id={id} />;
      // case PAGES.PROFILE:
      //   return <EmployeeProfile id={parseFloat(id)} />;
      // case PAGES.ATTENDANCE:
      //   return <Attendance id={id} />;
      // case PAGES.INVENTORY:
      // 	return <InventoryDetails id={id} />;

      // case PAGES.EDIT_PO_REQUEST:
      // 	return <PoRequestEditPage id={id} />;
      // case PAGES.EDIT_PC_REQUEST:
      // 	return <PcRequestEditPage id={id} />;
      // case PAGES.EDIT_SITE_REQUEST:
      // 	return <SiteRequestEditPage id={id} />;
      // case PAGES.EDIT_MATERIAL_REQUEST:
      // 	return <MaterialRequestEditPage id={id} />;
      // case PAGES.MATERIAL_FORWARDING_REQUEST:
      // 	return <MaterialForwardingPage id={id} />;
      // case PAGES.INVOICES:
      // 	return <Invoices id={id} />;
      //
      // case PAGES.EDIT_CONTRACT:
      // 	return <ContractEditPage id={id} />;
      // ----
      case PAGES.PO_REQUEST_INFO:
        return <PoRequestDetails id={id} />;
      case PAGES.PO_REQUEST:
        return <PoFormPage id={id} />;
      // ---
      case PAGES.PC_REQUEST_INFO:
        return <PcRequestDetails id={id} />;
      case PAGES.PC_REQUEST:
        return <PcFormPage id={id} />;
      // ---
      case PAGES.SITE_REQUEST_INFO:
        return <SiteRequestDetails id={id} />;
      case PAGES.SITE_REQUEST:
        return <SiteFormPage id={id} />;
      // ---
      case PAGES.EMPLOYEE_REQUEST_INFO:
        return <EmployeeRequestDetails id={id} />;
      case PAGES.EMPLOYEE:
        return <EmployeeFormPage id={id} />;
      // ---
      case PAGES.MATERIAL_REQUEST_INFO:
        return <MaterialRequestDetails id={id} />;
      case PAGES.MATERIAL_REQUEST:
        return <MaterialFormPage id={id} />;
      // ---
      case PAGES.CONTRACT_INFO:
        return <ContractDetails id={id} />;
      case PAGES.CONTRACT:
        return <ContractFormPage id={id} />;
      // ---
      case PAGES.INVOICE_INFO:
        return <InvoiceDetails id={id} />;
      // ---
      case PAGES.CUSTOMER_INFO:
        return <CustomerDetails id={id} />;
      case PAGES.CUSTOMER:
        return <CustomerFormPage id={id} />;
      // ---
      case PAGES.SUPPLIER_INFO:
        return <SupplierDetails id={id} />;
      case PAGES.SUPPLIER:
        return <SupplierFormPage id={id} />;
      // ---
      case PAGES.EMPLOYEE_INFO:
        return <EmployeeDetails id={id} />;
      // ---
      case PAGES.SUBCONTRACTOR_INFO:
        return <SubcontractorDetails id={id} />;
      case PAGES.SUBCONTRACTOR:
        return <SubcontractorFormPage id={id} />;
      // ---
      case PAGES.PROJECT_INFO:
        return <ProjectDetails id={id} />;
      case PAGES.PROJECT:
        return <ProjectFormPage id={id} />;
      // ---
      case PAGES.INVENTORY:
        return <InventoryDetails id={id} />;
      case PAGES.INVENTORY_ITEM:
        return <InventoryItemDetails id={id} />;
      // ---
      case PAGES.TENDER_INFO:
        return <TenderDetails id={id} />;
      case PAGES.TENDER:
        return <TenderFormPage id={id} />;
      // ---
      case PAGES.Task_INFO:
        return <TaskDetails id={id} />;
      case PAGES.TASK:
        return <TaskFormPage id={id} />;
      // ---
      case PAGES.DAILY_REPORT_INFO:
        return <DailyReportDetails id={id} />;
      case PAGES.DAILY_REPORT:
        return <DailyReportFormPage id={id} />;
    }
  } else
    switch (slug) {
      case PAGES.PO_REQUESTS:
        return <PoRequests />;
      case PAGES.PO_REQUEST:
        return <PoFormPage />;
      // ---
      case PAGES.PC_REQUESTS:
        return <PcRequests />;
      case PAGES.PC_REQUEST:
        return <PcFormPage />;
      // ---
      case PAGES.SITE_REQUESTS:
        return <SiteRequests />;
      case PAGES.SITE_REQUEST:
        return <SiteFormPage />;
      // ---
      case PAGES.MATERIAL_REQUESTS:
        return <MaterialRequests />;
      case PAGES.MATERIAL_REQUEST:
        return <MaterialFormPage />;
      // ---
      case PAGES.EMPLOYEE_REQUESTS:
        return <EmployeeRequests />;
      case PAGES.EMPLOYEE_REQUEST:
        return <EmployeeRequestFormPage />;
      // ---
      case PAGES.CONTRACTS:
        return <Contracts />;
      case PAGES.CONTRACT:
        return <ContractFormPage />;
      // ---
      case PAGES.INVOICES:
        return <Invoices />;
      // ---
      case PAGES.CUSTOMERS:
        return <Customers />;
      case PAGES.CUSTOMER:
        return <CustomerFormPage />;
      // ---
      case PAGES.SUPPLIERS:
        return <Suppliers />;
      case PAGES.SUPPLIER:
        return <SupplierFormPage />;
      // ---
      case PAGES.EMPLOYEES:
        return <Employees />;
      case PAGES.EMPLOYEE:
        return <EmployeeFormPage />;
      // ---
      case PAGES.SUBCONTRACTORS:
        return <Subcontractors />;
      case PAGES.SUBCONTRACTOR:
        return <SubcontractorFormPage />;
      // ---
      case PAGES.PROJECTS:
        return <Projects />;
      case PAGES.PROJECT:
        return <ProjectFormPage />;
      // ---
      case PAGES.TENDERS:
        return <Tenders />;
      case PAGES.TENDER:
        return <TenderFormPage />;
      // ---
      case PAGES.TASKS:
        return <Tasks />;
      case PAGES.TASK:
        return <TaskFormPage />;
      // ---
      case PAGES.DAILY_REPORTS:
        return <DailyReports />;
      case PAGES.DAILY_REPORT:
        return <DailyReportFormPage />;
      // ---
      case PAGES.INVENTORY:
        return <Inventory />;
      case PAGES.PROFILE:
        return <PersonalProfileDetails />;
      // case PAGES.PERSONAL_PROFILE:
      //   return <PersonalProfile />;
      // ---
      case PAGES.TODO:
        return <Todos />;

      // ---
      case PAGES.SETTINGS:
        return <Settings />;

      case PAGES.GROUPS:
        return <Groups />;

      case PAGES.DCC:
        return <Dcc />;

      case PAGES.NOTIFICATIONS:
        return <Notifications />;

      case PAGES.FINANCE_APPROVAL:
        return <FinanceApproval />;

      // case PAGES.INVENTORY:
      // 	return <Inventory />;

      // case PAGES.DCC:
      //   return <ComingSoon />;

      // case PAGES.DAILY_REPORTS:
      // return <ComingSoon />;
      // case PAGES.DAILY_REPORTS:
      // 	return <DailyReports />;
      // ---
      // case PAGES.PROFILE:
      //   return <Profile />;

      // case PAGES.INVOICES:
      // 	// return <InvoicesSample />;
      // 	return <ComingSoon />;
      // case PAGES.PROFILE:
      // 	return <EmployeeProfile />;
      // case PAGES.TENDERS:
      //   return <Tenders />;

      // case PAGES.TASKS:
      // 	return <Tasks />;

      // case PAGES.ATTENDANCE:
      // 	return <AllEmployeesAttendance />;
      // case PAGES.CALENDAR:
      // 	return <Calendar />;
      // case PAGES.CATEGORIES:
      // 	return <Categories />;

      // case PAGES.SALARIES:
      //   return <Categories />;
      // case PAGES.SALARIES:
      // 	return <ComingSoon />;

      // case PAGES.CHAT:
      // 	return <ChatApp />;
      // NEW **********************

      // case PAGES.PROCUREMENT:
      //   return <Categories />;
      // case PAGES.MARKETING:
      //   return <Categories />;
      // case PAGES.PROCUREMENT:
      // 	return <ComingSoon />;
      // case PAGES.MARKETING:
      // 	return <ComingSoon />;

      // case PAGES.Enquires:
      // 	return <Tickets />;
      // case PAGES.Enquires_DETAILS:
      // 	return <EnquiresDetail />;
      // case PAGES.MANAGERS:
      // 	return <Managers />;
      // case PAGES.GROUPS:
      // 	return <Groups />;

      default:
        return <Dashboard />;
    }
};

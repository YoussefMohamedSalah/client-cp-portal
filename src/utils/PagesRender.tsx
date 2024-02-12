import { PAGES } from "constants/pages";
import { lazy } from "react";










const Dashboard = lazy(() => import("../screens/Dashboard/Dashboard"));
const Tenders = lazy(() => import("../screens/Tenders/Tenders"));
// const Settings = lazy(() => import("../screens/Settings/Settings"));







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
const InvoiceFormPage = lazy(() => import("../screens/Documents/Invoices/InvoiceFormPage"));
// ---
const CustomerFormPage = lazy(() => import("../screens/Customers/CustomerFormPage"));
const SupplierFormPage = lazy(() => import("../screens/Suppliers/SupplierFormPage"));
const EmployeeFormPage = lazy(() => import("../screens/Employees/EmployeeFormPage"));
const SubcontractorFormPage = lazy(() => import("../screens/Subcontractors/SubcontractorFormPage"));
const ProjectFormPage = lazy(() => import("../screens/Projects/ProjectFormPage"));

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
















// const DailyReports = lazy(() => import("../DailyReports/DailyReports"));

// const InventoryDetails = lazy(() => import("../Inventory/InventoryDetails"));
// const InventoryItemDetails = lazy(() =>
// 	import("../Inventory/InventoryItemDetails")
// );
// const ContractDetails = lazy(() => import("../Contracts/ContractDetails"));

// const Inventory = lazy(() => import("../Inventory/Inventory"));
// const Tasks = lazy(() => import("../Tasks/Tasks"));
// const Tickets = lazy(() => import("../Tickets/TicketsView"));
// const ChatApp = lazy(() => import("../Chat/ChatApp"));
// const Calendar = lazy(() => import("../App/Calendar"));
// const AllEmployeesAttendance = lazy(() => import("../Attendance/AllEmployeesAttendance"));
// const ProjectDetails = lazy(() => import("../Projects/ProjectDetails"));
// const TaskDetails = lazy(() => import("../Tasks/TaskDetails"));
// const Categories = lazy(() => import("../Category/Category"));
// const Managers = lazy(() => import("../Manager/Managers"));
// const Groups = lazy(() => import("../Groups/Groups"));
// const EmployeeProfile = lazy(() => import("../Profile/EmployeeProfile"));


// const EnquiresDetail = lazy(() => import("../Tickets/TicketsDetail"));
// const Notifications = lazy(() => import("../Notifications/Notifications"));



export interface PagesRenderProps {
	slug: string | null;
	id: string | null;
};

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
			// case PAGES.INVENTORY_ITEM:
			// 	return <InventoryItemDetails id={id} />;

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
			case PAGES.PC_REQUEST_INFO:
				return <PcRequestDetails id={id} />;
			case PAGES.SITE_REQUEST_INFO:
				return <SiteRequestDetails id={id} />;
			case PAGES.EMPLOYEE_REQUEST_INFO:
				return <EmployeeRequestDetails id={id} />;
			case PAGES.MATERIAL_REQUEST_INFO:
				return <MaterialRequestDetails id={id} />;
			case PAGES.CONTRACT_INFO:
				return <ContractDetails id={id} />;
			case PAGES.INVOICE_INFO:
				return <InvoiceDetails id={id} />;
			// ---
			case PAGES.CUSTOMER_INFO:
				return <CustomerDetails id={id} />;
			// ---
			case PAGES.SUPPLIER_INFO:
				return <SupplierDetails id={id} />;
			// ---
			case PAGES.EMPLOYEE_INFO:
				return <EmployeeDetails id={id} />;
			// ---
			case PAGES.SUBCONTRACTOR_INFO:
				return <SubcontractorDetails id={id} />;

			// ---
			case PAGES.PROJECT_INFO:
				return <ProjectDetails id={id} />;
		}
	} else
		switch (slug) {
			case PAGES.PO_REQUESTS:
				return <PoRequests />;
			case PAGES.PO_REQUEST:
				return <PoFormPage id={id ? id : null} />;
			// ---
			case PAGES.PC_REQUESTS:
				return <PcRequests />;
			case PAGES.PC_REQUEST:
				return <PcFormPage id={id ? id : null} />;
			// ---
			case PAGES.SITE_REQUESTS:
				return <SiteRequests />;
			case PAGES.SITE_REQUEST:
				return <SiteFormPage id={id ? id : null} />;
			// ---
			case PAGES.MATERIAL_REQUESTS:
				return <MaterialRequests />;
			case PAGES.MATERIAL_REQUEST:
				return <MaterialFormPage id={id ? id : null} />;
			// ---
			case PAGES.EMPLOYEE_REQUESTS:
				return <EmployeeRequests />;
			case PAGES.EMPLOYEE_REQUEST:
				return <EmployeeRequestFormPage id={id ? id : null} />;
			// ---
			case PAGES.CONTRACTS:
				return <Contracts />;
			case PAGES.CONTRACT:
				return <ContractFormPage id={id ? id : null} />;
			// ---
			case PAGES.INVOICES:
				return <Invoices />;
			// ---
			case PAGES.CUSTOMERS:
				return <Customers />;
			case PAGES.CUSTOMER:
				return <CustomerFormPage id={id ? id : null} />;
			// ---
			case PAGES.SUPPLIERS:
				return <Suppliers />;
			case PAGES.SUPPLIER:
				return <SupplierFormPage id={id ? id : null} />;
			// ---
			case PAGES.EMPLOYEES:
				return <Employees />;
			case PAGES.EMPLOYEE:
				return <EmployeeFormPage id={id ? id : null} />;
			// ---
			case PAGES.SUBCONTRACTORS:
				return <Subcontractors />;
			case PAGES.SUBCONTRACTOR:
				return <SubcontractorFormPage id={id ? id : null} />;
			// ---
			case PAGES.PROJECTS:
				return <Projects />;
			case PAGES.PROJECT:
				return <ProjectFormPage id={id ? id : null} />;




			// case PAGES.INVENTORY:
			// 	return <Inventory />;

			// case PAGES.DCC:
			// 	return <Dcc />;

			// case PAGES.NOTIFICATIONS:
			// 	return <Notifications />
			// case PAGES.DCC:
			//   return <ComingSoon />;

			// case PAGES.DAILY_REPORTS:
			// return <ComingSoon />;
			// case PAGES.DAILY_REPORTS:
			// 	return <DailyReports />;
			// ---

			// case PAGES.SETTINGS:
			// 	return <Settings />;
			// case PAGES.PROFILE:
			//   return <Profile />;
			case PAGES.PROJECTS:
				return <Projects />;

			// case PAGES.INVOICES:
			// 	// return <InvoicesSample />;
			// 	return <ComingSoon />;
			// case PAGES.PROFILE:
			// 	return <EmployeeProfile />;
			case PAGES.TENDERS:
				return <Tenders />;

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
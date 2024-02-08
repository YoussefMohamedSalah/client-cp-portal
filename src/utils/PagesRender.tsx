import { PAGES } from "constants/pages";
import { lazy } from "react";
// import ComingSoon from "screens/ComingSoon";










const Dashboard = lazy(() => import("../Dashboard/Dashboard"));
const Projects = lazy(() => import("../screens/"));
const Tenders = lazy(() => import("../Tenders/Tenders"));
const Customers = lazy(() => import("../Customers/Customers"));
const Subcontractors = lazy(() => import("../Subcontractors/Subcontractors"));
const Employees = lazy(() => import("../Employee/Employees"));
const Suppliers = lazy(() => import("../Suppliers/Suppliers"));
const Settings = lazy(() => import("../Settings/Settings"));










const Dcc = lazy(() => import("../Dcc/Dcc"));
// TABLES DATA //
const PoRequests = lazy(() => import("../screens/Documents/PoRequests/PoRequests"));
const PcRequests = lazy(() => import("../screens/Documents/PcRequests/PcRequests"));
const SiteRequests = lazy(() => import("../screens/Documents/SiteRequests/SiteRequests"));
const MaterialRequests = lazy(() => import("../screens/Documents/MaterialRequests/MaterialRequests"));
const EmployeeRequests = lazy(() => import("../screens/Documents/EmployeeRequests/EmployeeRequests"));
const Contracts = lazy(() => import("../screens/Documents/Contracts/Contracts"));
const Invoices = lazy(() => import("../screens/Documents/Invoices/Invoices"));


// SINGLE PAGES //
const SinglePoRequest = lazy(() => import("../PoRequests/SinglePoRequest"));
const SinglePcRequest = lazy(() => import("../PcRequests/SinglePcRequest"));
const SingleSiteRequest = lazy(() => import("../SiteRequests/SingleSiteRequest"));
const SingleMaterialRequest = lazy(() => import("../MaterialRequests/SingleMaterialRequest"));
const SingleEmployeeRequest = lazy(() => import("../EmployeeRequest/SingleEmployeeRequest"));
const SingleContract = lazy(() => import("../Invoices/ContractFormPage"));
const SingleInvoice = lazy(() => import("../Invoices/ContractFormPage"));


// CREATE //
const PoRequestFormPage = lazy(() => import("../PoRequests/PoRequestFormPage"));
const PcRequestFormPage = lazy(() => import("../PcRequests/PcRequestFormPage"));
const SiteRequestFormPage = lazy(() => import("../SiteRequests/SiteRequestFormPage"));
const MaterialRequestFormPage = lazy(() => import("../MaterialRequests/MaterialRequestFormPage"));
const EmployeeRequestFormPage = lazy(() => import("../EmployeeRequest/EmployeeRequestFormPage"));
const ContractFormPage = lazy(() => import("../Contracts/ContractFormPage"));
const InvoiceFormPage = lazy(() => import("../Invoices/InvoiceFormPage"));


// EDIT //
const PoRequestEditPage = lazy(() => import("../PoRequests/PoRequestEditPage"));
const PcRequestEditPage = lazy(() => import("../PcRequests/PcRequestEditPage"));
const SiteRequestEditPage = lazy(() => import("../SiteRequests/SiteRequestEditPage"));
const MaterialRequestEditPage = lazy(() => import("../MaterialRequests/MaterialRequestEditPage"));
const EmployeeRequestEditPage = lazy(() => import("../EmployeeRequest/EmployeeRequestFormPage"));
const ContractEditPage = lazy(() => import("../Contracts/ContractEditPage"));
const InvoiceEditPage = lazy(() => import("../Invoices/InvoiceFormPage"));

// ********************************************************************************************

const MaterialForwardingPage = lazy(() => import("../MaterialRequests/MaterialForwardingPage"));













const Tenders = lazy(() => import("../Tenders/Tenders"));
const Customers = lazy(() => import("../Customers/Customers"));
const Subcontractors = lazy(() => import("../Subcontractors/Subcontractors"));
const Employees = lazy(() => import("../Employee/Employees"));
const Suppliers = lazy(() => import("../Suppliers/Suppliers"));
const Settings = lazy(() => import("../Settings/Settings"));









const DailyReports = lazy(() => import("../DailyReports/DailyReports"));
// const InvoicesSample = lazy(() => import("../Invoices/invoicesSample"));

const InventoryDetails = lazy(() => import("../Inventory/InventoryDetails"));
const InventoryItemDetails = lazy(() =>
	import("../Inventory/InventoryItemDetails")
);
const ContractDetails = lazy(() => import("../Contracts/ContractDetails"));

const Inventory = lazy(() => import("../Inventory/Inventory"));
const Tasks = lazy(() => import("../Tasks/Tasks"));
const Tickets = lazy(() => import("../Tickets/TicketsView"));
const ChatApp = lazy(() => import("../Chat/ChatApp"));
const Calendar = lazy(() => import("../App/Calendar"));
// const Attendance = lazy(() => import("../Employee/AttendanceEmployees"));
const AllEmployeesAttendance = lazy(() => import("../Attendance/AllEmployeesAttendance"));
const ProjectDetails = lazy(() => import("../Projects/ProjectDetails"));
const TaskDetails = lazy(() => import("../Tasks/TaskDetails"));
const Categories = lazy(() => import("../Category/Category"));
const Managers = lazy(() => import("../Manager/Managers"));
const Groups = lazy(() => import("../Groups/Groups"));
const EmployeeProfile = lazy(() => import("../Profile/EmployeeProfile"));


const EnquiresDetail = lazy(() => import("../Tickets/TicketsDetail"));
const Notifications = lazy(() => import("../Notifications/Notifications"));



export interface PagesRenderProps {
	slug: string | null;
	id: string | null;
};

export const PagesRender = ({ slug, id }: PagesRenderProps): React.ReactNode => {
	if (id) {
		switch (slug) {
			case PAGES.PROJECTS:
				return <ProjectDetails id={id} />;
			case PAGES.TASKS:
				return <TaskDetails id={id} />;
			// case PAGES.PROFILE:
			//   return <EmployeeProfile id={parseFloat(id)} />;
			// case PAGES.ATTENDANCE:
			//   return <Attendance id={id} />;
			case PAGES.INVENTORY:
				return <InventoryDetails id={id} />;
			case PAGES.INVENTORY_ITEM:
				return <InventoryItemDetails id={id} />;
			case PAGES.CONTRACT:
				return <ContractDetails id={id} />;
			case PAGES.INVOICES:
				return <Invoices id={id} />;
			case PAGES.INVOICE:
				return <InvoiceFormPage id={id} />;
			case PAGES.EDIT_PO_REQUEST:
				return <PoRequestEditPage id={id} />;
			case PAGES.EDIT_PC_REQUEST:
				return <PcRequestEditPage id={id} />;
			case PAGES.EDIT_SITE_REQUEST:
				return <SiteRequestEditPage id={id} />;
			case PAGES.EDIT_MATERIAL_REQUEST:
				return <MaterialRequestEditPage id={id} />;
			case PAGES.MATERIAL_FORWARDING_REQUEST:
				return <MaterialForwardingPage id={id} />;
			// 
			case PAGES.EDIT_CONTRACT:
				return <ContractEditPage id={id} />;
			// ----
			case PAGES.PO_REQUEST:
				return <SinglePoRequest id={id} />;
			case PAGES.PC_REQUEST:
				return <SinglePcRequest id={id} />;
			case PAGES.SITE_REQUEST:
				return <SingleSiteRequest id={id} />;
			case PAGES.EMPLOYEE_REQUEST:
				return <SingleEmployeeRequest id={id} />;
			case PAGES.MATERIAL_REQUEST:
				// return <SingleMaterialRequest id={id} />;
				return <ComingSoon />
		}
	} else
		switch (slug) {
			case PAGES.INVENTORY:
				return <Inventory />;
			case PAGES.SUBCONTRACTOR:
				return <Subcontractors />;
			case PAGES.CONTRACTS:
				return <Contracts />;
			case PAGES.CONTRACT:
				return <ContractFormPage />;
			case PAGES.DCC:
				return <Dcc />;

			case PAGES.NOTIFICATIONS:
				return <Notifications />
			// case PAGES.DCC:
			//   return <ComingSoon />;

			// case PAGES.DAILY_REPORTS:
			// return <ComingSoon />;
			case PAGES.DAILY_REPORTS:
				return <DailyReports />;
			// ---
			case PAGES.SITE_REQUESTS:
				return <SiteRequests />;
			case PAGES.SITE_REQUEST:
				return <SiteRequestFormPage />;
			// ---
			case PAGES.PO_REQUESTS:
				return <PoRequests />;
			case PAGES.PO_REQUEST:
				return <PoRequestFormPage />;
			// ---
			case PAGES.PC_REQUESTS:
				return <PcRequests />;
			case PAGES.PC_REQUEST:
				return <PcRequestFormPage />;
			// ---
			case PAGES.MATERIAL_REQUESTS:
				return <MaterialRequests />;
			case PAGES.MATERIAL_REQUEST:
				return <MaterialRequestFormPage />;
			// ---
			case PAGES.EMPLOYEE_REQUESTS:
				return <EmployeeRequests />;
			case PAGES.EMPLOYEE_REQUEST:
				return <EmployeeRequestFormPage />;
			// ---
			case PAGES.SETTINGS:
				return <Settings />;
			// case PAGES.PROFILE:
			//   return <Profile />;
			case PAGES.PROJECTS:
				return <Projects />;
			case PAGES.SUPPLIERS:
				return <Suppliers />;
			// case PAGES.INVOICES:
			//   return <Invoices />;
			case PAGES.INVOICES:
				// return <InvoicesSample />;
				return <ComingSoon />;
			case PAGES.PROFILE:
				return <EmployeeProfile />;
			case PAGES.TENDERS:
				return <Tenders />;
			case PAGES.CUSTOMERS:
				return <Customers />;
			case PAGES.TASKS:
				return <Tasks />;
			case PAGES.EMPLOYEES:
				return <Employees />;
			case PAGES.ATTENDANCE:
				return <AllEmployeesAttendance />;
			case PAGES.CALENDAR:
				return <Calendar />;
			case PAGES.CATEGORIES:
				return <Categories />;

			// case PAGES.SALARIES:
			//   return <Categories />;
			case PAGES.SALARIES:
				return <ComingSoon />;

			case PAGES.CHAT:
				return <ChatApp />;
			// NEW **********************

			// case PAGES.PROCUREMENT:
			//   return <Categories />;
			// case PAGES.MARKETING:
			//   return <Categories />;
			case PAGES.PROCUREMENT:
				return <ComingSoon />;
			case PAGES.MARKETING:
				return <ComingSoon />;

			case PAGES.Enquires:
				return <Tickets />;
			case PAGES.Enquires_DETAILS:
				return <EnquiresDetail />;
			case PAGES.MANAGERS:
				return <Managers />;
			case PAGES.GROUPS:
				return <Groups />;

			default:
				return <Dashboard />;
		}
};
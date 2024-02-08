import { PAGES } from "@/constants/pages";
import { User } from "@/utils/Session";
import { lazy } from "react";
import ComingSoon from "screens/ComingSoon";


// Lazy Imports
const SuperUserDashboard = lazy(() =>
	import("../Dashboard/SuperUserDashboard")
);
const Projects = lazy(() => import("../Projects/Projects"));
const DailyReports = lazy(() => import("../DailyReports/DailyReports"));
const Tenders = lazy(() => import("../Tenders/Tenders"));
const Customers = lazy(() => import("../Customers/Customers"));
// const InvoicesSample = lazy(() => import("../Invoices/invoicesSample"));
const Invoices = lazy(() => import("../Invoices/Invoices"));
const InvoiceFormPage = lazy(() => import("../Invoices/InvoiceFormPage"));
const Dcc = lazy(() => import("../Dcc/Dcc"));

const SiteRequests = lazy(() => import("../SiteRequests/SiteRequests"));
const SiteRequestFormPage = lazy(() =>
	import("../SiteRequests/SiteRequestFormPage")
);
const PoRequests = lazy(() => import("../PoRequests/PoRequests"));
const PoRequestFormPage = lazy(() => import("../PoRequests/PoRequestFormPage"));
const PcRequests = lazy(() => import("../PcRequests/PcRequests"));
const PcRequestFormPage = lazy(() => import("../PcRequests/PcRequestFormPage"));
const MaterialRequests = lazy(() =>
	import("../MaterialRequests/MaterialRequests")
);
const MaterialRequestFormPage = lazy(() =>
	import("../MaterialRequests/MaterialRequestFormPage")
);

const PoRequestEditPage = lazy(() => import("../PoRequests/PoRequestEditPage"));
const MaterialRequestEditPage = lazy(() =>
	import("../MaterialRequests/MaterialRequestEditPage")
);
const MaterialForwardingPage = lazy(() =>
	import("../MaterialRequests/MaterialForwardingPage")
);
const PcRequestEditPage = lazy(() => import("../PcRequests/PcRequestEditPage"));
const ContractEditPage = lazy(() => import("../Contracts/ContractEditPage"));

const InventoryDetails = lazy(() => import("../Inventory/InventoryDetails"));
const InventoryItemDetails = lazy(() =>
	import("../Inventory/InventoryItemDetails")
);
const Subcontractors = lazy(() => import("../Subcontractors/Subcontractors"));
const Contracts = lazy(() => import("../Contracts/Contracts"));
const ContractFormPage = lazy(() => import("../Contracts/ContractFormPage"));
const ContractDetails = lazy(() => import("../Contracts/ContractDetails"));

const Inventory = lazy(() => import("../Inventory/Inventory"));
const Tasks = lazy(() => import("../Tasks/Tasks"));
const Tickets = lazy(() => import("../Tickets/TicketsView"));
const Employees = lazy(() => import("../Employee/Employees"));
const Suppliers = lazy(() => import("../Suppliers/Suppliers"));
const ChatApp = lazy(() => import("../Chat/ChatApp"));
const Calendar = lazy(() => import("../App/Calendar"));
const Settings = lazy(() => import("../Settings/Settings"));
// const Attendance = lazy(() => import("../Employee/AttendanceEmployees"));
const AllEmployeesAttendance = lazy(() =>
	import("../Attendance/AllEmployeesAttendance")
);
const ProjectDetails = lazy(() => import("../Projects/ProjectDetails"));
const TaskDetails = lazy(() => import("../Tasks/TaskDetails"));
const Categories = lazy(() => import("../Category/Category"));
const Managers = lazy(() => import("../Manager/Managers"));
const Groups = lazy(() => import("../Groups/Groups"));
const EmployeeProfile = lazy(() => import("../Profile/EmployeeProfile"));
const LoadingContent = lazy(() => import("../../components/UI/LoadingContent"));
const SinglePoRequest = lazy(() => import("../PoRequests/SinglePoRequest"));
const SinglePcRequest = lazy(() => import("../PcRequests/SinglePcRequest"));
const SingleSiteRequest = lazy(() =>
	import("../SiteRequests/SingleSiteRequest")
);
const SingleMaterialRequest = lazy(() =>
	import("../MaterialRequests/SingleMaterialRequest")
);
const SiteRequestEditPage = lazy(() =>
	import("../SiteRequests/SiteRequestEditPage")
);
const EnquiresDetail = lazy(() => import("../Tickets/TicketsDetail"));
const Notifications = lazy(() => import("../Notifications/Notifications"));

const EmployeeRequests = lazy(() => import("../EmployeeRequest/EmployeeRequests"));
const EmployeeRequestFormPage = lazy(() =>
	import("../EmployeeRequest/EmployeeRequestFormPage")
);
const SingleEmployeeRequest = lazy(() =>
	import("../EmployeeRequest/SingleEmployeeRequest")
);

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
				return <SuperUserDashboard />;
		}
};
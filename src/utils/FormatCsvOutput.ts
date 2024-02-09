import { PettyCashRequest } from "types/Pc_request";
import { PurchaseOrderRequest } from "types/Po_request";
import { EmployeeRequest } from "types/Employee_request";
import { MaterialRequest } from "types/Material_request";
import { SiteRequest } from "types/Site_request";
import { Contract } from "types/Contract";
import { Invoice } from "types/Invoice";
import { isContractType, isEmployeeType, isInvoiceType, isMaterialType, isPettyCashType, isPurchaseOrderType, isSiteType } from './CheckPropsType';

export const formatCsvOutput = <T extends PettyCashRequest | PurchaseOrderRequest | EmployeeRequest | MaterialRequest | SiteRequest | Contract | Invoice>(data: T[] | undefined): any[] => {
	if (!data || data.length === 0) return [];
	if (isPurchaseOrderType(data[0])) {
		return formatPurchaseOrderData(data as PurchaseOrderRequest[]);
	} else if (isPettyCashType(data)) {
		return formatPettyCashData(data as PettyCashRequest[]);
	} else if (isEmployeeType(data[0])) {
		return formatEmployeeRequestsData(data as EmployeeRequest[]);
	} else if (isMaterialType(data[0])) {
		return formatMaterialData(data as MaterialRequest[]);
	} else if (isSiteType(data[0])) {
		return formatSiteData(data as SiteRequest[]);
	} else if (isContractType(data[0])) {
		return formatContractData(data as Contract[]);
	} else if (isInvoiceType(data[0])) {
		return formatInvoiceData(data as Invoice[]);
	} else {
		return [];
	}
};


function formatPurchaseOrderData(data: PurchaseOrderRequest[]): any[] {
	if (!data || data.length === 0) return [];
	return [
		["code", "Maker", "Date", "Project", "Description", "Vat", "Sub Total", "Total", "Paid Amount", "Status"],
		...data.map(({ code, user, date, project_details, description, vat, sub_total, total, paid_amount, status }) => [
			code,
			user?.name || '',
			date,
			project_details?.name || '',
			description,
			vat || 0,
			sub_total || 0,
			total || 0,
			paid_amount || 0,
			status
		]),
	];
};

function formatPettyCashData(data: PettyCashRequest[]): any[] {
	if (!data || data.length === 0) return [];
	return [
		["code", "Maker", "Date", "Project", "Description", "Transaction Date", "Total", "Paid Amount", "Status"],
		...data.map(({ code, user, date, project_details, description, transaction_date, total, paid_amount, status }) => [
			code,
			user?.name || '',
			date,
			project_details?.name || '',
			description,
			transaction_date,
			total || 0,
			paid_amount || 0,
			status
		]),
	];
};

function formatEmployeeRequestsData(data: EmployeeRequest[]): any[] {
	if (!data || data.length === 0) return [];
	return [
		["code", "Maker", "Date", "Rev num", "Description", "Subject", "Status"],
		...data.map(({ code, user, date, rev_num, description, subject, status }) => [
			code,
			user?.name || '',
			date,
			rev_num || '',
			description,
			subject,
			status
		]),
	];
};

function formatSiteData(data: SiteRequest[]): any[] {
	if (!data || data.length === 0) return [];
	return [
		["code", "Maker", "Date", "Project", "Description", "Status"],
		...data.map(({ code, user, date, project_details, description, status }) => [
			code,
			user?.name || '',
			date,
			project_details?.name || '',
			description,
			status
		]),
	];
};

function formatMaterialData(data: MaterialRequest[]): any[] {
	if (!data || data.length === 0) return [];
	return [
		["code", "Maker", "Date", "Project", "Subject", "Description", "Status"],
		...data.map(({ code, user, date, project_details, subject, description, status }) => [
			code,
			user?.name || '',
			date,
			project_details?.name || '',
			subject,
			description,
			status
		]),
	];
};

function formatContractData(data: Contract[]): any[] {
	if (!data || data.length === 0) return [];
	return [
		["code", "Maker", "Date", "Rev num", "Subcontractor", "Project", "Vat", "Total", "discount", "Paid amount", "Remaining amount", "Status"],
		...data.map(({ code, user, date, rev_num, subcontractor_details, project_details, vat, total, discount, paid_amount, remaining_amount, status }) => [
			code,
			user?.name || '',
			date,
			rev_num || '',
			subcontractor_details?.name || '',
			project_details?.name || '',
			vat || 0,
			total,
			discount,
			paid_amount,
			remaining_amount,
			status
		]),
	];
};

function formatInvoiceData(data: Invoice[]): any[] {
	if (!data || data.length === 0) return [];
	return [
		["code", "Maker", "Date", "Contract Code", "Project", "Subject", "Description", "Vat", "Paid Amount", "Total", "Status"],
		...data.map(({ code, user, date, contract, project_details, subject, description, vat, paid_amount, remaining_amount, status }) => [
			code,
			user?.name || '',
			date,
			contract?.code || '',
			project_details?.name || '',
			subject,
			description,
			vat || 0,
			paid_amount || 0,
			remaining_amount || 0,
			status
		]),
	];
};
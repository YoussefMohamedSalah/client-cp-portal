
import { isCustomerType, isEmployeeType, isSubcontractorType, isSupplierType } from './CheckPropsType';
import { Customer } from "types/Customer";
import { Employee } from 'types/Employee';
import { Subcontractor } from 'types/Subcontractor';
import { Supplier } from "types/Supplier";

export const formatNormalCsvOutput = <T extends Customer | Supplier | Employee | Subcontractor>(data: T[] | undefined): any[] => {
    if (!data || data.length === 0) return [];
    if (isCustomerType(data[0])) {
        return formatCustomersData(data as Customer[]);
    } else if (isSupplierType(data[0])) {
        return formatSuppliersData(data as Supplier[]);
    } else if (isEmployeeType(data[0])) {
        return formatEmployeesData(data as Employee[]);
    } else if (isSubcontractorType(data[0])) {
        return formatSubcontractorsData(data as Subcontractor[]);
        // } else if (isSiteType(data[0])) {
        //     return formatSiteData(data as SiteRequest[]);
        // } else if (isContractType(data[0])) {
        //     return formatContractData(data as Contract[]);
        // } else if (isInvoiceType(data[0])) {
        //     return formatInvoiceData(data as Invoice[]);
    } else {
        return [];
    }
};


function formatCustomersData(data: Customer[]): any[] {
    if (!data || data.length === 0) return [];
    // return [
    //     ["code", "Maker", "Date", "Project", "Description", "Vat", "Sub Total", "Total", "Paid Amount", "Status"],
    //     ...data.map(({ code, user, date, project_details, description, vat, sub_total, total, paid_amount, status }) => [
    //         code,
    //         user?.name || '',
    //         date,
    //         project_details?.name || '',
    //         description,
    //         vat || 0,
    //         sub_total || 0,
    //         total || 0,
    //         paid_amount || 0,
    //         status
    //     ]),
    // ];
    return [] as any[]
};

function formatSuppliersData(data: Supplier[]): any[] {
    if (!data || data.length === 0) return [];
    // return [
    //     ["code", "Maker", "Date", "Project", "Description", "Transaction Date", "Total", "Paid Amount", "Status"],
    //     ...data.map(({ code, user, date, project_details, description, transaction_date, total, paid_amount, status }) => [
    //         code,
    //         user?.name || '',
    //         date,
    //         project_details?.name || '',
    //         description,
    //         transaction_date,
    //         total || 0,
    //         paid_amount || 0,
    //         status
    //     ]),
    // ];
    return [] as any[]
};

function formatEmployeesData(data: Employee[]): any[] {
    if (!data || data.length === 0) return [];
    // return [
    //     ["code", "Maker", "Date", "Rev num", "Description", "Subject", "Status"],
    //     ...data.map(({ code, user, date, rev_num, description, subject, status }) => [
    //         code,
    //         user?.name || '',
    //         date,
    //         rev_num || '',
    //         description,
    //         subject,
    //         status
    //     ]),
    // ];
    return [] as any[]

};

function formatSubcontractorsData(data: Subcontractor[]): any[] {
    if (!data || data.length === 0) return [];
    // return [
    //     ["code", "Maker", "Date", "Project", "Description", "Status"],
    //     ...data.map(({ code, user, date, project_details, description, status }) => [
    //         code,
    //         user?.name || '',
    //         date,
    //         project_details?.name || '',
    //         description,
    //         status
    //     ]),
    // ];
    return [] as any[]
};

// function formatMaterialData(data: MaterialRequest[]): any[] {
//     if (!data || data.length === 0) return [];
//     return [
//         ["code", "Maker", "Date", "Project", "Subject", "Description", "Status"],
//         ...data.map(({ code, user, date, project_details, subject, description, status }) => [
//             code,
//             user?.name || '',
//             date,
//             project_details?.name || '',
//             subject,
//             description,
//             status
//         ]),
//     ];
// };

// function formatContractData(data: Contract[]): any[] {
//     if (!data || data.length === 0) return [];
//     return [
//         ["code", "Maker", "Date", "Rev num", "Subcontractor", "Project", "Vat", "Total", "discount", "Paid amount", "Remaining amount", "Status"],
//         ...data.map(({ code, user, date, rev_num, subcontractor_details, project_details, vat, total, discount, paid_amount, remaining_amount, status }) => [
//             code,
//             user?.name || '',
//             date,
//             rev_num || '',
//             subcontractor_details?.name || '',
//             project_details?.name || '',
//             vat || 0,
//             total,
//             discount,
//             paid_amount,
//             remaining_amount,
//             status
//         ]),
//     ];
// };

// function formatInvoiceData(data: Invoice[]): any[] {
//     if (!data || data.length === 0) return [];
//     return [
//         ["code", "Maker", "Date", "Contract Code", "Project", "Subject", "Description", "Vat", "Paid Amount", "Total", "Status"],
//         ...data.map(({ code, user, date, contract, project_details, subject, description, vat, paid_amount, remaining_amount, status }) => [
//             code,
//             user?.name || '',
//             date,
//             contract?.code || '',
//             project_details?.name || '',
//             subject,
//             description,
//             vat || 0,
//             paid_amount || 0,
//             remaining_amount || 0,
//             status
//         ]),
//     ];
// };
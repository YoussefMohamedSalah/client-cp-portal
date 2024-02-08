import PettyCashRequest from 'types/Pc_request';
import PurchaseOrderRequest from "types/Po_request";
import EmployeeRequest from "types/Employee_request";
import MaterialRequest from "types/Material_request";
import SiteRequest from "types/Site_request";
import { ENUMS } from 'enums/enums';
import Invoice from 'types/Invoice';
import { Contract } from "types/Contract"

export function isPurchaseOrderType(props: any): props is PurchaseOrderRequest {
    return props.type === ENUMS.REQUEST_TYPE.PURCHASE_ORDER;
};

export function isPettyCashType(props: any): props is PettyCashRequest {
    return props.type === ENUMS.REQUEST_TYPE.PETTY_CASH;
};

export function isEmployeeType(props: any): props is EmployeeRequest {
    return props.type === ENUMS.REQUEST_TYPE.EMPLOYEE;
};

export function isMaterialType(props: any): props is MaterialRequest {
    return props.type === ENUMS.REQUEST_TYPE.MATERIAL;
};

export function isSiteType(props: any): props is SiteRequest {
    return props.type === ENUMS.REQUEST_TYPE.SITE;
};

export function isContractType(props: any): props is Contract {
    return props.type === ENUMS.REQUEST_TYPE.CONTRACT;
};

export function isInvoiceType(props: any): props is Invoice {
    return props.type === ENUMS.REQUEST_TYPE.INVOICE;
};


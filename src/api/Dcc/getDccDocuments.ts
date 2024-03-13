import { ROUTES } from "constants/routes";
import { DOCUMENT_TYPE } from "enums/enums";
import { http } from "utils/Http";

const getAllContracts = async () => {
    const { data } = await http.get(ROUTES.CONTRACTS);
    return { documents: { data: data as any[] } };
};

const getAllEmployeeRequests = async () => {
    const { data } = await http.get(ROUTES.EMPLOYEE_REQUESTS);
    return { documents: { data: data as any[] } };
};

const getAllInvoices = async () => {
    const { data } = await http.get(ROUTES.INVOICES);
    return { documents: { data: data as any[] } };
};

const getAllMaterialRequests = async () => {
    const { data } = await http.get(ROUTES.MATERIAL_REQUESTS);
    return { documents: { data: data as any[] } };
};

const getAllPcRequests = async () => {
    const { data } = await http.get(ROUTES.PC_REQUESTS);
    return { documents: { data: data as any[] } };
};

const getAllPoRequests = async () => {
    const { data } = await http.get(ROUTES.PO_REQUESTS);
    return { documents: { data: data as any[] } };
};

const getAllSiteRequests = async () => {
    const { data } = await http.get(ROUTES.SITE_REQUESTS);
    return { documents: { data: data as any[] } };
};

// GET DOCUMENT FUNCTION
export const geDccDocuments = async (documentType: string) => {
    let getDocumentFunction;
    switch (documentType) {
        case DOCUMENT_TYPE.PETTY_CASH:
            getDocumentFunction = getAllPcRequests;
            break;
        case DOCUMENT_TYPE.PURCHASE_ORDER:
            getDocumentFunction = getAllPoRequests;
            break;
        case DOCUMENT_TYPE.SITE:
            getDocumentFunction = getAllSiteRequests;
            break;
        case DOCUMENT_TYPE.MATERIAL:
            getDocumentFunction = getAllMaterialRequests;
            break;
        case DOCUMENT_TYPE.EMPLOYEE:
            getDocumentFunction = getAllEmployeeRequests;
            break;
        case DOCUMENT_TYPE.CONTRACT:
            getDocumentFunction = getAllContracts;
            break;
        case DOCUMENT_TYPE.INVOICE:
            getDocumentFunction = getAllInvoices;
            break;
        default:
            return;
    }

    const { documents } = await getDocumentFunction();
    return { dccDocuments: { data: documents.data as any[] } };
};

export const tasbihWay = async (documentType: string) => {
    if (documentType === DOCUMENT_TYPE.INVOICE) {
        let { documents } = await getAllInvoices();
        return documents.data || [];
    } else if (documentType === DOCUMENT_TYPE.CONTRACT) {
        let { documents } = await getAllContracts();
        return documents.data || [];
    }
};

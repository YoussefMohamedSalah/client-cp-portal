import { ROUTES } from "constants/routes";
import { DOCUMENT_TYPE } from "enums/enums";
import { http } from "utils/Http";

const getAllContracts = async () => {
  const { data } = await http.get(ROUTES.FINANCE_CONTRACT_REQUESTS);
  return { documents: { data: data as any[] } };
};

const getAllEmployeeRequests = async () => {
  const { data } = await http.get(ROUTES.FINANCE_EMPLOYEE_REQUESTS);
  return { documents: { data: data as any[] } };
};

const getAllInvoices = async () => {
  const { data } = await http.get(ROUTES.FINANCE_INVOICE_REQUESTS);
  return { documents: { data: data as any[] } };
};

const getAllMaterialRequests = async () => {
  const { data } = await http.get(ROUTES.FINANCE_MATERIAL_REQUESTS);
  return { documents: { data: data as any[] } };
};

const getAllPcRequests = async () => {
  const { data } = await http.get(ROUTES.FINANCE_PC_REQUESTS);
  return { documents: { data: data as any[] } };
};

const getAllPoRequests = async () => {
  const { data } = await http.get(ROUTES.FINANCE_PO_REQUESTS);
  return { documents: { data: data as any[] } };
};

const getAllSiteRequests = async () => {
  const { data } = await http.get(ROUTES.FINANCE_SITE_REQUESTS);
  return { documents: { data: data as any[] } };
};

// GET DOCUMENT FUNCTION
export const geFinanceDocuments = async (documentType: string) => {
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
  return { financeDocuments: { data: documents.data as any[] } };
};

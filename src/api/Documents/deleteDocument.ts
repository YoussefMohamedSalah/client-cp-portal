import { ROUTES } from "constants/routes";
import { ENUMS } from "enums/enums";
import http from "utils/Http";
import { useMutation } from "@tanstack/react-query";

interface DeleteDocumentProps {
  type: string,
  id: string
};

export const useDeleteDocument = () => {
  return useMutation<any, Error, any>(async (variables: DeleteDocumentProps) => {
    const { type, id } = variables;
    if (type === ENUMS.REQUEST_TYPE.PETTY_CASH) {
      const { data } = await http.delete(ROUTES.PC_REQUEST + id);
      return { data };
    } else if (type === ENUMS.REQUEST_TYPE.PURCHASE_ORDER) {
      const { data } = await http.delete(ROUTES.PO_REQUEST + id);
      return { data };
    } else if (type === ENUMS.REQUEST_TYPE.SITE) {
      const { data } = await http.delete(ROUTES.SITE_REQUEST + id);
      return { data };
    } else if (type === ENUMS.REQUEST_TYPE.MATERIAL) {
      const { data } = await http.delete(ROUTES.MATERIAL_REQUEST + id);
      return { data };
    } else if (type === ENUMS.REQUEST_TYPE.EMPLOYEE) {
      const { data } = await http.delete(ROUTES.EMPLOYEE_REQUEST + id);
      return { data };
    } else if (type === ENUMS.REQUEST_TYPE.INVOICE) {
      const { data } = await http.delete(ROUTES.INVOICE + id);
      return { data };
    } else if (type === ENUMS.REQUEST_TYPE.CONTRACT) {
      const { data } = await http.delete(ROUTES.CONTRACT + id);
      return { data };
    } else {
      return { data: {} };
    }
  });
};
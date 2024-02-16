import { useMutation } from "@tanstack/react-query";
import http from "utils/Http";
import { ROUTES } from "constants/routes";
import { CompanyWorkFlow } from "types/Workflow";

export const useUpdateWorkFlow = () => {
  return useMutation<any, Error, any>(async (updateInput) => {
    const { data } = await http.put(ROUTES.WORKFLOW, updateInput);
    return { workflow: { data: data as CompanyWorkFlow } };
  });
};

export const workFlowUpdateInput = (data: any): any => {
  return {
    site_request_flow: data.site_request_flow,
    petty_cash_request_flow: data.petty_cash_request_flow,
    material_request_flow: data.material_request_flow,
    purchase_order_flow: data.purchase_order_flow,
    contract_flow: data.contract_flow,
    invoice_flow: data.invoice_flow,
    employee_request_flow: data.employee_request_flow,
  };
};

import { useMutation } from "@tanstack/react-query";
import http from "utils/Http";
import { ROUTES } from "constants/routes";
import { CompanyWorkFlow } from "types/Workflow";

export const useUpdateDefaultConditions = () => {
    return useMutation<any, Error, any>(async (updateInput) => {
        const { data } = await http.put(ROUTES.DEFAULT_CONDITIONS, updateInput);
        return { workflow: { data: data as CompanyWorkFlow } };
    });
};

export const defaultConditionsUpdateInput = (data: any): any => {
    return {
        default_po_conditions: data?.default_po_conditions!,
        default_contract_conditions: data?.default_contract_conditions!,
    };
};

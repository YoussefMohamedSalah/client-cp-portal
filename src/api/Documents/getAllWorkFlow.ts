import { useQuery } from "@tanstack/react-query";
import http from "utils/Http";
import { ROUTES } from "constants/routes";
import { WorkFlow } from "types/Workflow";

export const getAllWorkFlow = async ({ queryKey }: any) => {
  const { data } = await http.get(ROUTES.WORKFLOW);
  return { workflow: { data: data as WorkFlow } };
};

export const useWorkFlowQuery = (options: any) => {
  return useQuery<{ workflow: { data: any } }, Error>([ROUTES.WORKFLOW, options], getAllWorkFlow);
};

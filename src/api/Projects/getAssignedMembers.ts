import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export const getAllAssignedMembers = async ({ queryKey }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, _params] = queryKey;
  const { data } = await http.get(ROUTES.PROJECT_EMPLOYEES + _params.id);
  return { employees: { data: data as any } };
};

export const useAssignedMembersQuery = (options: any) => {
  return useQuery<{ employees: { data: any } }, Error>([ROUTES.EMPLOYEE_PROJECT, options], getAllAssignedMembers);
};

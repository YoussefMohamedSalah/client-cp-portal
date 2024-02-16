import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import http from "utils/Http";

export interface AddMemberToGroupInputType {
  groupId: string;
  user: any;
}

export const useAddMemberToGroup = () => {
  return useMutation<any, Error, AddMemberToGroupInputType>(async (updateInput) => {
    const { groupId, user } = updateInput;
    const { data } = await http.put(ROUTES.GROUP_ADD + groupId, { user });
    return { group: { data: data as any } };
  });
};

export const addMemberToGroupInput = (data: AddMemberToGroupInputType): any => {
  return {
    groupId: data.groupId,
    user: data.user,
  } as AddMemberToGroupInputType;
};

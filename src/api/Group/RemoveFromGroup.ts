import { useMutation } from "@tanstack/react-query";
import http from "utils/Http";
import { ROUTES } from "constants/routes";

export interface RemoveMemberFromGroupInputType {
  groupId: string;
  memberId: string;
}

export const useRemoveMemberFromGroup = () => {
  return useMutation<any, Error, RemoveMemberFromGroupInputType>(
    async (updateInput) => {
      const { groupId, memberId } = updateInput;
      const { data } = await http.put(ROUTES.GROUP_REMOVE + groupId, {
        memberId,
      });
      return { group: { data: data as any } };
    }
  );
};

export const removeMemberFromGroupInput = (
  data: RemoveMemberFromGroupInputType
): any => {
  return {
    groupId: data.groupId,
    memberId: data.memberId,
  } as RemoveMemberFromGroupInputType;
};

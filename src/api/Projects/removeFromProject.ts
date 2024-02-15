import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export interface RemoveMemberFromProjectInputType {
  projectId: string;
  memberId: string;
}

export const useRemoveMemberFromProject = () => {
  return useMutation<any, Error, RemoveMemberFromProjectInputType>(async (updateInput) => {
    const { projectId, memberId } = updateInput;
    const { data } = await http.put(ROUTES.PROJECT_REMOVE + projectId, { memberId });
    return { group: { data: data as any } };
  });
};

export const removeMemberFromProjectInput = (data: RemoveMemberFromProjectInputType): any => {
  return {
    projectId: data.projectId,
    memberId: data.memberId,
  } as RemoveMemberFromProjectInputType;
};

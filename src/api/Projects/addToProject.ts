import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export interface AddMemberToProjectInputType {
  projectId: string;
  user: any;
}

export const useAddMemberToProject = () => {
  return useMutation<any, Error, AddMemberToProjectInputType>(async (updateInput) => {
    const { projectId, user } = updateInput;
    const { data } = await http.put(ROUTES.PROJECT_ADD + projectId, { user });
    return { group: { data: data as any } };
  });
};

export const addMemberToProjectInput = (data: AddMemberToProjectInputType): any => {
  return {
    projectId: data.projectId,
    user: data.user,
  } as AddMemberToProjectInputType;
};

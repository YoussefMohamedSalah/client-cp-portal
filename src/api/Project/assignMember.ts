import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export const useAssignMemberToProject = () => {
  return useMutation<any, Error, any>(async createInput => {
    const { data } = await http.post(ROUTES.EMPLOYEE_PROJECT, createInput);
    return { session: { data: data as any } };
  });
};

export const createAssignInput = (data: any) => {
  return {
    user: data.user,
    project: data.project,
    task: data.task
  }
};
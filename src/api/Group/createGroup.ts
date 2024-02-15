import { useMutation } from "@tanstack/react-query";
import { CreateGroup } from "types/Group";
import http from "utils/Http";
import { ROUTES } from "constants/routes";

export const useCreateGroup = () => {
  return useMutation<any, Error, CreateGroup>(async (createInput) => {
    const { data } = await http.post(ROUTES.GROUP, createInput);
    return { session: { data: data as any } };
  });
};

export const groupInput = (data: CreateGroup): CreateGroup => {
  return {
    name: data.name!,
    members: data.members!,
    description: data.description!,
    managers: data.managers!,
  };
};

import { useMutation } from "@tanstack/react-query";
import { Group } from "types/Group";
import http from "utils/Http";
import { ROUTES } from "constants/routes";

export const useUpdateGroup = () => {
  return useMutation<any, Error, Group>(async (updateInput) => {
    const { data } = await http.patch(ROUTES.GROUP + updateInput.id + "/", updateInput);
    return { group: { data: data as Group } };
  });
};

export const groupInputUpdate = (data: Group): any => {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    members: data.members,
    managers: data.managers,
  };
};

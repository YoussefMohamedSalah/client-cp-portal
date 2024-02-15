import { useMutation } from "@tanstack/react-query";
import { SelectedGroup } from "types/Group";
import http from "utils/Http";
import { ROUTES } from "constants/routes";

export const useUpdateGroup = () => {
  return useMutation<any, Error, SelectedGroup>(async (updateInput) => {
    const { data } = await http.patch(
      ROUTES.GROUP + updateInput.id + "/",
      updateInput
    );
    return { session: { data: data as any } };
  });
};

export const groupInputUpdate = (data: SelectedGroup): SelectedGroup => {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    members: data.members,
    managers: data.managers,
  };
};

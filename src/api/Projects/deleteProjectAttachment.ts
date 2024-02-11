import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { SelectedProject } from "types/Project";
import { http } from "utils/Http";

export const useDeleteProjectAttachment = () => {
  return useMutation<any, Error, SelectedProject>(async updateInput => {
    const { data } = await http.delete(
      ROUTES.PROJECT_ATTACHMENT_DELETE + updateInput.id + "/"
    );
    return { session: { data: data as any } };
  });
};



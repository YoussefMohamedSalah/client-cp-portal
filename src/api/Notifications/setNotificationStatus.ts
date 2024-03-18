import { useMutation } from "@tanstack/react-query";
import http from "utils/Http";
import { ROUTES } from "constants/routes";

export const useUpdateNotificationStatus = () => {
  return useMutation<any, Error, any>(async (id) => {
    const { data } = await http.get(ROUTES.NOTIFICATIONS + "status/" + id);
    return { data: data as any };
  });
};

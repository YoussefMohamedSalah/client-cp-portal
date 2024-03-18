import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { QueryOptionsType } from "types/QueryOptions";
import http from "utils/Http";

export const getAllNotifications = async ({ queryKey }: any) => {
  const { data } = await http.get(
    ROUTES.NOTIFICATIONS,
    // + "?limit=100"
  );
  return data;
};

export const useNotificationsQuery = (options: QueryOptionsType) => {
  return useQuery<{ data: any }, Error>([ROUTES.NOTIFICATIONS, options], getAllNotifications);
};

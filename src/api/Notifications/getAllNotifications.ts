import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { NotificationType } from "types/Notification";
import { QueryOptionsType } from "types/QueryOptions";
import http from "utils/Http";

export const getAllNotifications = async ({ queryKey }: any) => {
  const { data } = await http.get(ROUTES.NOTIFICATIONS);
  return { notifications: { data: data as NotificationType[] } };
};

export const useNotificationsQuery = (options: QueryOptionsType) => {
  return useQuery<{ notifications: { data: any } }, Error>([ROUTES.NOTIFICATIONS, options], getAllNotifications);
};

import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { NotificationType } from "types/Notification";
import http from "utils/Http";

export const getAllNotifications = async ({ queryKey }: any) => {
  const { data } = await http.get(ROUTES.NOTIFICATIONS);
  return { notifications: { data: data as NotificationType[] } };
};

export const useNotificationsQuery = (options: any) => {
  return useQuery<{ notifications: { data: NotificationType[] } }, Error>(
    [ROUTES.NOTIFICATIONS, options],
    getAllNotifications,
  );
};

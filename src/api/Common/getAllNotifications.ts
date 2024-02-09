import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Notification } from "types/Notification";
import http from "utils/Http";


export const getAllNotifications = async ({ queryKey }: any) => {
    const { data } = await http.get(ROUTES.NOTIFICATIONS);
    return { notifications: { data: data as Notification[] } };
};

export const useNotificationsQuery = (options: any) => {
    return useQuery<{ notifications: { data: Notification[] } }, Error>(
        [ROUTES.NOTIFICATIONS, options],
        getAllNotifications
    );
};

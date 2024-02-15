import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";
import { Dashboard } from "types/Dashboard";

export const getAdminDashboard = async ({ queryKey }: any) => {
  const { data } = await http.get(ROUTES.ADMIN_DASHBOARD);
  return { dashboard: { data: data as Dashboard } };
};

export const useAdminDashboardQuery = (options: any) => {
  return useQuery<{ dashboard: { data: Dashboard } }, Error>([ROUTES.ADMIN_DASHBOARD, options], getAdminDashboard);
};

import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "@/constants/routes";
// import { QueryOptionsType } from "types/queryOptions";
import { http } from "@/utils/Http";

// adding response type
interface ResponseType {
    employee_count: number;
    present: number;
    absent: number;
    late_count: number;
    early_count: number;
    male_count: number;
    female_count: number;
}

export const getAdminDashboard = async ({ queryKey }: any) => {
    const { data } = await http.get(ROUTES.ADMIN_DASHBOARD);
    return { data: data as ResponseType };
};

export const useAdminDashboardQuery = (options: QueryOptionsType) => {
    return useQuery<{ data: ResponseType }, Error>(
        [ROUTES.ADMIN_DASHBOARD, options],
        getAdminDashboard
    );
};

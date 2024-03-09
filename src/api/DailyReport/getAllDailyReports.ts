import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import http from "utils/Http";

export const useGetAllDailyReports = () => {
    return useMutation<any, Error, {}>(async createInput => {
        const { data } = await http.get(ROUTES.DAILY_REPORT);
        return { dailyReports: { data: data as any } };
    });
};
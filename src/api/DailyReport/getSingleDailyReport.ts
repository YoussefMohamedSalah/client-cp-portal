import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import http from "utils/Http";

export const useGetSingleDailyReport = () => {
    return useMutation<any, Error, { id: string }>(async createInput => {
        const { id } = createInput;
        const { data } = await http.get(ROUTES.DAILY_REPORT + '/' + id);
        return { dailyReport: { data: data as any } };
    });
};

export const getSingleDailyReportInput = (data: { id: string }): any => {
    return {
        id: data.id
    }
};
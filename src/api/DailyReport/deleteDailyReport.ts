import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import http from "utils/Http";

export const useDeleteDailyReport = () => {
    return useMutation<any, Error, { id: string }>(async createInput => {
        const { id } = createInput;
        const { data } = await http.delete(ROUTES.DAILY_REPORT + '/' + id);
        return { dailyReport: { data: data as any } };
    });
};

export const deleteDailyReportInput = (data: { id: string }): any => {
    return {
        id: data.id
    }
};
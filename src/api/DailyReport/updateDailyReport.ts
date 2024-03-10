import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { DailyReport } from "types/Daily_report";
import http from "utils/Http";

export const useUpdateDailyReport = () => {
  return useMutation<any, Error, any>(async (createInput) => {
    const { data } = await http.put(ROUTES.DAILY_REPORT, createInput);
    return { dailyReport: { data: data as any } };
  });
};

export const updateDailyReportInput = (data: DailyReport): any => {
  return {};
};

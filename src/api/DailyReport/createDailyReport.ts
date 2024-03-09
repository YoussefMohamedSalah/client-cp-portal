import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { DailyReport } from "types/Daily_report";
import http from "utils/Http";

export const useCreateDailyReport = () => {
    return useMutation<any, Error, any>(async createInput => {
        const { id, ...rest } = createInput;
        const { data } = await http.post(ROUTES.DAILY_REPORT + "add/" + id, rest, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return { dailyReport: { data: data as DailyReport } };
    });
};

export const createDailyReportInput = (data: any): any => {
    if (!data.files || data.files.length === 0) {
        return {
            date: data.date ? data.date : null,
            working_area: data.working_area ? data.working_area : null,
            today_working_spot: data.today_working_spot ? data.today_working_spot : null,
            total_workers_count: data.total_workers_count ? data.total_workers_count : null,
            notes: data.notes ? data.notes : null,
            users: data.users ? data.users : null,
            supervisor: data.supervisor ? data.supervisor : null,
            daily_report_groups: data.daily_report_groups ? data.daily_report_groups : null,
        };
    }

    const formData = new FormData();
    (data.date) && formData.append("date", data.date);
    (data.working_area) && formData.append("working_area", data.working_area! || "");
    (data.today_working_spot) && formData.append("today_working_spot", data.today_working_spot || "");
    (data.total_workers_count) && formData.append("total_workers_count", `${data.total_workers_count || 0}`);
    (data.notes) && formData.append("notes", data.notes! || "");
    (data.users) && formData.append("users", `${data.users!}`);
    (data.supervisor) && formData.append("supervisor", `${data.supervisor!}`);
    (data.daily_report_groups) && formData.append("daily_report_groups", `${data.daily_report_groups!}`);
    for (let file of data.files) {
        formData.append("files", file);
    }
    return formData;
};
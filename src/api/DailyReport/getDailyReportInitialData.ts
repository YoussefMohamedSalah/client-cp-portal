import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import http from "utils/Http";


export const getInitialDrData = async ({ queryKey }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, _params] = queryKey;
  const { data } = await http.get(ROUTES.DAILY_REPORT_INITIAL_DATA + _params.id);
  return { dailyReportInitialData: { data: data as any } };
};

export const useGetDailyReportInitialData = (options: any) => {
  return useQuery<{ dailyReportInitialData: { data: any } }, Error>(
    [ROUTES.DAILY_REPORT_INITIAL_DATA, options],
    getInitialDrData
  );
};

import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";
import { EmployeeRequest } from "types/Employee_request";

export const getEmployeeRequestDetails = async ({ queryKey }: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_key, _params] = queryKey;
    const { data } = await http.get(ROUTES.EMPLOYEE_REQUEST + _params.id);
    return { employeeRequestDetails: { data: data as EmployeeRequest } };
};

export const useEmployeeRequestDetailsQuery = (options: any) => {
    return useQuery(
        [ROUTES.EMPLOYEE_REQUEST, options],
        getEmployeeRequestDetails
    );
};

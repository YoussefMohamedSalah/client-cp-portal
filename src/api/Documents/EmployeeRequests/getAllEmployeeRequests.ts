import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";
import { EmployeeRequest } from "types/Employee_request";

export const getAllEmployeeRequests = async () => {
    const { data } = await http.get(ROUTES.EMPLOYEE_REQUESTS);
    return { empRequests: { data: data as EmployeeRequest[] } };
};

export const useGetAllEmployeeRequestsQuery = () => {
    return useQuery({ queryKey: ['empRequests'], queryFn: getAllEmployeeRequests })
};

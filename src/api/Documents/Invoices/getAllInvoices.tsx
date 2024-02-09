import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";
import { Invoice } from "types/Invoice";

export const getAllInvoices = async () => {
    const { data } = await http.get(ROUTES.INVOICES);
    return { invoices: { data: data as Invoice[] } };
};

export const useGetAllInvoicesQuery = () => {
    return useQuery({ queryKey: ['invoices'], queryFn: getAllInvoices })
};

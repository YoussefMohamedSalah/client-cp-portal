import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";
import { Invoice } from "types/Invoice";

export const getInvoiceDetails = async ({ queryKey }: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_key, _params] = queryKey;
    const { data } = await http.get(ROUTES.INVOICE + _params.id);
    return { invoiceDetails: { data: data as Invoice } };
};

export const useInvoiceDetailsQuery = (options: any) => {
    return useQuery(
        [ROUTES.INVOICE, options],
        getInvoiceDetails
    );
};

import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";
import { Contract } from "types/Contract";

export const getAllContracts = async () => {
    const { data } = await http.get(ROUTES.CONTRACTS);
    return { contracts: { data: data as Contract[] } };
};

export const useGetAllContractsQuery = () => {
    return useQuery({ queryKey: ['contracts'], queryFn: getAllContracts })
};

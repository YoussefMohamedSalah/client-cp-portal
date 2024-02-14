import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export interface AddMemberToTenderInputType {
  tenderId: string;
  user: any;
}

export const useAddMemberToTender = () => {
  return useMutation<any, Error, AddMemberToTenderInputType>(
    async (updateInput) => {
      const { tenderId, user } = updateInput;
      const { data } = await http.put(ROUTES.TENDER_ADD + tenderId, { user });
      return { group: { data: data as any } };
    }
  );
};

export const addMemberToTenderInput = (
  data: AddMemberToTenderInputType
): any => {
  return {
    tenderId: data.tenderId,
    user: data.user,
  } as AddMemberToTenderInputType;
};

import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export interface RemoveMemberFromTenderInputType {
  tenderId: string;
  memberId: string;
}

export const useRemoveMemberFromTender = () => {
  return useMutation<any, Error, RemoveMemberFromTenderInputType>(
    async (updateInput) => {
      const { tenderId, memberId } = updateInput;
      const { data } = await http.put(ROUTES.TENDER_REMOVE + tenderId, {
        memberId,
      });
      return { group: { data: data as any } };
    }
  );
};

export const removeMemberFromProjectInput = (
  data: RemoveMemberFromTenderInputType
): any => {
  return {
    tenderId: data.tenderId,
    memberId: data.memberId,
  } as RemoveMemberFromTenderInputType;
};

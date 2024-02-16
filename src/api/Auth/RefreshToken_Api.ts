import { ROUTES } from "constants/routes";
import { useMutation } from "@tanstack/react-query";
import http from "utils/Http";

export interface RefreshTokenInput {
  refresh: string;
}

export const useRefreshToken = () => {
  return useMutation<any, Error, RefreshTokenInput>(async (createInput) => {
    const { data } = await http.post(ROUTES.TOKEN_REFRESH, createInput);
    return data;
  });
};

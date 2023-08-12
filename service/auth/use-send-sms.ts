import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AuthService } from "./auth-service";
import { AxiosError } from "axios";
import { IError, IMutateSuccess } from "@/types/http";

export const useSendSms = (
  config: UseMutationOptions<
    IMutateSuccess,
    AxiosError<
      IError<{
        diffTime: number;
      }>
    >,
    string
  > = {},
) => {
  return useMutation(AuthService.sendSms, config);
};

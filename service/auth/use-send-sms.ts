import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AuthService } from "./auth-service";
import { AxiosError } from "axios";
import { Error, MutateSuccess } from "@/types/http";

export const useSendSms = (
  config: UseMutationOptions<
    MutateSuccess,
    AxiosError<
      Error<{
        diffTime: number;
      }>
    >,
    string
  > = {},
) => {
  return useMutation(AuthService.sendSms, config);
};

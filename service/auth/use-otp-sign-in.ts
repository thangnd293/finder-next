import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { SignInResponse, signIn } from "next-auth/react";

interface IPayload {
  phoneNumber: string;
  otp: string;
}
export const useOtpSignIn = (
  config: UseMutationOptions<
    SignInResponse | undefined,
    unknown,
    IPayload,
    unknown
  > = {},
) => {
  return useMutation(
    (payload: IPayload) =>
      signIn("credentials", {
        ...payload,
        redirect: false,
      }),
    config,
  );
};

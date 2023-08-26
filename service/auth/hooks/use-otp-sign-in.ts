import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { SignInResponse, signIn } from "next-auth/react";

interface OtpSignInPayload {
  phoneNumber: string;
  otp: string;
}
export const useOtpSignIn = (
  config: UseMutationOptions<
    SignInResponse | undefined,
    unknown,
    OtpSignInPayload,
    unknown
  > = {},
) => {
  return useMutation(
    (payload: OtpSignInPayload) =>
      signIn("credentials", {
        ...payload,
        redirect: false,
      }),
    config,
  );
};

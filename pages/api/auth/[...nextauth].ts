import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    session: { strategy: "jwt" },
    pages: {
      signIn: "/",
      signOut: "/",
      error: "/", // Error code passed in query string as ?error=
    },
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          phoneNumber: {
            label: "Phone number",
            type: "text",
            placeholder: "Phone number",
          },
          otp: {
            label: "OTP",
            type: "text",
            placeholder: "OTP",
          },
        },

        async authorize(credentials, req) {
          const res = await fetch(
            `${process.env.BACKEND_URL}/api/v1/auth/verify-otp`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(credentials),
            },
          );

          const result = await res.json();

          if (result.accessToken) return result;

          return null;
        },
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
          },
        },
      }),
    ],
    callbacks: {
      async signIn({ user, account }) {
        console.log(
          "=========SIGN IN=========",
          user.accessToken,
          account?.access_token,
        );

        if (user.accessToken) {
          res.setHeader(
            "Set-Cookie",
            `accessToken=${user.accessToken}; Path=/`,
          );
          return true;
        }

        if (account?.access_token) {
          const params = new URLSearchParams({
            token: (account.access_token as string) ?? "",
          });

          console.log("params", params.toString());
          console.log(
            "req",
            `${process.env.BACKEND_URL}/api/v1/auth/google/verify?${params}`,
          );

          const { accessToken } = await fetch(
            `${process.env.BACKEND_URL}/api/v1/auth/google/verify?${params}`,
          ).then(
            (res) =>
              res.json() as Promise<{
                accessToken: string;
                refreshToken: string;
              }>,
          );

          console.log("accessToken", accessToken);

          if (accessToken) {
            res.setHeader("Set-Cookie", `accessToken=${accessToken}; Path=/`);

            return true;
          }
        }

        return false;
      },
    },
  });
}

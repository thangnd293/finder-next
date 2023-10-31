import { ServerService } from "@/service/server";
import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import InstagramProvider from "next-auth/providers/instagram";
import SpotifyProvider from "next-auth/providers/spotify";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    session: { strategy: "jwt" },
    pages: {
      signIn: "/",
      signOut: "/",
      error: "/external-auth-result", // Error code passed in query string as ?error=
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

        async authorize(credentials) {
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
      SpotifyProvider({
        clientId: process.env.SPOTIFY_CLIENT_ID ?? "",
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? "",
        authorization: {
          params: {
            scope: "user-top-read user-read-private",
          },
        },
      }),
      InstagramProvider({
        clientId: process.env.INSTAGRAM_CLIENT_ID,
        clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
        authorization: {
          params: {
            scope: "user_profile,user_media",
          },
        },
      }),
      FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",
      }),
    ],
    callbacks: {
      async signIn({ user, account }) {
        console.log("=================SIGN IN=====================");

        const type = account?.provider;

        if (
          (type === "google" || type === "facebook") &&
          !!account?.access_token
        ) {
          const params = new URLSearchParams({
            token: account.access_token,
          });

          const { accessToken } = await fetch(
            `${process.env.BACKEND_URL}/api/v1/auth/${type}/verify?${params}`,
          ).then(
            (res) =>
              res.json() as Promise<{
                accessToken: string;
                refreshToken: string;
              }>,
          );

          if (accessToken) {
            res.setHeader(
              "Set-Cookie",
              `accessToken=${accessToken}; Path=/; Expires=Sat, 11 Jan 2025 17:00:00 GMT;`,
            );

            return true;
          }
        }

        if (type === "credentials" && user.accessToken) {
          res.setHeader(
            "Set-Cookie",
            `accessToken=${user.accessToken}; Path=/; Expires=Sat, 11 Jan 2025 17:00:00 GMT;`,
          );
          return true;
        }

        const { accessToken } = req.cookies;

        if (accessToken && account?.access_token && type === "spotify") {
          const data = await ServerService.linkSpotify(
            account.access_token,
            accessToken,
          );

          if (data.success) return true;

          return false;
        }

        if (accessToken && account?.access_token && type === "instagram") {
          const data = await ServerService.linkInstagram(
            account.access_token,
            accessToken,
          );

          if (data.success) return true;

          return false;
        }

        return false;
      },
    },
  });
}

const updateArtist = async (accessToken: string) => {
  return new Promise((resolve, reject) => {
    const isSuccessful = Math.random() > 0.5;

    setTimeout(() => {
      if (isSuccessful) {
        resolve({
          name: "Artist name",
          image: "https://picsum.photos/200",
        });
      } else {
        reject(new Error("Something went wrong"));
      }
    }, 1000);
  });
};

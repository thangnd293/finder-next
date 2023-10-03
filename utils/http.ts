import "server-only";
import { cookies } from "next/headers";

export const customFetch = async (
  api: string,
  requestInit?: RequestInit,
  accessToken?: string,
) => {
  const _accessToken = accessToken
    ? accessToken
    : cookies().get("accessToken")?.value || "";

  return fetch(`${process.env.BACKEND_URL}/api/v1${api}`, {
    ...requestInit,
    headers: {
      ...requestInit?.headers,
      Authorization: _accessToken ? `Bearer ${_accessToken}` : "",
    },
  });
};

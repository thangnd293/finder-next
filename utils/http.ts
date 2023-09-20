import "server-only";
import { cookies } from "next/headers";

export const customFetch = async (api: string, requestInit?: RequestInit) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";
  return fetch(`${process.env.BACKEND_URL}/api/v1${api}`, {
    ...requestInit,
    headers: {
      ...requestInit?.headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  });
};

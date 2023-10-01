"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const provider = searchParams?.get("provider");
  const success = searchParams?.get("success");
  const error = searchParams?.get("error");

  useEffect(() => {
    if (!provider) return;

    if (success === "true") {
      raiseResult(provider, true);

      return;
    }

    if (error) raiseResult(provider, false);
  }, [provider, success, error]);

  return null;
};

export default Page;

const raiseResult = (provider: string, isSuccess: boolean) => {
  if (!window) return;
  window.close();
  window.opener?.postMessage(
    {
      isSuccess,
      provider,
    },
    window.location.origin,
  );
};

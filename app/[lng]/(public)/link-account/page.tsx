"use client";

import { signIn } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const provider = searchParams?.get("provider");

  useEffect(() => {
    if (!provider) return;

    if (provider === "spotify") {
      signIn("spotify", {
        callbackUrl: `${window.location.origin}/external-auth-result?success=true&provider=spotify`,
      }).catch(() => {
        redirect(
          `${window.location.origin}/external-auth-result?success=false&provider=spotify`,
        );
      });
      return;
    }

    if (provider === "instagram") {
      signIn("instagram", {
        callbackUrl: `${window.location.origin}/external-auth-result?success=true&provider=instagram`,
      }).catch(() => {
        redirect(
          `${window.location.origin}/external-auth-result?success=false&provider=instagram`,
        );
      });
      return;
    }
  }, [provider]);
  return null;
}

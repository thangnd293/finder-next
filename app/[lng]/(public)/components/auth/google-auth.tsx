"use client";

import { GoogleIcon } from "@/assets/icons";
import Button from "@/components/Button";
import { signIn } from "next-auth/react";
import React from "react";

interface IGoogleAuthProps {
  textContent: string;
}
export default function GoogleAuth({ textContent }: IGoogleAuthProps) {
  return (
    <Button
      type="button"
      leftIcon={<GoogleIcon width={20} height={20} />}
      variant="social"
      onClick={() => signIn("google")}
    >
      {textContent}
    </Button>
  );
}

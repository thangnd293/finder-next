"use client";

import { GoogleIcon } from "@/assets/icons";
import Button from "@/components/Button";
import { signIn } from "next-auth/react";
import React from "react";

interface GoogleAuthProps {
  textContent: string;
}
const GoogleAuth = ({ textContent }: GoogleAuthProps) => {
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
};

export default GoogleAuth;

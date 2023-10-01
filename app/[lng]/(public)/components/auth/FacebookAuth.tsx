"use client";

import { FacebookIcon } from "@/assets/icons";
import Button from "@/components/Button";
import { signIn } from "next-auth/react";

interface FacebookAuthProps {
  textContent: string;
}
const FacebookAuth = ({ textContent }: FacebookAuthProps) => {
  return (
    <Button
      type="button"
      leftIcon={<FacebookIcon width={20} height={20} />}
      variant="social"
      onClick={() => signIn("facebook")}
    >
      {textContent}
    </Button>
  );
};

export default FacebookAuth;

"use client";

import AuthModal, { EAuthMode } from "@/components/auth-modal";
import Button from "@/components/button";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

interface ISignUpProps {
  variant?: "accent" | "outline" | "default";
  className?: string;
}
export default function SignUp({
  variant = "default",
  className,
}: ISignUpProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        className={cn("group", className)}
        variant={variant}
        leftIcon={
          <ArrowRightIcon
            className="transition-transform will-change-transform group-hover:-rotate-45"
            width={18}
            height={18}
          />
        }
        onClick={() => setIsOpen(true)}
      >
        Tạo tài khoản
      </Button>
      <AuthModal
        isOpen={isOpen}
        defaultMode={EAuthMode.SIGN_UP}
        onOpenChange={setIsOpen}
      />
    </>
  );
}

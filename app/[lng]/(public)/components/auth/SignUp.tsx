"use client";

import Button from "@/components/Button";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import AuthModal, { EAuthMode } from "./AuthModal";

interface SignUpProps {
  variant?: "accent" | "outline" | "default";
  className?: string;
  renderButton?: (props: { onClick: () => void }) => React.ReactNode;
}
const SignUp = ({
  variant = "default",
  className,
  renderButton,
}: SignUpProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {renderButton ? (
        renderButton({ onClick: () => setIsOpen(true) })
      ) : (
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
      )}
      <AuthModal
        isOpen={isOpen}
        defaultMode={EAuthMode.SIGN_UP}
        onOpenChange={setIsOpen}
      />
    </>
  );
};

export default SignUp;

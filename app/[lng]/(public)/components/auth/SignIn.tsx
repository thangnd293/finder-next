"use client";

import Button from "@/components/Button";
import React, { useState } from "react";
import AuthModal, { EAuthMode } from "./AuthModal";

interface SignInProps {
  renderButton?: (props: { onClick: () => void }) => React.ReactNode;
}

const SignIn = ({ renderButton }: SignInProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {renderButton ? (
        renderButton({ onClick: () => setIsOpen(true) })
      ) : (
        <Button variant="accent" onClick={() => setIsOpen(true)}>
          Đăng nhập
        </Button>
      )}

      <AuthModal
        defaultMode={EAuthMode.SIGN_IN}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      />
    </>
  );
};

export default SignIn;

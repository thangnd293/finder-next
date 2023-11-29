"use client";

import Button from "@/components/Button";
import dynamic from "next/dynamic";
import React, { useState } from "react";

const AuthModal = dynamic(() => import("./AuthModal"));
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
        defaultMode={"signIn"}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      />
    </>
  );
};

export default SignIn;

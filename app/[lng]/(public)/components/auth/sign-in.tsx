"use client";

import Button from "@/components/button";
import React, { useState } from "react";
import AuthModal, { EAuthMode } from "./auth-modal";

export default function SignIn() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button variant="accent" onClick={() => setIsOpen(true)}>
        Đăng nhập
      </Button>
      <AuthModal
        defaultMode={EAuthMode.SIGN_IN}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      />
    </>
  );
}

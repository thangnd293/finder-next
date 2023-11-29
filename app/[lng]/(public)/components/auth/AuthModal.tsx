"use client";

import Modal from "@/components/Modal";
import { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

type Mode = "signIn" | "signUp";
interface AuthModalProps {
  isOpen: boolean;
  defaultMode?: Mode;
  onOpenChange: (open: boolean) => void;
}

const AuthModal = ({
  isOpen,
  defaultMode = "signUp",
  onOpenChange,
}: AuthModalProps) => {
  const [mode, setMode] = useState<Mode>(defaultMode);

  const onSwitchMode = (mode: Mode) => {
    setMode(mode);
  };

  return (
    <Modal
      className="overflow-y-auto p-6"
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      {
        {
          signUp: (
            <SignUpForm onSwitchToSignIn={() => onSwitchMode("signIn")} />
          ),
          signIn: (
            <SignInForm onSwitchToSignUp={() => onSwitchMode("signUp")} />
          ),
        }[mode]
      }
    </Modal>
  );
};

export default AuthModal;

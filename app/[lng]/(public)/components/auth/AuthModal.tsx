"use client";

import Modal from "@/components/Modal";
import { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

export enum EAuthMode {
  SIGN_IN = "sign-in",
  SIGN_UP = "sign-up",
}

interface AuthModalProps {
  isOpen: boolean;
  defaultMode?: EAuthMode;
  onOpenChange: (open: boolean) => void;
}

const AuthModal = ({
  isOpen,
  defaultMode = EAuthMode.SIGN_UP,
  onOpenChange,
}: AuthModalProps) => {
  const [mode, setMode] = useState<EAuthMode>(defaultMode);

  const onSwitchMode = (mode: EAuthMode) => {
    setMode(mode);
  };

  return (
    <Modal open={isOpen} onOpenChange={onOpenChange}>
      {
        {
          [EAuthMode.SIGN_UP]: (
            <SignUpForm
              onSwitchToSignIn={() => onSwitchMode(EAuthMode.SIGN_IN)}
            />
          ),
          [EAuthMode.SIGN_IN]: (
            <SignInForm
              onSwitchToSignUp={() => onSwitchMode(EAuthMode.SIGN_UP)}
            />
          ),
        }[mode]
      }
    </Modal>
  );
};

export default AuthModal;

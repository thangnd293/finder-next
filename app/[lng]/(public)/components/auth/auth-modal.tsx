"use client";

import Modal from "@/components/modal";
import { useState } from "react";
import SignUpForm from "./sign-up-form";
import SignInForm from "./sign-in-form";

export enum EAuthMode {
  SIGN_IN = "sign-in",
  SIGN_UP = "sign-up",
}

interface IAuthModalProps {
  isOpen: boolean;
  defaultMode?: EAuthMode;
  onOpenChange: (open: boolean) => void;
}

export default function AuthModal({
  isOpen,
  defaultMode = EAuthMode.SIGN_UP,
  onOpenChange,
}: IAuthModalProps) {
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
}

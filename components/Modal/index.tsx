"use client";

import * as RadixDialog from "@radix-ui/react-dialog";
import React from "react";

import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { ModalBody } from "./ModalBody";
import { ModalFooter } from "./ModalFooter";
import { ModalHeader } from "./ModalHeader";

interface ModalProps
  extends React.ComponentProps<typeof RadixDialog.Root>,
    VariantProps<typeof modalVariants> {
  open?: boolean;
  title?: string;
  withOverlay?: boolean;
  className?: string;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  onOpenChange?: (open: boolean) => void;
  hasAnimate?: boolean;
  children: React.ReactNode;
  unMoutOnClose?: boolean;
}

const Modal = ({
  className,
  title,
  open = true,
  onOpenChange,
  children,
  size,
  withOverlay = true,
  closeOnClickOutside = true,
  closeOnEscape = true,
  hasAnimate = true,
  unMoutOnClose = true,
  ...others
}: ModalProps) => {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange} modal {...others}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay
          className={cn(
            "fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center md:py-10",
            {
              "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0":
                hasAnimate,

              "bg-modal-overplay": withOverlay,
            },
          )}
        >
          <RadixDialog.Content
            className={cn(
              modalVariants({ size }),
              {
                "duration-200": hasAnimate,
              },
              className,
            )}
            onPointerDownOutside={(e) => {
              if (!closeOnClickOutside) {
                e.preventDefault();
              }
            }}
            onEscapeKeyDown={(e) => {
              if (!closeOnEscape) {
                e.preventDefault();
              }
            }}
          >
            {children}
          </RadixDialog.Content>
        </RadixDialog.Overlay>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export default Modal;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

const modalVariants = cva(
  "flex flex-col max-h-full w-full bg-modal sm:rounded-lg shadow mx-auto overflow-hidden",
  {
    variants: {
      size: {
        xs: "w-full h-screen sm:h-fit sm:w-[320px]",
        sm: "w-full h-screen sm:h-fit sm:w-[380px]",
        default: "w-full h-screen sm:h-fit sm:w-[440px]",
        lg: "w-full h-screen sm:h-fit sm:w-[620px]",
        xl: "w-full h-screen sm:h-fit sm:w-[780px]",
        auto: "w-full h-screen sm:h-fit sm:w-max",
        full: "w-full !my-0 min-h-screen h-fit !rounded-none left-0 top-0",
      },
    },

    defaultVariants: {
      size: "default",
    },
  },
);

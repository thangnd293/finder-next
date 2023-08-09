import React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";

import { Cross2Icon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const modalVariants = cva(
  "fixed items-center left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 bg-modal p-6 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-sm",
  {
    variants: {
      size: {
        xs: "w-full h-screen sm:h-auto sm:w-[320px]",
        sm: "w-full h-screen sm:h-auto sm:w-[380px]",
        default: "w-full h-screen sm:h-auto sm:w-[440px]",
        lg: "w-full h-screen sm:h-auto sm:w-[620px]",
        xl: "w-full h-screen sm:h-auto sm:w-[780px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

interface IModalProps
  extends React.ComponentProps<typeof RadixDialog.Root>,
    VariantProps<typeof modalVariants> {
  open: boolean;
  withOverlay?: boolean;
  className?: string;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}
export default function Modal({
  open,
  className,
  onOpenChange,
  children,
  size,
  withOverlay = true,
  closeOnClickOutside = true,
  closeOnEscape = true,
  ...others
}: IModalProps) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange} {...others}>
      <RadixDialog.Portal>
        {withOverlay && (
          <RadixDialog.Overlay className="fixed inset-0 z-50 hidden bg-modal-overplay data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 sm:block" />
        )}

        <RadixDialog.Content
          className={cn(modalVariants({ size }), className)}
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

          <RadixDialog.Close
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            onClick={() => onOpenChange(false)}
          >
            <Cross2Icon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}

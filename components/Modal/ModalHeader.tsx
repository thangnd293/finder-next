import React, { PropsWithChildren } from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import ActionIcon from "../ActionIcon";
import { cn } from "@/lib/utils";

interface ModalHeaderProps {
  withCloseButton?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ModalHeader({
  children,
  withCloseButton,
  onOpenChange,
}: PropsWithChildren<ModalHeaderProps>) {
  return (
    <RadixDialog.DialogTitle className="sticky top-0 flex h-14 shrink-0 items-center justify-center border-b text-center text-xl font-semibold">
      {children}
      {withCloseButton && (
        <RadixDialog.Close
          className="absolute right-3"
          tabIndex={-1}
          onClick={() => onOpenChange?.(false)}
          asChild
        >
          <CloseButton />
        </RadixDialog.Close>
      )}
    </RadixDialog.DialogTitle>
  );
}

interface CloseButtonProps
  extends React.ComponentPropsWithoutRef<typeof ActionIcon> {}
export const CloseButton = ({ className, ...others }: CloseButtonProps) => {
  return (
    <ActionIcon
      className={cn(
        "rounded-full bg-background-100 p-1.5 ring-offset-background transition-opacity hover:bg-background-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none",
        className,
      )}
      tabIndex={-1}
      {...others}
    >
      <Cross2Icon className="h-5 w-5" />
      <span className="sr-only">Close</span>
    </ActionIcon>
  );
};

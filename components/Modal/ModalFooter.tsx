import { cn } from "@/lib/utils";
import React, { HTMLAttributes, PropsWithChildren } from "react";

export const ModalFooter = ({
  className,
  children,
  ...others
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => {
  return (
    <div
      className={cn(
        "sticky bottom-0 flex h-14 shrink-0 items-center justify-end space-x-2 border-t bg-background px-4",
        className,
      )}
      {...others}
    >
      {children}
    </div>
  );
};

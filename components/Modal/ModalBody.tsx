import { cn } from "@/lib/utils";
import { HTMLAttributes, PropsWithChildren } from "react";

export const ModalBody = ({
  className,
  children,
  ...others
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => {
  return (
    <div className="h-full w-full flex-1 overflow-y-auto" {...others}>
      <div className={cn("h-full", className)}>{children}</div>
    </div>
  );
};

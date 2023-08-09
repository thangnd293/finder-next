"use client";

import React, { PropsWithChildren } from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface ITooltipProps
  extends VariantProps<typeof tooltipVariants>,
    Pick<RadixTooltip.TooltipProps, "defaultOpen" | "open" | "onOpenChange"> {
  className?: string;
  label: string;
  disabled?: boolean;
  contentProps?: React.ComponentPropsWithoutRef<typeof RadixTooltip.Content>;
}
export default function Tooltip({
  className,
  label,
  color,
  size,
  disabled,
  children,
  contentProps,
  ...others
}: PropsWithChildren<ITooltipProps>) {
  if (disabled) return <>{children}</>;

  return (
    <RadixTooltip.Provider disableHoverableContent>
      <RadixTooltip.Root {...others}>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className={cn(tooltipVariants({ className, color, size }))}
            sideOffset={5}
            {...contentProps}
          >
            {label}
            <RadixTooltip.Arrow className={cn(arrowVariants({ color }))} />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}

const tooltipVariants = cva(
  "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 select-none rounded-[4px]  px-[15px] py-[10px] leading-none  shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] z-50",
  {
    variants: {
      color: {
        default: "bg-background-tooltip text-accent",
        destructive: "bg-destructive text-destructive-foreground",
      },
      size: {
        default: "px-3 py-1.5 text-xs",
        lg: "px-4 py-2 text-sm",
      },
    },
    defaultVariants: {
      color: "default",
      size: "default",
    },
  },
);

const arrowVariants = cva("", {
  variants: {
    color: {
      default: "fill-background-tooltip",
      destructive: "fill-destructive",
    },
  },
  defaultVariants: {
    color: "default",
  },
});

"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";

import { VariantProps, cva } from "class-variance-authority";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipArrow = TooltipPrimitive.Arrow;
const TooltipPortal = TooltipPrimitive.Portal;

export const tooltipVariants = cva(
  "z-50 overflow-hidden rounded-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      color: {
        default:
          "bg-accent-background/60 text-primary-foreground [&_polygon]:fill-accent-background/60",
        destructive:
          "bg-destructive text-destructive-foreground [&_polygon]:fill-destructive",
      },
      size: {
        default: "px-3 py-1.5 text-xs",
        lg: "px-4 py-2 text-sm",
      },
    },
    defaultVariants: {
      color: "default",
    },
  },
);

type TTooltipContentProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Content
> &
  VariantProps<typeof tooltipVariants>;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TTooltipContentProps
>(({ className, sideOffset = 4, color, size, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={tooltipVariants({ color, size, className })}
    {...props}
  />
));

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipPortal,
};

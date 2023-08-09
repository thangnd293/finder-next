import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";
import Tooltip from "./tooltip";

const actionIconVariants = cva(
  "inline-flex items-center justify-center cursor-poiter rounded-md flex-shrink-0 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:translate-y-px",
  {
    variants: {
      variant: {
        transparent: "",
        accent:
          "bg-accent-background text-accent shadow hover:bg-accent-background/90",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        outline:
          "border border-accent-background/10 text-accent-background/80 hover:border-accent-background/40",
        light: "bg-background-100 hover:bg-primary-100 hover:text-primary",
        subtle: "bg-transparent hover:bg-primary-100 hover:text-primary",
        filled: "bg-background text-foreground hover:bg-background-200",
      },
      size: {
        xs: "w-4.5 h-4.5",
        sm: "w-6 h-6",
        default: "w-8 h-8",
        lg: "w-9 h-9",
        xl: "w-11 h-11",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
    },
  },
);

interface IActionIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof actionIconVariants> {
  title?: string;
}

const ActionIcon = React.forwardRef<HTMLButtonElement, IActionIconProps>(
  ({ className, variant, size, title, ...others }, ref) => {
    return (
      <Tooltip label={title ?? ""} disableHoverableContent={!title}>
        <button
          className={cn(actionIconVariants({ variant, size, className }))}
          ref={ref}
          {...others}
        />
      </Tooltip>
    );
  },
);
ActionIcon.displayName = "ActionIcon";

export default ActionIcon;

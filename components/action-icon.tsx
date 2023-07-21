import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

const actionIconVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:!translate-y-px",
  {
    variants: {
      variant: {
        accent:
          "bg-accent-background text-accent shadow hover:bg-accent-background/90",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        outline:
          "border border-accent-background/10 text-accent-background/80 hover:border-accent-background/40",
        transparent: "",
      },
      size: {
        xs: "w-4.5 h-4.5",
        default: "w-7 h-7",
        lg: "w-9 h-9",
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
    VariantProps<typeof actionIconVariants> {}

const ActionIcon = React.forwardRef<HTMLButtonElement, IActionIconProps>(
  ({ className, variant, size, ...others }, ref) => {
    return (
      <button
        className={cn(actionIconVariants({ variant, size, className }))}
        ref={ref}
        {...others}
      />
    );
  },
);
ActionIcon.displayName = "ActionIcon";

export default ActionIcon;

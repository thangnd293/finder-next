import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export interface ButtonBaseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonBaseVariants> {
  asChild?: boolean;
}

const ButtonBase = React.forwardRef<HTMLButtonElement, ButtonBaseProps>(
  (
    { className, variant, size, disabled, asChild = false, onClick, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
    };
    return (
      <Comp
        className={cn(buttonBaseVariants({ variant, size, className }), {
          "bg-gray-300": disabled,
        })}
        ref={ref}
        disabled={disabled}
        onClick={handleClick}
        {...props}
      />
    );
  },
);

ButtonBase.displayName = "ButtonBase";

export default ButtonBase;

export const buttonBaseVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:translate-y-px flex-shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-primary text-primary bg-transparent shadow-sm hover:bg-primary hover:text-primary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        accent:
          "bg-accent-background text-accent shadow-sm hover:bg-accent-background/70",
        ghost: "hover:bg-background-50 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        social: "bg-background/80 hover:bg-background border shadow-sm",
      },
      size: {
        xs: "h-7.5 px-3.5 py-1 text-xs",
        sm: "h-9 px-4.5 text-sm",
        default: "h-10.5 px-6 py-2 text-base",
        lg: "h-12 px-7 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

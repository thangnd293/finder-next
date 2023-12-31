"use client";

import React from "react";
import ButtonBase from "./ButtonBase";
import Spinner from "./Spinner";

interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof ButtonBase> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ leftIcon, loading, disabled, children, ...others }, ref) => {
    return (
      <ButtonBase ref={ref} disabled={disabled || loading} {...others}>
        {(leftIcon || loading) && (
          <span className="mr-2.5">{loading ? <Spinner /> : leftIcon}</span>
        )}
        {children}
      </ButtonBase>
    );
  },
);
Button.displayName = "Button";

export default Button;

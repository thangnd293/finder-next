import React from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button, ButtonProps } from "@/components/ui/button";

interface IButtonLoadingProps extends ButtonProps {
  isLoading?: boolean;
}
export default function ButtonLoading({
  isLoading,
  disabled,
  children,
  ...rest
}: IButtonLoadingProps) {
  return (
    <Button disabled={disabled || isLoading} {...rest}>
      {isLoading && <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </Button>
  );
}

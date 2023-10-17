"use client";

import React, { useId, useState } from "react";
import InputBase from "@/components/InputBase";
import { cn } from "@/lib/utils";
import {
  EyeClosedIcon,
  EyeOpenIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import Tooltip from "./Tooltip";
import Label from "./Label";
interface InputProps extends React.ComponentPropsWithoutRef<typeof InputBase> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  wrapperClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      type,
      error,
      className,
      leftIcon,
      rightIcon,
      wrapperClassName,
      onBlur,
      onFocus,
      ...others
    },
    ref,
  ) => {
    const id = useId();
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const PasswordVisibleIcon = showPassword ? EyeOpenIcon : EyeClosedIcon;
    return (
      <fieldset className={wrapperClassName}>
        <Label className="self-start justify-self-start" htmlFor={id}>
          {label}
        </Label>

        <div
          className={cn("relative", {
            "text-destructive": error,
          })}
        >
          {leftIcon && (
            <span className="absolute left-2 top-1/2 -translate-y-1/2 px-2 font-bold text-secondary-foreground">
              {leftIcon}
            </span>
          )}
          <InputBase
            id={id}
            ref={ref}
            className={cn(
              "pr-7",
              {
                "border-current !ring-destructive/60 placeholder:text-inherit":
                  error,
                "pr-14": (type === "password" || rightIcon) && error,
                "pl-10": leftIcon,
              },
              className,
            )}
            type={showPassword ? "text" : type}
            aria-invalid={error ? "true" : "false"}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus && onFocus(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur && onBlur(e);
            }}
            {...others}
          />

          {type === "password" && (
            <button
              type="button"
              className={cn("absolute right-2 top-1/2 -translate-y-1/2", {
                "right-8": error,
              })}
              onClick={() => setShowPassword(!showPassword)}
            >
              <PasswordVisibleIcon width={18} height={18} />
            </button>
          )}

          {rightIcon && (
            <span
              className={cn("absolute right-2 top-1/2 -translate-y-1/2", {
                "right-8": error,
              })}
            >
              {rightIcon}
            </span>
          )}

          {error && (
            <Tooltip
              label={error}
              open={isFocused}
              color="destructive"
              size="lg"
              contentProps={{
                side: "right",
              }}
            >
              <InfoCircledIcon
                width={18}
                height={18}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              />
            </Tooltip>
          )}
        </div>
      </fieldset>
    );
  },
);

Input.displayName = "Input";

export default Input;

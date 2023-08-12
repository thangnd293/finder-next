"use client";

import React, { useId, useState } from "react";
import { InputBase } from "@/components/input-base";
import { Label } from "./label";
import { cn } from "@/lib/utils";
import {
  EyeClosedIcon,
  EyeOpenIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import Tooltip from "./tooltip";

interface IInputProps extends React.ComponentPropsWithoutRef<typeof InputBase> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ label, type, error, className, onBlur, onFocus, ...others }, ref) => {
    const id = useId();
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const PasswordVisibleIcon = showPassword ? EyeOpenIcon : EyeClosedIcon;
    return (
      <fieldset>
        <Label htmlFor={id}>{label}</Label>

        <div
          className={cn("relative", {
            "text-destructive": error,
          })}
        >
          <InputBase
            id={id}
            ref={ref}
            className={cn(
              "pr-7",
              {
                "border-current placeholder:text-inherit": true,
                "pr-14": type === "password" && error,
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
                "right-8": type === "password" && error,
              })}
              onClick={() => setShowPassword(!showPassword)}
            >
              <PasswordVisibleIcon width={18} height={18} />
            </button>
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

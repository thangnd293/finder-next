"use client";

import * as React from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { CheckIcon, InfoCircledIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { useId } from "react";
import Label from "./Label";
import Tooltip from "./Tooltip";

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root> {
  label?: string;
  description?: string;
}
const Checkbox = React.forwardRef<
  React.ElementRef<typeof RadixCheckbox.Root>,
  CheckboxProps
>(({ label, description, className, ...props }, ref) => {
  const id = useId();

  return (
    <div className="flex items-center space-x-2">
      <RadixCheckbox.Root
        id={`label-${id}`}
        ref={ref}
        className={cn(
          "peer h-5 w-5 shrink-0 rounded-sm border shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
          className,
        )}
        {...props}
      >
        <RadixCheckbox.Indicator
          className={cn("flex items-center justify-center text-current")}
        >
          <CheckIcon className="h-5 w-5" />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      {label && (
        <Label
          className="flex items-center gap-1 font-normal"
          htmlFor={`label-${id}`}
        >
          {label}
          {description && (
            <Tooltip label={description}>
              <InfoCircledIcon className="text-muted-foreground" />
            </Tooltip>
          )}
        </Label>
      )}
    </div>
  );
});
Checkbox.displayName = RadixCheckbox.Root.displayName;

export default Checkbox;

"use client";

import * as React from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { useId } from "react";

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root> {
  label?: string;
}
const Checkbox = React.forwardRef<
  React.ElementRef<typeof RadixCheckbox.Root>,
  CheckboxProps
>(({ label, className, ...props }, ref) => {
  const id = useId();

  return (
    <div className="flex items-center space-x-2">
      <RadixCheckbox.Root
        id={`label-${id}`}
        ref={ref}
        className={cn(
          "peer h-5 w-5 shrink-0 rounded-sm border border-primary-300 shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
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
        <label
          htmlFor={`label-${id}`}
          className="select-none text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      )}
    </div>
  );
});
Checkbox.displayName = RadixCheckbox.Root.displayName;

export default Checkbox;

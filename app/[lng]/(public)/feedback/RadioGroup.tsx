"use client";

import Label from "@/components/Label";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@radix-ui/react-icons";
import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import React, { useId } from "react";

type RadioGroupProps = React.ComponentPropsWithoutRef<
  typeof RadixRadioGroup.Root
>;
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadixRadioGroup.Root>,
  RadioGroupProps
>(({ className, ...props }, ref) => {
  return (
    <RadixRadioGroup.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadixRadioGroup.Root.displayName;

interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Item> {
  value: string;
  label: string;
}
const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadixRadioGroup.Item>,
  RadioGroupItemProps
>(({ className, children, label, ...props }, ref) => {
  const id = `radio-${useId()}`;
  return (
    <div className="flex items-center space-x-2">
      <RadixRadioGroup.Item
        ref={ref}
        id={id}
        className={cn(
          "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      >
        <RadixRadioGroup.Indicator className="flex items-center justify-center">
          <CheckIcon className="h-3.5 w-3.5 fill-primary" />
        </RadixRadioGroup.Indicator>
      </RadixRadioGroup.Item>
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
});
RadioGroupItem.displayName = RadixRadioGroup.Item.displayName;

export { RadioGroup, RadioGroupItem };

"use client";

import { cn } from "@/lib/utils";
import * as RadixCollapsible from "@radix-ui/react-collapsible";
import React from "react";

export const Collapsible = RadixCollapsible.Root;

export const CollapsibleTrigger = RadixCollapsible.Trigger;

export const CollapsibleContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof RadixCollapsible.Content>
>(({ className, ...others }, ref) => {
  return (
    <RadixCollapsible.Content
      {...others}
      ref={ref}
      className={cn(
        "overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
        className,
      )}
    />
  );
});

CollapsibleContent.displayName = "CollapsibleContent";

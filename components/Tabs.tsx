"use client";

import * as React from "react";
import * as RadixTab from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = RadixTab.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof RadixTab.List>,
  React.ComponentPropsWithoutRef<typeof RadixTab.List>
>(({ className, ...props }, ref) => (
  <RadixTab.List
    ref={ref}
    className={cn(
      "inline-flex items-center border-b border-gray-100 text-muted-foreground",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = RadixTab.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof RadixTab.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixTab.Trigger>
>(({ className, ...props }, ref) => (
  <RadixTab.Trigger
    ref={ref}
    className={cn(
      "[state=active]:font-medium -mb-[2px] inline-flex items-center justify-center whitespace-nowrap border-b-[3px] border-transparent px-2 py-3 text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-primary data-[state=active]:text-foreground",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = RadixTab.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof RadixTab.Content>,
  React.ComponentPropsWithoutRef<typeof RadixTab.Content>
>(({ className, ...props }, ref) => (
  <RadixTab.Content
    ref={ref}
    className={cn(
      "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = RadixTab.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };

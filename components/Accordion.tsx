"use client";

import * as React from "react";
import * as RadixAccordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

const Accordion = RadixAccordion.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof RadixAccordion.Item>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Item>
>(({ className, ...props }, ref) => (
  <RadixAccordion.Item
    ref={ref}
    className={cn(
      "relative py-6 before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:rounded-3xl before:transition-all before:duration-200 before:hover:bg-background-50 [&[data-state=open]:before]:scale-x-110 [&[data-state=open]:before]:bg-background-50 dark:[&[data-state=open]:before]:bg-background-100",
      className,
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof RadixAccordion.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Trigger>
>(({ className, children, ...props }, ref) => (
  <RadixAccordion.Header className="flex">
    <RadixAccordion.Trigger
      ref={ref}
      className={cn(
        "group relative flex flex-1 items-center justify-between px-6 font-medium transition-all [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="absolute right-6 h-4 w-4 shrink-0 text-muted-foreground transition-all duration-200 group-hover:text-foreground" />
    </RadixAccordion.Trigger>
  </RadixAccordion.Header>
));
AccordionTrigger.displayName = RadixAccordion.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof RadixAccordion.Content>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Content>
>(({ className, children, ...props }, ref) => (
  <RadixAccordion.Content
    ref={ref}
    className={cn(
      "mt-4 overflow-hidden p-px text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className,
    )}
    {...props}
  >
    <div>{children}</div>
  </RadixAccordion.Content>
));
AccordionContent.displayName = RadixAccordion.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

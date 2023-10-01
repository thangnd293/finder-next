"use client";

import * as React from "react";
import * as RadixSlider from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof RadixSlider.Root>,
  React.ComponentPropsWithoutRef<typeof RadixSlider.Root>
>(({ className, ...props }, ref) => (
  <RadixSlider.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className,
    )}
    {...props}
  >
    <RadixSlider.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-background-100">
      <RadixSlider.Range className="absolute h-full bg-primary" />
    </RadixSlider.Track>
    {props.value ? (
      props.value.map((_, index) => (
        <RadixSlider.Thumb
          key={index}
          className="border-primary/50 block h-6 w-6 rounded-full border bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        />
      ))
    ) : (
      <RadixSlider.Thumb className="border-primary/50 block h-6 w-6 rounded-full border bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
    )}
  </RadixSlider.Root>
));

Slider.displayName = RadixSlider.Root.displayName;

export default Slider;

import { libreBaskerville } from "@/assets/fonts";
import { cn } from "@/lib/utils";
import React from "react";

interface IHeadingProps {
  subtitle: string;
  title: string;
  highlight: string;
}
export default function Heading({ subtitle, title, highlight }: IHeadingProps) {
  return (
    <h3
      className={cn(libreBaskerville.className, "mx-auto mb-12 w-fit sm:mb-24")}
    >
      <p className="text-xl text-secondary-foreground sm:text-2xl md:text-3xl lg:text-4xl">
        {subtitle}
      </p>
      <p className="text-5xl text-secondary-foreground sm:text-6xl md:text-7xl lg:text-8xl">
        {title}
      </p>
      <p className="translate-x-1/3 text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
        {highlight}
      </p>
    </h3>
  );
}

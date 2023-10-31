import AspectRatio from "@/components/AspectRatio";
import { cn } from "@/lib/utils";
import React from "react";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}
const Card = ({ className, children }: CardProps) => {
  return (
    <div className={className}>
      <AspectRatio
        asChild
        ratio={7 / 9}
        className={cn(
          "relative cursor-pointer transition-transform hover:scale-105",
        )}
      >
        {children}
      </AspectRatio>
    </div>
  );
};

export default Card;

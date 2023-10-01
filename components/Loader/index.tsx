import React from "react";
import classes from "./loader.module.css";
import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
  variant?: "spinner" | "water-surface";
  size?: number;
}

const Loader = ({ className, variant = "spinner", size = 48 }: LoaderProps) => {
  if (variant === "water-surface")
    return (
      <span
        className={cn(classes["loader-water-surface"], className)}
        style={{
          width: size,
          height: size,
        }}
      />
    );

  return (
    <span
      className={cn(classes["loader-spinner"], className)}
      style={{
        width: size,
        height: size,
      }}
    />
  );
};

export default Loader;

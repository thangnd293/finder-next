import React from "react";
import classes from "./loader.module.css";
import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
  variant?: "spinner" | "water-surface";
}

const Loader = ({ className, variant = "spinner" }: LoaderProps) => {
  if (variant === "water-surface")
    return <span className={cn(classes["loader-water-surface"], className)} />;

  return <span className={cn(classes["loader-spinner"], className)} />;
};

export default Loader;

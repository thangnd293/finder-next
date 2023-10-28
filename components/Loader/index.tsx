import React from "react";
import classes from "./loader.module.css";
import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
  variant?: "loader" | "spinner";
  size?: number;
}

const Loader = ({ className, variant = "loader", size = 48 }: LoaderProps) => {
  const style = { "--loader-size": `${size / 10}px` } as React.CSSProperties;

  if (variant === "spinner")
    return (
      <span
        className={cn(classes["loader-spinner"], className)}
        style={{
          width: size,
          height: size,
        }}
      />
    );

  return <span className={cn(classes["loader"], className)} style={style} />;
};

export default Loader;

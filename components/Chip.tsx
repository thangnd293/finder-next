import { cn } from "@/lib/utils";
import React from "react";

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  icon?: React.ReactNode;
  label: string;
}
const Chip = ({ className, icon, label, ...others }: ChipProps) => {
  return (
    <button
      className={cn(
        "flex items-center gap-1 rounded-full border bg-background px-3 py-2 text-sm font-medium shadow",
        className,
      )}
      type="button"
      {...others}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default Chip;

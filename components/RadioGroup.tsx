"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import Label from "./Label";
import React from "react";

export interface Option {
  label: string;
  value: string;
}

interface RadioGroupProps {
  className?: string;
  label: string;
  data: Option[];
  value?: string;
  onChange?: (value: string) => void;
}
const RadioGroup = ({
  className,
  label,
  data,
  value,
  onChange,
}: RadioGroupProps) => {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleChange = (value: string) => {
    setSelectedValue(value);
    onChange?.(value);
  };

  return (
    <div className={className}>
      <Label>{label}</Label>
      <div
        className={cn(
          "flex items-center gap-1 rounded-md border bg-background-100 p-0.5",
        )}
      >
        {data.map((item) => (
          <button
            key={item.value}
            type="button"
            className={cn(
              "min-w-[100px] flex-1 px-4 py-2 text-sm text-secondary-foreground",
              selectedValue === item.value &&
                "rounded-lg bg-background font-semibold text-primary-500",
            )}
            onClick={() => handleChange(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;

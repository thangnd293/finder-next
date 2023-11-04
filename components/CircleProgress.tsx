"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

interface CircleProgressProps {
  percentage: number;
  size: number;
  strokeWidth: number;
  className?: string;
  label?: string;
  place?: "top" | "bottom";
  color?: string;
}

const CircleProgress = ({
  percentage,
  size,
  strokeWidth,
  className,
  label,
  place = "bottom",
  color = "#fd5b1d",
}: CircleProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (percentage / 100) * circumference;
  const [offset, setOffset] = useState(circumference);

  const transform =
    place === "top"
      ? `rotate(-90 ${size / 2} ${size / 2})`
      : `rotate(90 ${size / 2} ${size / 2})`;

  useEffect(() => {
    setOffset(dashOffset);
  }, [dashOffset]);

  return (
    <div className={cn("pointer-events-none relative h-fit w-fit", className)}>
      <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#f0f0f0"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={transform}
        />
      </svg>
      {label && (
        <p className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-3xl bg-gradient-to-b from-primary-400 to-primary-500 px-1.5 py-0.5 text-xs text-white">
          {label}
        </p>
      )}
    </div>
  );
};

export default CircleProgress;

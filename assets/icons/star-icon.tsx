import { IconProps } from "@/types/common";
import React from "react";

export function StarIcon(props: IconProps) {
  return (
    <svg
      focusable="false"
      aria-hidden="true"
      role="presentation"
      viewBox="0 0 24 24"
      width={50}
      height={50}
      {...props}
    >
      <path
        d="M11.999 2C11.999 7.001 17 12 22 12c-5.001 0-10 5.382-10 10 0-4.618-5.027-10-10-10 4.974 0 9.999-4.999 9.999-10z"
        fill="#fff"
      />
    </svg>
  );
}

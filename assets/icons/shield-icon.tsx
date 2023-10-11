import { IconProps } from "@/types/common";
import * as React from "react";

const ShieldIcon = (props: IconProps) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width={26} height={26} {...props}>
    <path
      clipRule="evenodd"
      d="M3.698 3.663c-1.84 0-2.921-.733-2.921-.733S-2.144 15.268 11 24C24.144 15.268 21.224 2.93 21.224 2.93s-1.081.733-2.922.733C16.462 3.663 13.921 2.93 11 0 8.079 2.93 5.509 3.663 3.698 3.663z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export default ShieldIcon;

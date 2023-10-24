import * as React from "react";
import { SVGProps } from "react";

export const PlusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg data-origin="pipeline" viewBox="0 0 32 32" fill="none" {...props}>
    <circle cx={16} cy={16} r={16} fill="#35E2BD" />
    <path
      d="M17.022 6.86L10.17 16.13a.973.973 0 00-.093 1.023.98.98 0 00.877.54h3.583a.475.475 0 01.457.603l-1.708 5.98a.975.975 0 00.497 1.155.983.983 0 001.228-.29l6.81-8.837a.973.973 0 00.112-1.02.98.98 0 00-.866-.556l-3.273-.082a.48.48 0 01-.453-.586l1.43-6.417a.976.976 0 00-.559-1.09.983.983 0 00-1.189.308z"
      fill="#fff"
    />
  </svg>
);

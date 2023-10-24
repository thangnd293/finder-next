import * as React from "react";
import { SVGProps } from "react";

export const PremiumIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg data-origin="pipeline" viewBox="0 0 32 32" fill="none" {...props}>
    <circle cx={16} cy={16} r={16} fill="currentColor" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.748 15.858c.139.042.14.247.001.29-1.12.343-3.838 1.24-4.646 2.08-.772.802-1.624 3.421-1.957 4.52-.042.14-.248.139-.29 0-.328-1.09-1.16-3.665-1.905-4.465-.81-.87-3.573-1.788-4.7-2.136-.14-.042-.138-.247 0-.289 1.105-.337 3.77-1.208 4.575-2.008.812-.806 1.691-3.489 2.03-4.599.043-.138.247-.139.29 0 .342 1.117 1.236 3.83 2.07 4.639.803.778 3.434 1.634 4.532 1.968z"
      fill="#fff"
    />
  </svg>
);

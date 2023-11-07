import * as React from "react";
import { SVGProps } from "react";

const SuperLikeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    focusable="false"
    aria-hidden="false"
    role="img"
    viewBox="0 0 24 24"
    width="24px"
    height="24px"
    stroke="white"
    strokeLinecap="round"
    aria-labelledby="c56ab02505d8efc1"
    {...props}
  >
    <defs>
      <linearGradient
        id="fill-super-like"
        x1={0.14644660940672627}
        x2={0.8535533905932737}
        y1={0.8535533905932737}
        y2={0.1464466094067262}
        spreadMethod="pad"
      >
        <stop offset="0%" stopColor="#47a1ff" />
        <stop offset="100%" stopColor="#30f3ef" />
      </linearGradient>
    </defs>
    <path
      d="M21.06 9.06l-5.47-.66c-.15 0-.39-.25-.47-.41l-2.34-5.25c-.47-.99-1.17-.99-1.56 0L8.87 7.99c0 .16-.23.4-.47.4l-5.47.66c-1.01 0-1.25.83-.46 1.65l4.06 3.77c.15.16.23.5.15.66L5.6 20.87c-.16.98.4 1.48 1.33.82l4.69-2.79h.78l4.69 2.87c.78.58 1.56 0 1.25-.98l-1.02-5.75s0-.4.23-.57l3.91-3.86c.78-.82.78-1.64-.39-1.64v.08z"
      fill="url(#fill-super-like)"
    />
    <title id="c56ab02505d8efc1">{"Si\xEAu Th\xEDch"}</title>
  </svg>
);
export default SuperLikeIcon;

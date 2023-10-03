import * as React from "react";
import { SVGProps } from "react";

const SiteInformationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 600 240"
    width={600}
    height={240}
    {...props}
    style={{
      aspectRatio: 600 / 240,
    }}
  >
    <path fill="transparent" d="M0 0h600v240H0z" />
    <path
      fill="#4A4F55"
      d="M142 114a2 2 0 0 1 0 4c-42.6 0-79.5-17.7-94.8-49.1a2 2 0 0 1 3.6-1.8c14.5 30 50 46.9 91.2 46.9zM47.8 84a2 2 0 0 1-4-.3l1.5-17.2a2 2 0 0 1 2.6-1.8l17.5 5.5a2 2 0 0 1-1.2 3.8l-15.1-4.7L47.8 84z"
    />
    <path
      fill="#FFF"
      stroke="#4A4F55"
      strokeWidth={3}
      d="M180 61.5c-3.6 0-6.5 3-6.5 6.5v104c0 3.6 3 6.5 6.5 6.5h240c3.6 0 6.5-3 6.5-6.5V68c0-3.6-3-6.5-6.5-6.5H180z"
    />
    <path
      fill="#4A4F55"
      d="M193 77h148c.6 0 1 .4 1 1v6c0 .6-.4 1-1 1H193a1 1 0 0 1-1-1v-6c0-.6.4-1 1-1zm26 22h105c.6 0 1 .4 1 1v6c0 .6-.4 1-1 1H219a1 1 0 0 1-1-1v-6c0-.6.4-1 1-1zm-26-4h14c.6 0 1 .4 1 1v14c0 .6-.4 1-1 1h-14a1 1 0 0 1-1-1V96c0-.6.4-1 1-1z"
      opacity={0.1}
    />
    <path
      fill="#FFF"
      stroke="#4A4F55"
      strokeWidth={3}
      d="M274 138.5c-.3 0-.5.2-.5.5v26c0 .3.2.5.5.5h62c.3 0 .5-.2.5-.5v-26c0-.3-.2-.5-.5-.5h-62z"
    />
    <path
      fill="#fd5b1d"
      fillOpacity={0.1}
      stroke="#fd5b1d"
      strokeWidth={3}
      d="M350 138.5c-.3 0-.5.2-.5.5v26c0 .3.2.5.5.5h62c.3 0 .5-.2.5-.5v-26c0-.3-.2-.5-.5-.5h-62z"
    />
  </svg>
);
export default SiteInformationIcon;

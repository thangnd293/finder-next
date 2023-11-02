"use client";

import { useIsMobile } from "@/hooks/use-is-mobile";
import React, { CSSProperties } from "react";
import { useElementSize } from "usehooks-ts";

interface CardBoxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: (style: CSSProperties) => React.ReactNode;
}

export const CardBox = ({ children }: CardBoxProps) => {
  const isMobileView = useIsMobile();
  const mobileStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    alignSelf: "flex-start",
  };

  const [boxRef, { width, height }] = useElementSize();

  const style = calcDimensions(width * 0.85, height * 0.85);

  return (
    <div
      ref={boxRef}
      className="flex h-full w-full items-center justify-center"
    >
      {children(isMobileView ? mobileStyle : style)}
    </div>
  );
};

const calcDimensions = (width: number, height: number) => {
  const x = Math.min(width / 3, height / 2);

  return {
    width: 3 * x,

    height: 2 * x,
  };
};

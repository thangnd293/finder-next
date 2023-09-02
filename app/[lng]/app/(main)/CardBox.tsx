"use client";

import React, { CSSProperties } from "react";
import { useElementSize } from "usehooks-ts";

interface CardBoxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: (style: CSSProperties) => React.ReactNode;
}
const CardBox = ({ children }: CardBoxProps) => {
  const [boxRef, { width, height }] = useElementSize();

  const dimensions = calcDimensions(width * 0.85, height * 0.85);

  return (
    <main
      ref={boxRef}
      className="flex h-full w-full items-center justify-center"
    >
      {children(dimensions)}
    </main>
  );
};

export default CardBox;

const calcDimensions = (width: number, height: number) => {
  const x = Math.min(width / 3, height / 2);

  return {
    width: 3 * x,

    height: 2 * x,
  };
};

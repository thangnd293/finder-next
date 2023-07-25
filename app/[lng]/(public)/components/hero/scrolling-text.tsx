"use client";

import React, { useEffect, useRef, useState } from "react";

const GAP = 24;

interface IScrollingTextProps {
  displayText: string;
}

function ScrollingText({ displayText }: IScrollingTextProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const itemWidth = useRef(0);

  const [items] = useState(() => Array(5).fill(displayText));

  //   Get the width of the item
  useEffect(() => {
    const textElement = itemRef.current;
    if (!textElement) return;

    const textWidth = textElement.getBoundingClientRect().width;

    itemWidth.current = textWidth;
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;
    let transform = 0;

    const timer = setInterval(() => {
      if (transform >= itemWidth.current + GAP) {
        transform = 0;
      }

      transform += 2;
      slider.style.transform = `translateX(-${transform}px)`;
    }, 20);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-2 overflow-hidden rounded-3xl bg-accent-background px-4 py-6 xl:py-8">
      <div
        className="inline-flex whitespace-nowrap text-accent will-change-transform"
        style={{
          gap: GAP + "px",
        }}
        ref={sliderRef}
      >
        {items.map((item, index) => (
          <div key={index} ref={itemRef}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(ScrollingText);

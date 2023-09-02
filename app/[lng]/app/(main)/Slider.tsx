"use client";

import Progress from "@/components/Progress";
import React, { useCallback, useEffect } from "react";

import useCallbackDebounce from "@/hooks/use-callback-debound";
import { cn } from "@/lib/utils";
import { useWindowSize } from "usehooks-ts";

interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isShow?: boolean;
}

export default function Slider({
  isShow,
  style,
  children,
  ...others
}: SliderProps) {
  const slideListRef = React.useRef<HTMLDivElement>(null);
  const sliderRef = React.useRef<HTMLDivElement>(null);

  const { width, height } = useWindowSize();

  const [currentIndex, setCurrentIndex] = React.useState(0);

  const slides = React.Children.toArray(children);

  const handleNextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev > 1 ? prev - 1 : 0));
  }, []);

  const handleNextSlideDebounce = useCallbackDebounce(() => {
    setCurrentIndex((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  }, 500);
  const handlePrevSlideDebounce = useCallbackDebounce(() => {
    setCurrentIndex((prev) => (prev > 1 ? prev - 1 : 0));
  }, 500);

  useEffect(() => {
    slideListRef.current?.children[currentIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [currentIndex]);

  useEffect(() => {
    slideListRef.current?.children[currentIndex]?.scrollIntoView();
  }, [width, height]);

  useEffect(() => {
    if (!isShow) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        handlePrevSlide();
      }

      if (event.key === "ArrowDown") {
        handleNextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isShow, handlePrevSlide, handleNextSlide]);

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider || !isShow) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const threshold = 50;

      if (Math.abs(e.deltaY) < threshold) return;

      if (e.deltaY > 0) {
        handleNextSlideDebounce();
      } else {
        handlePrevSlideDebounce();
      }
    };

    slider.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      slider.removeEventListener("wheel", handleWheel);
    };
  }, [isShow, handleNextSlideDebounce, handlePrevSlideDebounce]);

  return (
    <div {...others} ref={sliderRef}>
      <div
        className="aspect-[3/2] w-full overflow-hidden rounded-3xl bg-primary-50"
        style={style}
      >
        <div ref={slideListRef} onScroll={(e) => e.preventDefault()}>
          {slides}
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col">
        <ButtonScroll
          type={"up"}
          isNotAllow={currentIndex === 0}
          onClick={handlePrevSlide}
        />

        <ButtonScroll
          type={"down"}
          isNotAllow={currentIndex === slides.length - 1}
          onClick={handleNextSlide}
        />
      </div>

      {isShow && (
        <Progress
          className={cn(
            "absolute right-[-60px] top-[37px] h-1.5 w-20 rotate-90",
          )}
          value={(currentIndex / (slides.length - 1)) * 100}
        />
      )}
    </div>
  );
}

interface ButtonScrollProps {
  type: "up" | "down";
  isNotAllow: boolean;
  onClick: () => void;
}

const ButtonScroll = ({
  type = "up",
  isNotAllow,
  onClick,
}: ButtonScrollProps) => {
  return (
    <button
      className="flex-1"
      onClick={onClick}
      style={{
        cursor: isNotAllow
          ? `url('/images/none.png') 32 32, auto`
          : `url('/images/arrow-${type}.png') 32 32, auto`,
      }}
      aria-description={`Scroll ${type}`}
    />
  );
};

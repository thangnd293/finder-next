"use client";
import VerifiedIcon from "@/assets/icons/verified-icon";
import Tooltip from "@/components/Tooltip";
import { useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "usehooks-ts";

export default function Verified({
  image,
}: {
  image?: { isVerifiedSuccess?: boolean };
}) {
  const [isHover, setIsHover] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  const intersection = useIntersectionObserver(ref, {
    threshold: 0.5,
    rootMargin: "0px 0px 0px 0px",
  });

  useEffect(() => {
    console.log(
      "🚀 ~ file: Verified.tsx:34 ~ useEffect ~ image:",
      image?.isVerifiedSuccess,
      intersection?.isIntersecting,
    );
    if (!image?.isVerifiedSuccess || !intersection?.isIntersecting) return;
    const callback = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (!ref.current) return;
      const { top, left, width, height } = ref.current.getBoundingClientRect();
      if (
        clientX > left &&
        clientX < left + width &&
        clientY > top &&
        clientY < top + height
      ) {
        // eslint-disable-next-line no-console
        setIsHover(true);
      } else {
        setIsHover(false);
      }
    };
    document.addEventListener("mousemove", callback);
    return () => {
      document.removeEventListener("mousemove", callback);
    };
  }, [image, image?.isVerifiedSuccess, intersection?.isIntersecting]);

  return image?.isVerifiedSuccess ?
      <Tooltip
        color="destructive"
        className="bg-white font-medium text-primary"
        open={isHover}
        label={
          <p className="flex items-center gap-1">
            Hình chính chủ <VerifiedIcon size={14} />{" "}
          </p>
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img
          ref={ref}
          className="absolute bottom-px left-px w-1/2 object-cover"
          src="/images/verified.jpg"
        />
      </Tooltip>
    : null;
}

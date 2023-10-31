import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface ErrorViewProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSize?: number;
}
const ErrorView = ({
  className,
  imageSize = 256,
  ...others
}: ErrorViewProps) => {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-2 text-center",
        className,
      )}
      {...others}
    >
      <div
        className="relative aspect-square w-full origin-center object-cover"
        style={{
          maxWidth: imageSize,
        }}
      >
        <Image fill src="/images/error.png" alt="" />
      </div>
      <p className="text-lg font-medium">
        Hệ thống đang gặp trục trặc, vui lòng thử lại sau :((
      </p>
    </div>
  );
};

export default ErrorView;

import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const ErrorView = ({
  className,
  ...others
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-2",
        className,
      )}
      {...others}
    >
      <div className="relative aspect-square w-full max-w-[256px] origin-center object-cover">
        <Image fill src="/images/error.png" alt="" />
      </div>
      <p className="text-lg font-medium">
        Hệ thống đang gặp trục trặc, vui lòng thử lại sau :((
      </p>
    </div>
  );
};

export default ErrorView;

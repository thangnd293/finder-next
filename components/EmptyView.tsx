import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface EmptyViewProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
}
const EmptyView = ({ className, message, ...others }: EmptyViewProps) => {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-2",
        className,
      )}
      {...others}
    >
      <div className="relative aspect-square w-full max-w-[128px] origin-center object-cover">
        <Image fill src="/images/oops.png" alt="" />
      </div>
      <p className="text-lg font-medium">
        {message ?? "Không tìm thấy kết quả tương ứng"}
      </p>
    </div>
  );
};

export default EmptyView;

import { cn } from "@/lib/utils";
import React from "react";
import Loader from "./Loader";

const LoadingView = ({
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
      <Loader />
    </div>
  );
};

export default LoadingView;

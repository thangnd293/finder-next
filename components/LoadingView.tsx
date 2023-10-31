import { cn } from "@/lib/utils";
import React from "react";
import Loader from "./Loader";

interface LoadingViewProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: React.ComponentProps<typeof Loader>["variant"];
  size?: React.ComponentProps<typeof Loader>["size"];
}
const LoadingView = ({
  className,
  variant,
  size,
  ...others
}: LoadingViewProps) => {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-2",
        className,
      )}
      {...others}
    >
      <Loader variant={variant} size={size} />
    </div>
  );
};

export default LoadingView;

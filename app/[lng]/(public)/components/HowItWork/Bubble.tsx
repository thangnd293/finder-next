import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  imageUrl: string;
}
const Bubble = ({
  className,
  title,
  description,
  imageUrl,
  ...others
}: BubbleProps) => {
  return (
    <div
      className={cn(
        "w-2/3 min-w-[220px] rounded-b-full rounded-t-full bg-transparent from-primary-10 to-primary-50 px-10 py-16 text-center sm:w-1/2 md:w-1/3 lg:bg-gradient-to-b",
        className,
      )}
      {...others}
    >
      <Image
        className="mx-auto"
        src={imageUrl}
        alt=""
        width={110}
        height={110}
      />
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-secondary-foreground">{description}</p>
    </div>
  );
};

export default Bubble;

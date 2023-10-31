import React from "react";
import Card from "./Card";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MatchRequestCardProps {
  className?: string;
  totalCount: number;
  blur: string;
}
const MatchRequestCard = ({
  className,
  totalCount,
  blur,
}: MatchRequestCardProps) => {
  return (
    <Card
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-md",
        className,
      )}
    >
      <Link href={"/app/liked-you"}>
        <div className="absolute left-1/2 top-1/2 z-10 flex aspect-square h-8 w-8 flex-shrink-0 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary p-2 text-lg font-bold text-white drop-shadow-sm">
          {totalCount}
        </div>

        <p className="text-shadow absolute bottom-0 left-0 z-10 w-full overflow-hidden truncate p-1 text-sm font-bold text-white drop-shadow-2xl">
          {totalCount} lượt thích
        </p>

        <Image className="origin-center object-cover" src={blur} alt="" fill />
      </Link>
    </Card>
  );
};

export default MatchRequestCard;

import React from "react";
import Card from "./Card";
import Link from "next/link";
import Image from "next/image";

interface MatchRequestCardProps {
  totalCount: number;
  blur: string;
}
const MatchRequestCard = ({ totalCount, blur }: MatchRequestCardProps) => {
  return (
    <Link href={"/app/liked-you"}>
      <Card className="relative flex items-center justify-center overflow-hidden rounded-md">
        <div className="absolute z-10 flex aspect-square h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary p-2 text-lg font-bold text-white drop-shadow-sm">
          {totalCount}
        </div>

        <p className="text-shadow absolute bottom-0 left-0 z-10 w-full overflow-hidden truncate p-1 text-sm font-bold text-white drop-shadow-2xl">
          {totalCount} lượt thích
        </p>

        <Image className="origin-center object-cover" src={blur} alt="" fill />
      </Card>
    </Link>
  );
};

export default MatchRequestCard;

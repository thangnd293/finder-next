"use client";

import Button from "@/components/Button";
import { Offer } from "@/service/offer";
import React from "react";

interface PackCardProps extends Offer {
  onClick?: () => void;
}
const PackCard = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<PackCardProps>
>(({ type, text, packages, background, onClick }, ref) => {
  const minPrice = Math.min(...packages.map((pack) => pack.price));

  return (
    <div
      className="flex w-full flex-shrink-0 snap-center flex-col items-center gap-1 rounded-2xl bg-gradient-to-r px-3.5 py-2.5 text-center"
      style={{
        backgroundImage: background,
      }}
      ref={ref}
    >
      <h3 className="text-sm font-semibold">{type}</h3>
      <p className="text-xs">{text}</p>
      <Button className={"rounded-full"} size="sm" onClick={onClick}>
        Mở khóa chỉ với&nbsp;
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: packages[0]?.currency,
        }).format(minPrice)}
      </Button>
    </div>
  );
});

PackCard.displayName = "PackCard";

export default PackCard;

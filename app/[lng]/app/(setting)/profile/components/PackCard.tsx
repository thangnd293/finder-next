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
>(({ type, text, packages, style, onClick }, ref) => {
  const minPrice = Math.min(...packages.map((pack) => pack.price));

  return (
    <div
      className="flex w-full flex-shrink-0 snap-center flex-col items-center gap-1 rounded-2xl py-2.5 text-center"
      style={{
        backgroundImage: style.background,
      }}
      ref={ref}
    >
      <h3 className="text-sm font-semibold">{type}</h3>
      <p className="text-xs">{text}</p>
      <Button
        className={"rounded-full"}
        style={{
          background: style.buttonBackground,
          color: style.buttonColor,
        }}
        size="sm"
        onClick={onClick}
      >
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

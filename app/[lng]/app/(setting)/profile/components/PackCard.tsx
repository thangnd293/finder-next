"use client";

import Button from "@/components/Button";
import { Offer } from "@/service/offer";
import React from "react";
import CurrentOffer from "./CurrentOffer";

interface PackCardProps extends Offer {
  isActived?: boolean;
  expiredDate?: string;
  onClick?: () => void;
}
const PackCard = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<PackCardProps>
>(({ isActived, expiredDate, onClick, ...others }, ref) => {
  const { type, text, packages, style } = others;
  const minPrice = Math.min(...packages.map((pack) => pack.price));

  return (
    <div
      className="flex w-full flex-shrink-0 snap-center flex-col items-center justify-between gap-2 rounded-2xl py-2.5"
      style={{
        backgroundImage: style.background,
      }}
      ref={ref}
    >
      <div className="space-y-1 text-center text-gray-700">
        <h3 className="text-sm font-semibold">{type}</h3>
        <p className="text-xs">{text}</p>
      </div>
      {isActived ?
        <CurrentOffer expiredDate={expiredDate} {...others} />
      : <Button
          className={"rounded-full"}
          style={{
            background: style.buttonBackground,
            color: style.buttonColor,
          }}
          size="sm"
          onClick={onClick}
        >
          Mở khóa chỉ với&nbsp;
          {minPrice.formatPrice()}
        </Button>
      }
    </div>
  );
});

PackCard.displayName = "PackCard";

export default PackCard;

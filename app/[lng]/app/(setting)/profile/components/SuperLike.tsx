"use client";

import SuperLikeIcon from "@/assets/icons/super-like-icon";
import PacketDialog from "@/components/PackageDialog";
import { useDisclosure } from "@/hooks/use-disclosure";
import { Offer } from "@/service/offer";
import { useCurrentUser } from "@/service/user";
import React from "react";

interface SuperLikeProps {
  offer: Offer;
}
const SuperLike = ({ offer }: SuperLikeProps) => {
  const { isOpen, close, open } = useDisclosure();

  const { data: featureAccess } = useCurrentUser({
    select: (user) => user.featureAccess,
  });

  const supperLike = featureAccess?.find(
    (feature) => feature.name === "Super like",
  );

  return (
    <>
      <button
        className="flex w-1/2 flex-col items-center justify-center space-y-1 px-4 py-3"
        onClick={open}
      >
        <SuperLikeIcon />
        <span className="text-sm">{supperLike?.amount} lượt siêu thích</span>
      </button>
      {isOpen && <PacketDialog {...offer} onClose={close} />}
    </>
  );
};

export default SuperLike;

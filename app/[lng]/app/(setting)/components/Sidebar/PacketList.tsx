"use client";

import PacketDialog from "@/components/PackageDialog";
import { Offer } from "@/service/offer";
import { useCurrentUser } from "@/service/user";
import Image from "next/image";
import { useState } from "react";
import CurrentOffer from "./CurrentOffer";

interface PacketListProps {
  offers: Offer[];
}
const PacketList = ({ offers }: PacketListProps) => {
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  const { data: offering } = useCurrentUser({
    select: (user) => user?.offering,
  });

  const currentOffer = offers.find((o) => o._id === offering?._id);

  return (
    <>
      <div className="space-y-3 p-4">
        {currentOffer && (
          <CurrentOffer {...currentOffer} expiredDate={offering?.expiredDate} />
        )}
        {offers
          .filter(
            (offer) =>
              !offering || !offer.level || offer.level > offering.level,
          )
          .map((offer) => (
            <button
              key={offer._id}
              className="relative flex w-full cursor-pointer items-center space-y-1 rounded-full py-2 text-center hover:bg-background-50 md:px-8"
              onClick={() => setActiveOffer(offer)}
            >
              <Image
                width={30}
                height={30}
                src={offer.iconUrl}
                alt={offer.type}
              />

              <p className="absolute left-1/2 hidden -translate-x-1/2 pb-1 font-semibold md:block">
                {offer.type}
              </p>
            </button>
          ))}
      </div>

      {activeOffer && (
        <PacketDialog {...activeOffer} onClose={() => setActiveOffer(null)} />
      )}
    </>
  );
};

export default PacketList;

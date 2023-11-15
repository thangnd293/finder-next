"use client";

import ErrorView from "@/components/ErrorView";
import LoadingView from "@/components/LoadingView";
import PacketDialog from "@/components/PackageDialog";
import { Offer, useOffers } from "@/service/offer";
import Image from "next/image";
import { useState } from "react";

const PacketList = () => {
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  const { data, isLoading, isError } = useOffers();

  if (isLoading) return <LoadingView className="h-32" size={34} />;

  if (isError) return <ErrorView />;
  const { results: offers } = data;

  return (
    <>
      <div className="space-y-3 p-4">
        {offers.map((offer) => (
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

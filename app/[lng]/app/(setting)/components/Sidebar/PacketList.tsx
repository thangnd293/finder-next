"use client";

import ErrorView from "@/components/ErrorView";
import LoadingView from "@/components/LoadingView";
import { cn } from "@/lib/utils";
import { Offer, useOffers } from "@/service/offer";
import Image from "next/image";
import { useState } from "react";
import PacketDialog from "./PacketDialog";

const PacketList = () => {
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  const { data: offers, isLoading, isError } = useOffers();

  if (isLoading) return <LoadingView variant="spinner" size={34} />;

  if (isError) return <ErrorView />;

  return (
    <>
      <div className="space-y-3 p-4">
        {offers.map((offer) => (
          <button
            key={offer._id}
            className={cn(
              "w-full cursor-pointer space-y-1 rounded-md py-2 text-center md:px-8",
              offer.background,
            )}
            onClick={() => setActiveOffer(offer)}
          >
            <h1 className="flex items-center justify-center gap-2 font-semibold">
              <Image
                width={30}
                height={30}
                src={offer.iconUrl}
                alt={offer.type}
              />
              <span className="hidden md:block">{offer.type}</span>
            </h1>
            <p className="hidden text-sm md:block">{offer.text}</p>
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

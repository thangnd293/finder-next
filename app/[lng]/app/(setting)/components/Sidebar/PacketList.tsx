"use client";

import ErrorView from "@/components/ErrorView";
import LoadingView from "@/components/LoadingView";
import PacketDialog from "@/components/PackageDialog";
import { cn } from "@/lib/utils";
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
